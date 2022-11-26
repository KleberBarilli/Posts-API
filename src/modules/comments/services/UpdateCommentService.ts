import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IComment } from '../domain/models/IComment';
import { ICommentsRepository } from '../domain/repositories/ICommentsRepository';
import { IUpdateComment } from '../domain/models/IUpdateComment';

@injectable()
export default class UpdateCommentService {
	constructor(
		@inject('CommentsRepository')
		private commentsRepository: ICommentsRepository,
	) {}
	async execute({
		id,
		user_id,
		post_id,
		description,
	}: IUpdateComment): Promise<IComment> {
		const comment = await this.commentsRepository.findById(id);

		if (!comment) {
			throw new AppError('Comment Not found');
		}
		if (comment.post_id != post_id) {
			throw new AppError('Erro ao atualizar');
		}

		if (comment.user_id != user_id) {
			throw new AppError('Apenas o criador do comentário pode modificar');
		}

		comment.description = description;

		await this.commentsRepository.save(comment);

		return comment;
	}
}
