import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { DefaultMiddleware } from './defaultMiddleware';
import { UserRole } from '../enums/userEnum';
import { ResponseError } from '../exceptions/responseError';
import { getRepository } from 'typeorm';
import User from '../models/user';
import { UserDto } from '../dtos/UserDto';

class AuthMiddleware extends DefaultMiddleware {
    auth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { authorization } = req.headers;

            if (!authorization) {
                throw ResponseError.INVALID_CREDENTIALS;
            }

            const token = authorization.replace('Bearer', '').trim();

            res.locals.auth = jwt.verify(token, process.env.JWT_SECRET ?? '') as UserDto;

            next();
        } catch (exception) {
            this.handleException(req, res, exception);
        }
    }

    authUser = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { auth } = res.locals;

            if (auth.role !== UserRole.USER) {
                throw ResponseError.ACCESS_FORBIDDEN;
            }

            next();
        } catch (exception) {
            this.handleException(req, res, exception);
        }
    }

    authAdmin = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { auth } = res.locals;

            if (auth.role !== UserRole.ADMIN) {
                throw ResponseError.ACCESS_FORBIDDEN;
            }

            next();
        } catch (exception) {
            this.handleException(req, res, exception);
        }
    }

    getUser = async (id: number) => {
        const user = await getRepository(User).findOne({ id });

        if (!user) {
            throw ResponseError.USER_NOT_FOUND.addDetails({ id });
        }

        return user;
    }
}

const instance = new AuthMiddleware();
export default instance;
