require('dotenv/config');

import { Server } from '@overnightjs/core';
import express from 'express';
import { TodoController } from './app/user/controllers/TodoController';
import { UserController } from './app/user/controllers/UserController';

export class Application extends Server {
    constructor() {
        super(process.env.NODE_ENV === 'development');
        this.setupMiddlewares();
        this.setupControllers();
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server listening on port: ${port}`);
        });
    }

    private setupControllers(): void {
        super.addControllers([
            new TodoController(),
            new UserController(),
        ]);
    }

    private setupMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
}
