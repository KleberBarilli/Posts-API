import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICommentsRepository } from '../domain/repositories/ICommentsRepository';
import { ICreateComment } from '../domain/models/ICreateComment';
import { IComment } from '../domain/models/IComment';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IPostsRepository } from '@modules/posts/domain/repositories/IPostsRepository';

@injectable()
export default class CreateCommentService {
	constructor(
		@inject('CommentsRepository')
		private commentsRepository: ICommentsRepository,
		@inject('PostsRepository') private postsRepository: IPostsRepository,
		@inject('UsersRepository') private usersRepository: IUsersRepository,
	) {}
	public async execute({
		user_id,
		post_id,
		description,
	}: ICreateComment): Promise<IComment> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('Error with User');
		}

		const post = await this.postsRepository.findById(post_id);

		if (!post) {
			throw new AppError('Error with Post');
		}

		const comment = this.commentsRepository.create({
			user_id,
			post_id,
			description,
		});

		return comment;
	}
}
