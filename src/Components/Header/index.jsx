// React
import React from "react";
import { useNavigate } from "react-router-dom";

// Libraries
import PropTypes from "prop-types";
import { Container, Icon, Menu, Popup, Image } from "semantic-ui-react";

// Components
import Text from "@Components/Text";

// Styles
import styles from "./styles.module.css";

const Header = ({ headerTitle }) => {
	const navigate = useNavigate();

	const resumen = () => {
		navigate("/resumen");
	};

	const usuarios = () => {
		navigate("/usuarios");
	};

	const visitantes = () => {
		navigate("/visitantes");
	};

	return (
		<div className={styles.header}>
			<Container fluid className={styles.row}>
				<Popup
					className={styles.menu}
					basic
					on="click"
					position="bottom right"
					trigger={<Icon className={styles.icon} name="bars" />}>
					<Popup.Content>
						<Menu vertical>
							<Menu.Item className={styles.menuItem} onClick={resumen}>
								<Icon className={styles.menuIcon} name="clipboard list" />
								<Text className={styles.text}>Resumen</Text>
							</Menu.Item>
							<Menu.Item className={styles.menuItem} onClick={usuarios}>
								<Icon className={styles.menuIcon} name="users" />
								<Text className={styles.text}>Usuarios</Text>
							</Menu.Item>
							<Menu.Item className={styles.menuItem} onClick={visitantes}>
								<Icon className={styles.menuIcon} name="user secret" />
								<Text className={styles.text}>Visitantes</Text>
							</Menu.Item>
						</Menu>
					</Popup.Content>
				</Popup>
				<div className={styles.headerTextContainer}>
					<Text className={styles.headerText}>{headerTitle}</Text>
				</div>
			</Container>
		</div>
	);
};

Header.propTypes = {
	headerTitle: PropTypes.string,
};

export default Header;
