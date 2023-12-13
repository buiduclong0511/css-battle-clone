const { object, string, number } = require("yup");

const createSchema = object({
    taskId: string().required(),
    answers: object({
        html: string().max(2000),
        css: string().max(2000),
    }),
    charactersCount: number().required(),
}).required();

const userSolutionSchemas = { createSchema };

module.exports = userSolutionSchemas;
