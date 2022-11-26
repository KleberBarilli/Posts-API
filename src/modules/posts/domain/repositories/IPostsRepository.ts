import { ICreatePost } from '../models/ICreatePost';
import { IPaginatePost } from '../models/IPaginatePost';
import { IPost } from '../models/IPost';
import { IUpdatePost } from '../models/IUpdatePost';

export interface IPostsRepository {
	findById(id: string): Promise<IPost | undefined>;
	findAll(): Promise<IPost[] | null>;
	findByTitle(title: string): Promise<IPost[] | undefined>;
	findAllPostsByUser(user_id: string): Promise<IPaginatePost | undefined>;
	create(data: ICreatePost): Promise<IPost>;
	save(post: IPost): Promise<IPost>;
	remove(post: IPost): Promise<void>;
}
