import { minimatch } from "minimatch";
import { toast } from "react-toastify";

const rules = [
    {
        url: "/**/**",
        handlers: {
            500: () => {
                // Error handle logic
                toast.error("Internal Server Error");
            },
            404: () => {
                // Error handle logic
                toast.error("Resource not found");
            },
            403: () => {
                // Error handle logic
                toast.error("Forbidden");
            },
            400: () => {
                // Error handle logic
                toast.error("Bad request");
            },
            422: () => {
                toast.error("Request body invalid");
            },
        },
    },
];

const errorHandler = (error) => {
    const url = error.response.config.url;
    const status = error.response.status;

    const matchedRule = rules.find((rule) => minimatch(url, rule.url));

    if (matchedRule) {
        const handler = matchedRule.handlers[status];

        if (handler) {
            handler(error);
        }
    }
};

export default errorHandler;
