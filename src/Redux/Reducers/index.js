import { combineReducers } from "redux";

import loading from "./loading";
import notifications from "./notifications";

export default combineReducers({
	loading,
	notifications,
});
