import { Request, Response } from 'express';
import { ControllerExceptionHandler } from '../../common/decorators/ControllerExceptionHandlerDecorator';
import { Controller, Get, Middleware, Patch, Post } from '@overnightjs/core';
import authMiddleware from '../../common/middlewares/authMiddleware';
import todoMiddleware from '../middlewares/todoMiddleware';
import todoService from '../services/todoService';

@Controller('todos')
export default class TodoController {
    @Post()
    @Middleware(authMiddleware.auth)
    @Middleware(authMiddleware.authUser)
    @Middleware(todoMiddleware.create)
    @ControllerExceptionHandler()
    async create(req: Request, res: Response) {
        const { todoDto } = res.locals;

        const todo = await todoService.create(todoDto);
        return res.status(201).json(todo);
    }

    @Patch(':id')
    @Middleware(authMiddleware.auth)
    @Middleware(authMiddleware.authUser)
    @Middleware(todoMiddleware.update)
    @ControllerExceptionHandler()
    async update(req: Request, res: Response) {
        const { todoDto } = res.locals;

        const todo = await todoService.update(todoDto);
        return res.json(todo);
    }

    @Post(':id/finish')
    @Middleware(authMiddleware.auth)
    @Middleware(authMiddleware.authUser)
    @Middleware(todoMiddleware.finish)
    @ControllerExceptionHandler()
    async finish(req: Request, res: Response) {
        const { todoDto } = res.locals;

        const todo = await todoService.update(todoDto);
        return res.json(todo);
    }

    @Get()
    @Middleware(authMiddleware.auth)
    @Middleware(authMiddleware.authUser)
    @Middleware(todoMiddleware.list)
    @ControllerExceptionHandler()
    async list(req: Request, res: Response) {
        const { filter } = res.locals;

        const todos = await todoService.list(filter);
        return res.json(todos);
    }

    @Get(':id')
    @Middleware(authMiddleware.auth)
    @Middleware(authMiddleware.authUser)
    @Middleware(todoMiddleware.get)
    @ControllerExceptionHandler()
    async get(req: Request, res: Response) {
        const { filter } = res.locals;

        const todos = await todoService.get(filter);
        return res.json(todos);
    }
}
