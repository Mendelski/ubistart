import { NextFunction, Request, Response } from 'express';
import { DefaultMiddleware } from '../../common/middlewares/defaultMiddleware';
import { TodoStatus } from '../../common/enums/todoEnum';
import { TodoDto } from '../../common/dtos/TodoDto';
import { ResponseError } from '../../common/exceptions/responseError';
import Todo from '../../common/models/todo';

class TodoMiddleware extends DefaultMiddleware {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { description, dueDate, title } = req.body;

            if (!description || !dueDate || !title) {
                throw ResponseError.INVALID_PARAMS.addDetails(req.body);
            }

            res.locals.todoDto = {
                description,
                dueDate: new Date(dueDate),
                user: res.locals.auth,
                status: TodoStatus.OPEN,
                title,
            } as TodoDto;

            next();
        } catch (exception) {
            this.handleException(req, res, exception);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { description, dueDate, title } = req.body;

            if (!description && !dueDate && !title) {
                throw ResponseError.INVALID_PARAMS.addDetails(req.body);
            }

            const todo = {
                id: Number(req.params.id),
                user: res.locals.auth,
            } as Partial<Todo>;

            if (description) {
                todo.description = description;
            }

            if (dueDate) {
                todo.dueDate = dueDate;
            }

            if (title) {
                todo.title = title;
            }

            res.locals.todoDto = todo;

            next();
        } catch (exception) {
            this.handleException(req, res, exception);
        }
    }

    finish = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.locals.todoDto = {
                id: Number(req.params.id),
                status: TodoStatus.DONE,
                user: res.locals.auth,
            } as Partial<Todo>;

            next();
        } catch (exception) {
            this.handleException(req, res, exception);
        }
    }

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset, late } = req.query;

            res.locals.filter = {
                limit,
                offset,
                late: late !== undefined,
                user: res.locals.auth,
            };

            next();
        } catch (exception) {
            this.handleException(req, res, exception);
        }
    }

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.locals.filter = {
                id: req.params.id,
                user: res.locals.auth,
            };

            next();
        } catch (exception) {
            this.handleException(req, res, exception);
        }
    }
}

const instance = new TodoMiddleware();
export default instance;
