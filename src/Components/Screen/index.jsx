// React
import React from "react";

// Libraries
import PropTypes from "prop-types";

// Components
import Header from "@Components/Header";

// Styles
import styles from "./styles.module.css";

const Screen = ({ children, hasHeader = false, headerTitle = "" }) => {
	return (
		<div className={styles.screen}>
			{hasHeader && <Header headerTitle={headerTitle} />}
			<div className={hasHeader ? styles.bodyWithHeader : styles.body}>{children}</div>
		</div>
	);
};

Screen.propTypes = {
	children: PropTypes.node,
};

export default Screen;
