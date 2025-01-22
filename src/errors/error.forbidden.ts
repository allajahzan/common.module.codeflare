import { CustomError } from "./error.custom";

export class ForbiddenError extends CustomError {
    statusCode = 403;

    /**
     * Constructs a new ForbiddenError instance.
     * @param message - The error message to be associated with this error.
     */
    constructor() {
        super("Forbidden");
    }

    serializeError = () => {
        return { message: this.message };
    };
}
