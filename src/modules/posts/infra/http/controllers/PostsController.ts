import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowPostService from '@modules/posts/services/ShowPostService';
import ListAllPostsService from '@modules/posts/services/ListAllPostsService';
import CreatePostService from '@modules/posts/services/CreatePostService';
import UpdatePostService from '@modules/posts/services/UpdatePostService';
import DeletePostService from '@modules/posts/services/DeletePostService';
import { classToClass } from 'class-transformer';
import ListAllPostsByUserService from '@modules/posts/services/ListAllPostsByUserService';
import CreateImagePostService from '@modules/posts/services/CreateImagePostService';

export default class PostsController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listPosts = container.resolve(ListAllPostsService);

		const posts = await listPosts.execute();

		return res.json(classToClass(posts));
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const showPost = container.resolve(ShowPostService);

		const post = await showPost.execute({ id });

		return res.json(post);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { user_id, title, description, image } = req.body;

		const createPost = container.resolve(CreatePostService);

		const post = await createPost.execute({
			user_id,
			title,
			description,
			image,
		});

		return res.json(post);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { user_id, title, description, image } = req.body;

		const { id } = req.params;

		const updatePost = container.resolve(UpdatePostService);

		const post = await updatePost.execute({
			id,
			user_id,
			title,
			description,
			image,
		});

		return res.json(post);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { user_id } = req.body;
		const { id } = req.params;

		const deletePost = container.resolve(DeletePostService);

		await deletePost.execute({ id, user_id });

		return res.json([]);
	}

	public async userPosts(req: Request, res: Response): Promise<Response> {
		const list = container.resolve(ListAllPostsByUserService);
		const { id } = req.params;

		const posts = await list.execute(id);

		return res.json(posts);
	}

	public async updateImage(req: Request, res: Response): Promise<Response> {
		const createImage = container.resolve(CreateImagePostService);

		const { id } = req.params;

		const post = await createImage.execute({
			id,
			imageFilename: req.file?.filename as string,
		});

		return res.json(classToClass(post));
	}
}
