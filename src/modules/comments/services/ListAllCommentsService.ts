import { inject, injectable } from 'tsyringe';
import { IPaginateComment } from '../domain/models/IPaginateComment';
import { ICommentsRepository } from '../domain/repositories/ICommentsRepository';

@injectable()
export default class ListAllCommentsService {
	constructor(
		@inject('CommentsRepository')
		private commentsRepository: ICommentsRepository,
	) {}

	async execute(post_id: string): Promise<IPaginateComment | null> {
		const postComments =
			await this.commentsRepository.findAllCommentsByPost(post_id);

		return postComments as IPaginateComment;
	}
}
