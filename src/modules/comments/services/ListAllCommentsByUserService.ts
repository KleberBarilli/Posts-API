import { inject, injectable } from 'tsyringe';
import { IPaginateComment } from '../domain/models/IPaginateComment';
import { ICommentsRepository } from '../domain/repositories/ICommentsRepository';

@injectable()
export default class ListAllCommentsByUserService {
	constructor(
		@inject('CommentsRepository')
		private commentsRepository: ICommentsRepository,
	) {}

	async execute(user_id: string): Promise<IPaginateComment | null> {
		const userComments =
			await this.commentsRepository.findAllCommentsByUser(user_id);

		return userComments as IPaginateComment;
	}
}
