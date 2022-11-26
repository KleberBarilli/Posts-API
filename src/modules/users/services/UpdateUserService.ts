import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUpdateUser } from '../domain/models/IUpdateUser';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
export default class UpdateUserservice {
	constructor(
		@inject('UsersRepository') private postsRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}
	async execute({ id, name, email, password }: IUpdateUser): Promise<void> {
		const user = await this.postsRepository.findById(id);

		if (!user) {
			throw new AppError('User Not found');
		}

		const hashedPassword = await this.hashProvider.generateHash(
			password as string,
		);

		user.name = name;
		user.email = email;
		user.password = hashedPassword;

		await this.postsRepository.save(user);
	}
}
