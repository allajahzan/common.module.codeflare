import { CustomError } from "./error.custom";

export class BadRequestError extends CustomError {
    statusCode = 400;

    /**
     * Constructor for the BadRequestError class
     * @param message - The message to be displayed in the error response
     */
    constructor(message: string) {
        super(message);
    }

    serializeError = () => {
        return { message: this.message };
    };
}
