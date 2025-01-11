class UnauthorizedError extends CustomError {
    statusCode = 401;

    constructor(message: string) {
        super(message);
    }

    serializeError = () => [{ message: this.message }];
}
