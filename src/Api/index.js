// Libraries
import axios from "axios";

// Redux
import { API_START, API_END, API_ERROR, API_FAILURE } from "@Actions/types";

const Api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		common: {
			Authorization: "Bearer ",
		},
	},
});

export default Api;

export const apiStart = () => {
	return {
		type: API_START,
	};
};

export const apiEnd = () => {
	return {
		type: API_END,
	};
};

export const apiError = (data, type = API_ERROR) => {
	return {
		type,
		payload: { data },
	};
};

export function requestSuccess(type, data = null) {
	return { type, payload: { data } };
}

export function requestFail(data) {
	return { type: API_FAILURE, payload: { data } };
}
