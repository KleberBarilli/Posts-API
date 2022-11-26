import { Router } from 'express';
import CommentsController from '../controllers/CommentsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.get(
	'/user/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	commentsController.userComments,
);

commentsRouter.get(
	'/post/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	commentsController.index,
);

commentsRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	commentsController.show,
);

commentsRouter.use(isAuthenticated);

commentsRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			user_id: Joi.string().uuid().required(),
			post_id: Joi.string().uuid().required(),
			description: Joi.string().required(),
		},
	}),
	commentsController.create,
);

commentsRouter.put(
	'/:id',
	celebrate({
		[Segments.BODY]: {
			user_id: Joi.string().uuid().required(),
			post_id: Joi.string().uuid().required(),
			description: Joi.string().required(),
		},
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	commentsController.update,
);

commentsRouter.delete(
	'/:id',
	celebrate({
		[Segments.BODY]: {
			user_id: Joi.string().uuid().required(),
			post_id: Joi.string().uuid().required(),
		},
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	commentsController.delete,
);

export default commentsRouter;
