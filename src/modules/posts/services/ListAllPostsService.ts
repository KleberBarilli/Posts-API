import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPost } from '../domain/models/IPost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
export default class ListAllPostsService {
	constructor(
		@inject('PostsRepository')
		private postsRepository: IPostsRepository,
	) {}

	public async execute(): Promise<IPost[]> {
		const posts = await this.postsRepository.findAll();

		if (!posts) {
			throw new AppError('Error with posts');
		}

		return posts;
	}
}
