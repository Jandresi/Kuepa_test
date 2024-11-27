import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { loadControllers } from 'awilix-express';
import loadContainer from './containers';

export async function startServer() {
    const app = express();

    app.use(cors({origin: '*'}));
    app.use(morgan('dev'));
    app.use(express.json());
    
    loadContainer(app);
    app.use(loadControllers('components/**/*.controller.{ts,js}', { cwd: __dirname }));

    return app;
}
