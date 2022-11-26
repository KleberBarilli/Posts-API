import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import cors from 'cors';
import '@shared/infra/typeorm';
import '@shared/container';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import { types } from 'pg';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
app.use(pagination);
app.use(routes);
app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			status: 'error',
			message: error.message,
		});
	}
	return res.status(500).json({
		status: 'error',
		message: error.message,
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Rodando na porta ${process.env.PORT}`);
	console.log(`Ambiente ${process.env.NODE_ENV}`);
});
