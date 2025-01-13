import { CustomError } from "./error.custom";

export class NotFoundError extends CustomError {
    statusCode = 404;

    /**
     * Constructs a new NotFoundError instance.
     * @param message - The error message to be associated with this error.
     */
    constructor(message: string) {
        super(message);
    }

    serializeError = () => [{ message: this.message }];
}
