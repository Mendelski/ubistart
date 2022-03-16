import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { DefaultMiddleware } from './defaultMiddleware';
import { UserRole } from '../enums/userEnum';
import { ResponseError } from '../exceptions/responseError';
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
            if (exception instanceof TokenExpiredError) {
                return this.handleException(req, res, ResponseError.ACCESS_FORBIDDEN);
            }

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
}

const instance = new AuthMiddleware();
export default instance;
