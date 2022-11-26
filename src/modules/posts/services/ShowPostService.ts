import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPost } from '../domain/models/IPost';
import { IShowPost } from '../domain/models/IShowPost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
export default class ShowPostService {
	constructor(
		@inject('PostsRepository') private postsRepository: IPostsRepository,
	) {}
	async execute({ id }: IShowPost): Promise<IPost | undefined> {
		const post = await this.postsRepository.findById(id);

		if (!post) {
			throw new AppError('Post Not found');
		}

		return post;
	}
}
