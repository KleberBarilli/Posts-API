import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowCommentService from '@modules/comments/services/ShowCommentService';
import ListAllCommentsService from '@modules/comments/services/ListAllCommentsService';
import ListAllCommentsByUserService from '@modules/comments/services/ListAllCommentsByUserService';
import CreateCommentService from '@modules/comments/services/CreateCommentService';
import UpdateCommentService from '@modules/comments/services/UpdateCommentService';
import DeleteCommentService from '@modules/comments/services/DeleteCommentService';
import { classToClass } from 'class-transformer';

export default class CommentsController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listComments = container.resolve(ListAllCommentsService);
		const { id } = req.params;

		const comments = await listComments.execute(id);

		return res.json(classToClass(comments));
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const showComment = container.resolve(ShowCommentService);

		const comment = await showComment.execute({ id });

		return res.json(comment);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { user_id, post_id, description } = req.body;

		const createComment = container.resolve(CreateCommentService);

		const comment = await createComment.execute({
			user_id,
			post_id,
			description,
		});

		return res.json(comment);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { user_id, post_id, description } = req.body;

		const { id } = req.params;

		const updateComment = container.resolve(UpdateCommentService);

		const comment = await updateComment.execute({
			id,
			user_id,
			post_id,
			description,
		});

		return res.json(comment);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { user_id, post_id } = req.body;
		const { id } = req.params;

		const deleteComment = container.resolve(DeleteCommentService);

		await deleteComment.execute({ id, user_id, post_id });

		return res.json([]);
	}

	public async userComments(req: Request, res: Response): Promise<Response> {
		const list = container.resolve(ListAllCommentsByUserService);
		const { id } = req.params;

		const comments = await list.execute(id);

		return res.json(comments);
	}
}
