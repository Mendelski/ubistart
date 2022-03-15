import { Request, Response } from 'express';
import userService from '../services/userService';
import { ControllerExceptionHandler } from '../../common/decorators/ControllerExceptionHandlerDecorator';

export class UserController {
    @ControllerExceptionHandler()
    async login(req: Request, res: Response) {
        const token = await userService.login(req.body);
        return res.json({ token });
    }

    @ControllerExceptionHandler()
    async register(req: Request, res: Response) {
        const user = await userService.register(req.body);
        return res.status(201).json(user);
    }
}
