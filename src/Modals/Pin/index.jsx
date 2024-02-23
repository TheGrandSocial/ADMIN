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

const Pin = ({ isVisible = false, handleValidate }) => {
	const defaultErrors = {
		pin: "",
	};
	const [pin, setPin] = useState("");
	const [errors, setErrors] = useState(defaultErrors);

	const schema = Joi.object().keys({
		pin: Joi.string().length(4).required().messages({
			"string.length": "Pin debe ser de 4 dígitos",
			"string.empty": "Pin es un campo obligatorio",
		}),
	});

	const handleClick = async () => {
		const validation = schema.validate({ pin }, { abortEarly: false });
		if (validation.error) {
			setErrors(getValidationErrors(validation, defaultErrors));
		} else {
			await handleValidate(pin);
			setPin("");
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
		<Modal open={isVisible} closeOnDimmerClick={false} className={styles.modal}>
			<Modal.Content className={styles.content}>
				<Form className={styles.form}>
					<Input
						isPassword
						label="Pin"
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
					Validar Pin
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

Pin.propTypes = {
	isVisible: PropTypes.bool,
	handleValidate: PropTypes.func,
};

export default Pin;
