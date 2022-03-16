import { Request, Response } from 'express';
import { ControllerExceptionHandler } from '../../common/decorators/ControllerExceptionHandlerDecorator';
import todoService from '../services/todoService';
import { Controller, Get, Middleware, Patch, Post } from '@overnightjs/core';
import authMiddleware from '../../common/middlewares/authMiddleware';
import todoMiddleware from '../middlewares/todoMiddleware';

@Controller('admin/todos')
export default class TodoController {
    @Patch(':id')
    @Middleware(authMiddleware.auth)
    @Middleware(authMiddleware.authAdmin)
    @Middleware(todoMiddleware.update)
    @ControllerExceptionHandler()
    async update(req: Request, res: Response) {
        const { todoDto } = res.locals;

        const todo = await todoService.update(todoDto);
        return res.json(todo);
    }

    @Post(':id/finish')
    @Middleware(authMiddleware.auth)
    @Middleware(authMiddleware.authAdmin)
    @Middleware(todoMiddleware.finish)
    @ControllerExceptionHandler()
    async finish(req: Request, res: Response) {
        const { todoDto } = res.locals;

        const todo = await todoService.update(todoDto);
        return res.json(todo);
    }

    @Get()
    @Middleware(authMiddleware.auth)
    @Middleware(authMiddleware.authAdmin)
    @Middleware(todoMiddleware.list)
    @ControllerExceptionHandler()
    async list(req: Request, res: Response) {
        const { filter } = res.locals;

        const todos = await todoService.list(filter);
        return res.json(todos);
    }

    @Get(':id')
    @Middleware(authMiddleware.auth)
    @Middleware(authMiddleware.authAdmin)
    @Middleware(todoMiddleware.get)
    @ControllerExceptionHandler()
    async get(req: Request, res: Response) {
        const { filter } = res.locals;

        const todos = await todoService.get(filter);
        return res.json(todos);
    }
}
