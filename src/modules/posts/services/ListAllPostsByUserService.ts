import { inject, injectable } from 'tsyringe';
import { IPaginatePost } from '../domain/models/IPaginatePost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
export default class ListAllPostsByUserService {
	constructor(
		@inject('PostsRepository') private postsRepository: IPostsRepository,
	) {}

	async execute(user_id: string): Promise<IPaginatePost | null> {
		const userPosts = await this.postsRepository.findAllPostsByUser(
			user_id,
		);

		return userPosts as IPaginatePost;
	}
}
