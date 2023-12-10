import config from "~/config";

const getImageLink = (path) => `${config.api.baseUrl}${path}`;

export default getImageLink;
