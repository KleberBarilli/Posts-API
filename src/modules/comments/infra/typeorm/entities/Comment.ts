import User from '@modules/users/infra/typeorm/entities/User';
import Post from '@modules/posts/infra/typeorm/entities/Post';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	JoinColumn,
	ManyToOne,
	Generated,
} from 'typeorm';

@Entity('COMMENT')
export default class Comment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	@Generated('uuid')
	user_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column()
	@Generated('uuid')
	post_id: string;

	@ManyToOne(() => Post)
	@JoinColumn({ name: 'post_id' })
	post: Post;

	@Column()
	description: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
