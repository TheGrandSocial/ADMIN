/* eslint-disable no-console */
const logger = (store) => {
	return (next) => {
		return (action) => {
			console.groupCollapsed(action.type);
			console.log("action: ", action);
			const result = next(action);
			console.log("newState: ", store.getState());
			console.groupEnd();
			return result;
		};
	};
};

export default logger;
