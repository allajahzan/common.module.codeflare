import { CustomError } from "./error.custom";

export class ExpiredError extends CustomError {
    statusCode = 410;

    /**
     * Constructs a new ExpiredError instance.
     * @param message - The error message to be associated with this error.
     */
    constructor(message: string) {
        super(message);
    }

    serializeError = () => {
        return { message: this.message };
    };
}
