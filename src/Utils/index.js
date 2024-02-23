import moment from "moment";
import { map, get } from "lodash";

export const setWithExpiry = ({ key = 0, expires = true, timeInHours = 24 }) => {
	const cookie = {
		expires,
		expiry: moment().add(timeInHours, "hours"),
	};
	localStorage.setItem(`link-${key}`, JSON.stringify(cookie));
};

export const getWithExpiry = (key) => {
	const jsonItem = localStorage.getItem(`link-${key}`);
	if (!jsonItem) return true;
	const item = JSON.parse(jsonItem);
	if (item.expires && moment().isAfter(item.expiry)) {
		localStorage.removeItem(`link-${key}`);
		return true;
	}
	return false;
};

export const getValidationErrors = (validation, defaultErrors) => {
	const { details } = validation.error;
	let errors = defaultErrors;
	map(details, (item) => {
		errors = { ...errors, [item.context.key]: item.message };
	});
	return errors;
};

export const getExcludingNulls = (object, path, defaultValue) => {
	const temp = get(object, path, defaultValue);
	return temp === null ? defaultValue : temp;
};
