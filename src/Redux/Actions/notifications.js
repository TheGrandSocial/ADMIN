import { requestSuccess } from "@Api";
import { DISPLAY_NOTIFICATION, DISMISS_NOTIFICATION } from "@Actions/types";

// Libraries
import { Store as notificationStore } from "react-notifications-component";

export const displayNotification = (text, isError = false, isTemporary = false) => {
	return (dispatch) => {
		if (isTemporary) {
			notificationStore.addNotification({
				type: isError ? "danger" : "success",
				title: isError ? "Error" : "Success",
				message: text,
				insert: "top",
				container: "top-right",
				animationIn: ["animate__animated animate__fadeInRight"],
				animationOut: ["animate__animated animate__fadeOutRight"],
				dismiss: {
					duration: 5000,
					onScreen: true,
					pauseOnHover: true,
				},
			});
		} else {
			dispatch(requestSuccess(DISPLAY_NOTIFICATION, { text, isError }));
		}
	};
};

export const dismissNotification = () => {
	return (dispatch) => {
		dispatch(requestSuccess(DISMISS_NOTIFICATION));
	};
};
