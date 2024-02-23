import { applyMiddleware } from "redux";

import thunk from "redux-thunk";
import logger from "./logger";

const useLogger = import.meta.env.VITE_ENV_MODE === "dev";

const middlewares = useLogger ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);

export default middlewares;
