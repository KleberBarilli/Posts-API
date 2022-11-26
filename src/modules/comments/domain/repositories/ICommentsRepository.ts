import { ICreateComment } from '../models/ICreateComment';
import { IPaginateComment } from '../models/IPaginateComment';
import { IComment } from '../models/IComment';

export interface ICommentsRepository {
	findById(id: string): Promise<IComment | undefined>;
	findAll(): Promise<IComment[] | null>;
	findAllCommentsByUser(
		user_id: string,
	): Promise<IPaginateComment | undefined>;
	findAllCommentsByPost(
		post_id: string,
	): Promise<IPaginateComment | undefined>;
	create(data: ICreateComment): Promise<IComment>;
	save(post: IComment): Promise<IComment>;
	remove(post: IComment): Promise<void>;
}
