import { container } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import '@modules/users/providers';

import { IPostsRepository } from '@modules/posts/domain/repositories/IPostsRepository';
import PostsRepository from '@modules/posts/infra/typeorm/repositories/PostsRepository';
import { ICommentsRepository } from '@modules/comments/domain/repositories/ICommentsRepository';
import CommentsRepository from '@modules/comments/infra/typeorm/repositories/CommentsRepository';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<IPostsRepository>(
	'PostsRepository',
	PostsRepository,
);

container.registerSingleton<ICommentsRepository>(
	'CommentsRepository',
	CommentsRepository,
);
