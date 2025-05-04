/**
 * Checks if a given environment variable exists and is not empty.
 * @param value - The environment variable value to check.
 * @param type - The type of environment variable (e.g. "JWT_SECRET", "DB_URI", etc.).
 * @throws {Error} If the variable is not defined or empty.
 */
export const envChecker = (value: string | undefined, type: string): void => {
    if (!value || value.trim() === "") {
        throw new Error(`Environment variable "${type}" is not defined or empty.`);
    }
};
