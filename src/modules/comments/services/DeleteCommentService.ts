import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IDeleteComment } from '../domain/models/IDeleteComment';
import { ICommentsRepository } from '../domain/repositories/ICommentsRepository';

@injectable()
export default class DeleteCommentService {
	constructor(
		@inject('CommentsRepository')
		private commentsRepository: ICommentsRepository,
	) {}
	async execute({ id, user_id, post_id }: IDeleteComment): Promise<void> {
		const comment = await this.commentsRepository.findById(id);

		if (!comment) {
			throw new AppError('Comment Not found');
		}

		if (comment.user_id != user_id) {
			throw new AppError('Apenas o dono do comentário pode excluir!!');
		}

		if (comment.post_id != post_id) {
			throw new AppError('Erro ao excluir o comentário');
		}

		await this.commentsRepository.remove(comment);
	}
}
