export class ResponseError extends Error {
    constructor(
        public readonly code: string,
        public readonly message: string,
        public readonly status: number = 400,
        public details?: any,
    ) {
        super(message);
    }

    static GENERIC_ERROR = new ResponseError('0000', 'Generic error', 500);
    static INVALID_PARAMS = new ResponseError('0001', 'Invalid params');

    static INVALID_CREDENTIALS = new ResponseError('1000', 'Header apikey is required', 403);
    static ACCESS_FORBIDDEN = new ResponseError('1001', 'User do not has access to this resource', 403);

    static USER_ALREADY_EXISTS = new ResponseError('2000', 'User with this email already exists');
    static INVALID_EMAIL = new ResponseError('2001', 'Invalid email');

    static TODO_NOT_FOUND = new ResponseError('3000', 'Todo not found', 404);
    static TODO_FINISHED = new ResponseError('3001', 'Todo with finished status can not be edited');

    public addDetails(details: any) {
        return new ResponseError(
            this.code,
            this.message,
            this.status,
            details,
        );
    }
}
