import { Request, Response } from 'express';
import userService from '../../common/services/userService';
import { ControllerExceptionHandler } from '../../common/decorators/ControllerExceptionHandlerDecorator';
import { UserRole } from '../../common/enums/userEnum';
import { Controller, Post } from '@overnightjs/core';

@Controller('')
export default class UserController {
    @Post('login')
    @ControllerExceptionHandler()
    async login(req: Request, res: Response) {
        const token = await userService.login(req.body);
        return res.json({ token });
    }

    @Post('register')
    @ControllerExceptionHandler()
    async register(req: Request, res: Response) {
        const user = await userService.register({ ...req.body, role: UserRole.USER });
        return res.status(201).json(user);
    }
}
