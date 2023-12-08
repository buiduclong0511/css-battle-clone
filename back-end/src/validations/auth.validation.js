const { object, string } = require("yup");

const signInSchema = object({ email: string().email().required() }).required();

const signInWithTokenSchema = object({ token: string().required() }).required();

const confirmSignInSchema = object({
    email: string().email().required(),
    token: string().required(),
}).required();

const authSchemas = {
    signInSchema,
    signInWithTokenSchema,
    confirmSignInSchema,
};

module.exports = authSchemas;
