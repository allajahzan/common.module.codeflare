export abstract class CustomError extends Error {
    abstract statusCode: number;

    /**
     * Constructs a new CustomError instance.
     * @param message - The error message to be associated with this error.
     */
    constructor(message: string) {
        super(message);
    }

    abstract serializeError: () => { message: string };
}
