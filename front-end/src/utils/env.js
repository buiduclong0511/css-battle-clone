const env = {
    int: (key, defaultValue) => Number(process.env[key] ?? defaultValue),
    string: (key, defaultValue) => String(process.env[key] ?? defaultValue),
    boolean: (key, defaultValue) => Boolean(process.env[key] ?? defaultValue),
};

export default env;
