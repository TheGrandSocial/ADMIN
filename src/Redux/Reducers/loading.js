import { API_START, API_END } from "@Actions/types";

export default function reducer(state = { isLoading: false }, action) {
	const { type } = action;
	switch (type) {
		case API_START:
			return { ...state, isLoading: true };

		case API_END:
			return { ...state, isLoading: false };

		default:
			return state;
	}
}
