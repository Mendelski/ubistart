import { Request, Response } from 'express';
import { ResponseError } from '../exceptions/responseError';

type MethodControllerArguments = (req: Request, res: Response) => any;

export function ControllerExceptionHandler() {
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<MethodControllerArguments>) => {
        const originalMethod = descriptor.value!;

        descriptor.value = async function (request, response) {
            const resource = request.params.id || request.params.code || '';

            console.info(`Received request to ${propertyName}: ${resource}`, {
                body: request.body,
                params: request.params,
                query: request.query,
            });

            try {
                await originalMethod.bind(this)(request, response);
            } catch (exception: ResponseError | Error | any) {
                console.error(`${propertyName} failed.`, {
                    baseUrl: request.baseUrl,
                    body: request.body,
                    message: exception.message,
                    params: request.params,
                });

                if (exception instanceof ResponseError) {
                    return response.status(exception.status).json({
                        code: exception.code,
                        message: exception.message,
                        details: exception.details,
                    });
                }

                return response.status(ResponseError.GENERIC_ERROR.status).json({
                    code: ResponseError.GENERIC_ERROR.code,
                    message: ResponseError.GENERIC_ERROR.message,
                    details: exception,
                });
            }

            return descriptor;
        };
    };
}
