// React
import React from "react";

// Libraries
import PropTypes from "prop-types";

// Styles
import styles from "./styles.module.css";

const Screen = ({ children }) => {
	return (
		<div className={styles.screen}>
			<div className={styles.body}>{children}</div>
		</div>
	);
};

Screen.propTypes = {
	children: PropTypes.node,
};

export default Screen;
