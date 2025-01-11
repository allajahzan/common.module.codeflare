/**
 * Function to validate the existence of environment variables.
 * @param value - The value of the environment variable to check.
 * @param type - The name of the environment variable.
 * @throws Error if the value is undefined or empty.
 */
export const envChecker = (value: string | undefined, type: string): void => {
    if (!value || value.trim() === "") {
        throw new Error(`Environment variable "${type}" is not defined or empty.`);
    }
};
