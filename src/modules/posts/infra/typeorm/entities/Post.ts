import User from '@modules/users/infra/typeorm/entities/User';
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
import { Expose } from 'class-transformer';

@Entity('POST')
export default class Post {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	@Generated('uuid')
	user_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	image: string;
	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Expose({ name: 'image_url' })
	getImageUrl(): string | null {
		if (!this.image) {
			return null;
		}
		//console.log(process.env.BASE_AVATAR_URL);

		return `${process.env.POST_AVATAR_URL}/${this.image}`;
	}
}
