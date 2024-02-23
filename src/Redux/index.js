import { legacy_createStore as createStore } from "redux";
import reducer from "./Reducers";
import middleware from "./Middleware";

export default createStore(reducer, middleware);
