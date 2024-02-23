import React from "react";
import { Modal, Icon, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { isString } from "lodash";

// Components
import Text from "@Components/Text";

// Styles
import styles from "./styles.module.css";

const NotificationDialog = ({ text = "", isVisible = false, isError = false, onDismiss }) => {
	return (
		<Modal open={isVisible} closeOnDimmerClick={false} className={styles.modal}>
			<Modal.Content className={styles.content}>
				<Icon name={isError ? "warning sign" : "check circle"} size="big" color={isError ? "red" : "green"} />
				{isString(text) && <Text className={styles.text}>{text}</Text>}
			</Modal.Content>
			<Modal.Actions>
				<Button className={styles.button} onClick={onDismiss} color={isError ? "red" : "green"} fluid>
					Cerrar
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

NotificationDialog.propTypes = {
	text: PropTypes.string,
	isVisible: PropTypes.bool,
	isError: PropTypes.bool,
	onDismiss: PropTypes.func,
};

export default NotificationDialog;
