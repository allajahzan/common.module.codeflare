class ForbiddenError extends CustomError {
    statusCode = 403;

    constructor() {
        super('Forbidden');
    }

    serializeError = () => [{ message: this.message }];
}
