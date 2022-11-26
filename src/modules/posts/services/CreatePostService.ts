import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';
import { ICreatePost } from '../domain/models/ICreatePost';
import { IPost } from '../domain/models/IPost';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
export default class CreatePostService {
	constructor(
		@inject('PostsRepository') private postsRepository: IPostsRepository,
		@inject('UsersRepository') private usersRepository: IUsersRepository,
	) {}
	public async execute({
		user_id,
		title,
		description,
		image,
	}: ICreatePost): Promise<IPost> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('Error with User');
		}

		const post = this.postsRepository.create({
			user_id,
			title,
			description,
			image,
		});

		return post;
	}
}
