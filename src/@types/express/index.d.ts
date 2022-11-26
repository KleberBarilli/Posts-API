declare namespace Express {
	export interface Request {
		user: {
			id: string;
		};
		post: {
			id: string;
		};
	}
}
