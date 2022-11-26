import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import { inject, injectable } from 'tsyringe';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';
import { IPost } from '../domain/models/IPost';

interface IRequest {
	id: string;
	imageFilename: string;
}
@injectable()
export default class CreateImagePostService {
	constructor(
		@inject('PostsRepository') private postsRepository: IPostsRepository,
	) {}

	public async execute({ id, imageFilename }: IRequest): Promise<IPost> {
		const post = await this.postsRepository.findById(id);

		if (!post) {
			throw new AppError('Post not found');
		}

		if (uploadConfig.driver === 's3') {
			const storageProvider = new S3StorageProvider();
			if (post.image) {
				await storageProvider.deleteFile(post.image);
			}
			const fileName = await storageProvider.saveFile(imageFilename);
			post.image = fileName;
		}

		await this.postsRepository.save(post);

		return post;
	}
}
