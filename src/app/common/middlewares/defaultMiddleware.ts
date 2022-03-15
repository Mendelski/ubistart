import { Request, Response } from 'express';
import { ResponseError } from '../exceptions/responseError';

export class DefaultMiddleware {
    handleException = (request: Request, response: Response, exception: any): any => {
        if (!(exception instanceof ResponseError)) {
            return this.handleException(request, response, ResponseError.GENERIC_ERROR);
        }

        console.error(exception.message, {
            exception: { ...exception },
            message: exception.message,
            baseUrl: request.baseUrl,
            body: request.body,
            params: request.params,
            headers: request.headers,
        });

        return response.status(exception.status).json({
            code: exception.code,
            message: exception.message,
            details: exception.details,
        });
    };
}
