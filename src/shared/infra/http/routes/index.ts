import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import { Router } from 'express';
import postsRouter from '@modules/posts/infra/http/routes/posts.routes';
import commentsRouter from '@modules/comments/infra/http/routes/comments.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);

routes.use('/posts', postsRouter);

routes.use('/comments', commentsRouter);

export default routes;
