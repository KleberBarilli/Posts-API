import { getRepository, Repository, Like } from 'typeorm';
import { IPost } from '@modules/posts/domain/models/IPost';
import { IPostsRepository } from '@modules/posts/domain/repositories/IPostsRepository';
import { ICreatePost } from '@modules/posts/domain/models/ICreatePost';
import Post from '../entities/Post';
import { IPaginatePost } from '@modules/posts/domain/models/IPaginatePost';

export default class PostsRepository implements IPostsRepository {
	private ormRepository: Repository<Post>;

	constructor() {
		this.ormRepository = getRepository(Post);
	}

	public async findById(id: string): Promise<Post | undefined> {
		const post = this.ormRepository.findOne({
			where: {
				id,
			},
			relations: ['user'],
		});
		return post;
	}

	public async findByTitle(title: string): Promise<Post[] | undefined> {
		const post = this.ormRepository.find({
			where: {
				title,
			},
		});
		return post;
	}

	public async findAll(): Promise<Post[]> {
		const posts = await this.ormRepository.find({});

		return posts;
	}

	public async create({
		user_id,
		title,
		description,
		image,
	}: ICreatePost): Promise<Post> {
		const post = this.ormRepository.create({
			user_id,
			title,
			description,
			image,
		});

		await this.ormRepository.save(post);

		return post;
	}

	public async save(post: Post): Promise<Post> {
		await this.ormRepository.save(post);

		return post;
	}

	public async remove(post: Post): Promise<void> {
		await this.ormRepository.remove(post);
	}

	public async findAllPostsByUser(user_id: string): Promise<IPaginatePost> {
		const post = await this.ormRepository
			.createQueryBuilder()
			.where({
				user_id,
			})
			.orderBy({
				title: 'DESC',
			})
			.paginate();

		return post as IPaginatePost;
	}
}
