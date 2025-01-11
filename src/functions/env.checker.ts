export const EnvChecker = (value: string, type: string) => {
    if (!value) throw new Error(`${type} is not defined`);
};
