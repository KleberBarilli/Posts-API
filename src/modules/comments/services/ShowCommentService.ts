import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IComment } from '../domain/models/IComment';
import { IShowComment } from '../domain/models/IShowComment';
import { ICommentsRepository } from '../domain/repositories/ICommentsRepository';

@injectable()
export default class ShowCommentService {
	constructor(
		@inject('CommentsRepository')
		private commentsRepository: ICommentsRepository,
	) {}
	async execute({ id }: IShowComment): Promise<IComment | undefined> {
		const comment = await this.commentsRepository.findById(id);

		if (!comment) {
			throw new AppError('Comment Not found');
		}

		return comment;
	}
}
