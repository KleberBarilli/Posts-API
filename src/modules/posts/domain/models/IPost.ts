export interface IPost {
	id: string;
	user_id: string;
	title: string;
	description: string;
	image: string;
	created_at: Date;
	updated_at: Date;
	getImageUrl(): string | null;
}
