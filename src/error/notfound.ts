import { CustomError } from "./custom";

export class NotFoundError extends CustomError {
    statusCode = 404;

    /**
     * Constructs a new NotFoundError instance.
     * @param message - The error message to be associated with this error.
     */
    constructor(message: string) {
        super(message);
    }

    serializeError = () => {
        return { message: this.message };
    };
}
