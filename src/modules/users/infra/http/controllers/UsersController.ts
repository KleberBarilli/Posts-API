import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email, password } = req.body;

		const createUser = container.resolve(CreateUserService);

		const user = await createUser.execute({
			name,
			email,
			password,
		});

		return res.json(classToClass(user));
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const showProfile = container.resolve(ShowProfileService);
		const id = req.user.id;

		const user = await showProfile.execute({ id });

		return res.json(classToClass(user));
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { name, email, password } = req.body;

		const { id } = req.params;

		const updateUser = container.resolve(UpdateUserService);

		const user = await updateUser.execute({
			id,
			name,
			email,
			password,
		});

		return res.json(user);
	}
}
