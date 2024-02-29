// React
import React, { useState } from "react";

// Libraries
import Joi from "joi";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "semantic-ui-react";
import { isEmpty } from "lodash";

// Components
import Input from "@Components/Input";

// Utils
import { getValidationErrors } from "@Utils/index";

// Styles
import styles from "./styles.module.css";

const Quantity = ({ handleDismiss, handleSubmit }) => {
	const defaultErrors = {
		pin: "",
	};
	const [pin, setPin] = useState("");
	const [errors, setErrors] = useState(defaultErrors);

	const schema = Joi.object().keys({
		pin: Joi.number().greater(0).required().messages({
			"number.greater": "Cantidad debe ser mayor a 0",
		}),
	});

	const handleClick = () => {
		const validation = schema.validate({ pin }, { abortEarly: false });
		if (validation.error) {
			setErrors(getValidationErrors(validation, defaultErrors));
		} else {
			handleSubmit(pin);
		}
	};

	const handleInput = (e, { name, value }) => {
		setErrors(defaultErrors);
		switch (name) {
			case "pin": {
				setPin(value);
				break;
			}
			default:
				break;
		}
	};

	return (
		<Modal open={true} onClose={handleDismiss} className={styles.modal}>
			<Modal.Content className={styles.content}>
				<Form className={styles.form}>
					<Input
						type="number"
						pattern="[0-9]*"
						inputMode="numeric"
						label="Cantidad"
						name="pin"
						value={pin}
						onChange={handleInput}
						onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
						error={!isEmpty(errors.pin) && { content: errors.pin, pointing: "above" }}
					/>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button className={styles.button} onClick={handleClick} color={"green"} fluid>
					Agregar
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

Quantity.propTypes = {
	handleDismiss: PropTypes.func,
	handleSubmit: PropTypes.func,
};

export default Quantity;
