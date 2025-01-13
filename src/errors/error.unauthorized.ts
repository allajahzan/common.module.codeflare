import { CustomError } from "./error.custom";

export class UnauthorizedError extends CustomError {
    statusCode = 401;

    /**
     * Constructs a new UnauthorizedError instance.
     * @param message - The error message to be associated with this error.
     */
    constructor(message: string) {
        super(message);
    }

    serializeError = () => [{ message: this.message }];
}
