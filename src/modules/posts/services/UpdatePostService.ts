import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IPost } from '../domain/models/IPost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';
import { IUpdatePost } from '../domain/models/IUpdatePost';

@injectable()
export default class UpdatePostService {
	constructor(
		@inject('PostsRepository') private postsRepository: IPostsRepository,
	) {}
	async execute({
		id,
		user_id,
		title,
		description,
		image,
	}: IUpdatePost): Promise<IPost> {
		const post = await this.postsRepository.findById(id);

		if (!post) {
			throw new AppError('Post Not found');
		}
		if (post.user_id != user_id) {
			throw new AppError('Apenas o criador do post pode modificar');
		}

		post.title = title;
		post.description = description;
		post.image = image as string;

		await this.postsRepository.save(post);

		return post;
	}
}
