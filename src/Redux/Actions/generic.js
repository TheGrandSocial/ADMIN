import FormData from "form-data";
import Api, { apiStart, apiEnd, apiError, requestSuccess, requestFail } from "@Api";

const genericAction = ({
	method = "",
	route = "",
	body = {},
	emptyResponseType = [],
	useFormData = false,
	file = null,
	withLoading = true,
}) => {
	return async (dispatch) => {
		if (withLoading) {
			dispatch(apiStart());
		}
		let data = body;
		if (useFormData) {
			data = new FormData();
			data.append("data", JSON.stringify(body));
			if (file) {
				data.append("file", file);
			}
		}

		const promiseValue = await Api({
			method,
			url: route,
			data,
		})
			.then((response) => {
				if (!response.data.success) {
					dispatch(requestFail(response.data.message));
					return emptyResponseType;
				}
				return response.data.data;
			})
			.catch((error) => {
				dispatch(apiError(error.message));
				return emptyResponseType;
			});
		dispatch(requestSuccess("GENERIC_ACTION", promiseValue));
		if (withLoading) {
			dispatch(apiEnd());
		}
		return promiseValue;
	};
};

export default genericAction;
