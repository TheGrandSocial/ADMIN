import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import PropTypes from "prop-types";

// Styles
import styles from "./styles.module.css";

const Loading = ({ isFetching }) => {
	return (
		<Dimmer page active={isFetching}>
			<Loader className={styles.loading} size="large">
				Loading...
			</Loader>
		</Dimmer>
	);
};

Loading.propTypes = {
	isFetching: PropTypes.bool.isRequired,
};

export default Loading;
