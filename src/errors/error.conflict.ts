import { CustomError } from "./error.custom";

export class ConflictError extends CustomError {
    statusCode = 409;

    /**
     * Constructor for the ConflictError class
     * @param message - The message to be displayed in the error response
     */
    constructor(message: string) {
        super(message);
    }

    serializeError = () => {
        return { message: this.message };
    };
}
