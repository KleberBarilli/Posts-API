import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IDeletePost } from '../domain/models/IDeletePost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
export default class DeletePostService {
	constructor(
		@inject('PostsRepository') private postsRepository: IPostsRepository,
	) {}
	async execute({ id, user_id }: IDeletePost): Promise<void> {
		const post = await this.postsRepository.findById(id);

		if (!post) {
			throw new AppError('Post Not found');
		}

		if (post.user_id != user_id) {
			throw new AppError('Apenas o dono da postagem pode excluir!!');
		}

		await this.postsRepository.remove(post);
	}
}
