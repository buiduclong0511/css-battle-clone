import env from "~/utils/env";

const config = {
    api: {
        baseUrl: env.string("REACT_APP_API_BASE_URL", "http://localhost:8080"),
    },
};

export default config;
