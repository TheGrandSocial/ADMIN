// React
import React from "react";

// Libraries
import PropTypes from "prop-types";
import { Routes, Route } from "react-router-dom";
import { Dimmer } from "semantic-ui-react";
import { ReactNotifications } from "react-notifications-component";

// Redux
import { connect } from "react-redux";
import { dismissNotification } from "@Actions/notifications";

// Components
import NotificationDialog from "@Modals/NotificationDialog";
import Loading from "@Modals/Loading";

// Features
import NoMatch from "@Features/NoMatch";
import Home from "@Features/Home";
import Users from "@Features/Users";
import Guests from "@Features/Guests";

const App = ({ dispatch, isLoading, isError, notificationText, isVisible }) => {
	const handleDismiss = () => {
		dispatch(dismissNotification());
	};

	return (
		<Dimmer.Dimmable dimmed={isLoading || isError}>
			<ReactNotifications />
			<Loading isFetching={isLoading} />
			<NotificationDialog isVisible={isVisible} isError={isError} text={notificationText} onDismiss={handleDismiss} />
			<Routes>
				<Route index element={<Home />} />
				<Route path="resumen" element={<Home />} />
				<Route path="usuarios" element={<Users />} />
				<Route path="visitantes" element={<Guests />} />
				<Route path="*" element={<NoMatch />} />
			</Routes>
		</Dimmer.Dimmable>
	);
};

App.propTypes = {
	dispatch: PropTypes.func,
	isLoading: PropTypes.bool,
	isError: PropTypes.bool,
	notificationText: PropTypes.string,
};

function mapStateToProps({ loading, notifications }) {
	return {
		isLoading: loading.isLoading,
		isError: notifications.isError,
		isVisible: notifications.isVisible,
		notificationText: notifications.text,
	};
}

export default connect(mapStateToProps)(App);
