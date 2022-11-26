import { Router } from 'express';
import PostsController from '../controllers/PostsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig.multer);

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.get(
	'/user/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	postsController.userPosts,
);

postsRouter.get('/', postsController.index);

postsRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	postsController.show,
);

postsRouter.use(isAuthenticated);

postsRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			user_id: Joi.string().uuid().required(),
			title: Joi.string().required(),
			description: Joi.string().required(),
			image: Joi.string(),
		},
	}),
	postsController.create,
);

postsRouter.put(
	'/:id',
	celebrate({
		[Segments.BODY]: {
			user_id: Joi.string().uuid().required(),
			title: Joi.string().required(),
			description: Joi.string().required(),
			image: Joi.string(),
		},
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	postsController.update,
);

postsRouter.delete(
	'/:id',
	celebrate({
		[Segments.BODY]: {
			user_id: Joi.string().uuid().required(),
		},
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	postsController.delete,
);

postsRouter.patch('/:id', upload.single('image'), postsController.updateImage);

export default postsRouter;
