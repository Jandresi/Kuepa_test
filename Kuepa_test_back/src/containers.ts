import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import express from 'express';
import { LoginService } from './components/login/login.service';
import { ChatService } from './components/chat/chat.service';

export default (app: express.Application): void => {
    const container = createContainer({
        injectionMode: 'CLASSIC',
    });

    container.register({
        // Services
        loginService: asClass(LoginService).scoped(),
        chatService: asClass(ChatService).scoped(),

        // Repositories
        
    });

    app.use(scopePerRequest(container));
}