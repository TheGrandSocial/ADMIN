import { API_FAILURE, API_ERROR, DISMISS_NOTIFICATION, DISPLAY_NOTIFICATION } from "@Actions/types";

export default function reducer(state = { isError: false, text: "", isVisible: false }, action) {
	const { type, payload } = action;
	switch (type) {
		case API_FAILURE:
		case API_ERROR:
			return {
				...state,
				isError: true,
				text: payload.data,
				isVisible: true,
			};

		case DISPLAY_NOTIFICATION:
			return {
				...state,
				isError: payload.data.isError,
				text: payload.data.text,
				isVisible: true,
			};

		case DISMISS_NOTIFICATION:
			return { ...state, isError: false, text: "", isVisible: false };

		default:
			return state;
	}
}
