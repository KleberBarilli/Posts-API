import { getRepository, Repository, Like } from 'typeorm';
import { IComment } from '@modules/comments/domain/models/IComment';
import { ICommentsRepository } from '@modules/comments/domain/repositories/ICommentsRepository';
import { ICreateComment } from '@modules/comments/domain/models/ICreateComment';
import Comment from '../entities/Comment';
import { IPaginateComment } from '@modules/comments/domain/models/IPaginateComment';

export default class CommentsRepository implements ICommentsRepository {
	private ormRepository: Repository<Comment>;

	constructor() {
		this.ormRepository = getRepository(Comment);
	}

	public async findById(id: string): Promise<Comment | undefined> {
		const comment = this.ormRepository.findOne({
			where: {
				id,
			},
		});
		return comment;
	}

	public async findAll(): Promise<Comment[]> {
		const comments = await this.ormRepository.find({});

		return comments;
	}

	public async create({
		user_id,
		post_id,
		description,
	}: ICreateComment): Promise<Comment> {
		const comment = this.ormRepository.create({
			user_id,
			post_id,
			description,
		});

		await this.ormRepository.save(comment);

		return comment;
	}

	public async save(comment: Comment): Promise<Comment> {
		await this.ormRepository.save(comment);

		return comment;
	}

	public async remove(comment: Comment): Promise<void> {
		await this.ormRepository.remove(comment);
	}

	public async findAllCommentsByUser(
		user_id: string,
	): Promise<IPaginateComment> {
		const comment = await this.ormRepository
			.createQueryBuilder()
			.where({
				user_id,
			})
			.paginate();

		return comment as IPaginateComment;
	}

	public async findAllCommentsByPost(
		post_id: string,
	): Promise<IPaginateComment> {
		const comment = await this.ormRepository
			.createQueryBuilder()
			.where({
				post_id,
			})
			.paginate();

		return comment as IPaginateComment;
	}
}
