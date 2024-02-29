// React
import React, { useEffect, useState } from "react";

// Libraries
import PropTypes from "prop-types";
import { Container, Table, Divider, Image, Button } from "semantic-ui-react";
import { isEmpty, pickBy, keys, map, orderBy } from "lodash";
import moment from "moment";

// Redux
import { connect } from "react-redux";
import genericAction from "@Redux/Actions/generic";

// Components
import Screen from "@Components/Screen";
import Quantity from "@Modals/Quantity";

// Assets
import { Logo } from "@Assets";

// Utils
import { getExcludingNulls } from "@Utils";

// Styles
import styles from "./styles.module.css";

const Guests = ({ dispatch }) => {
	const [items, setItems] = useState([]);
	const [dateColumns, setDateColumns] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		(async () => {
			const data = await dispatch(genericAction({ method: "get", route: "/attendance/guests", emptyResponseType: [] }));
			setItems(orderBy(data, ["guestId"], "asc"));
			const dates = pickBy(data[0], (value, key) => {
				if (new RegExp(/\b[0-9]+(?:_[0-9]+)+(?:_[0-9]{3,})?\b/, "g").test(key)) {
					return key;
				}
			});
			const columns = keys(dates);
			setDateColumns(columns);
		})();
	}, []);

	const addGuest = async () => {
		const data = await dispatch(genericAction({ method: "post", route: "/guest", emptyResponseType: {} }));
		setItems((prev) => [...prev, data]);
	};

	const addAttendance = async (qty) => {
		const data = await dispatch(
			genericAction({ method: "patch", route: "/attendance/guests", body: { amt: qty }, emptyResponseType: false })
		);
		if (data) {
			const fetch = await dispatch(
				genericAction({ method: "get", route: "/attendance/guests", emptyResponseType: [] })
			);
			setItems(orderBy(fetch, ["guestId"], "asc"));
		}
		setModalVisible(false);
	};

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const renderDateHeaderColumns = () => {
		if (isEmpty(dateColumns)) return null;
		const columns = map(dateColumns, (item, index) => {
			return (
				<Table.HeaderCell key={index} className={styles.header} collapsing>
					{moment(item, "MM-DD-YYYY").format("ddd M/D")}
				</Table.HeaderCell>
			);
		});
		return columns;
	};

	const renderDetailedRows = () => {
		if (isEmpty(items)) return null;
		const columns = map(items, (item, index) => {
			let rows = [];
			for (const x of dateColumns) {
				rows.push(
					<Table.Cell key={index + x} collapsing>
						{item[x]}
					</Table.Cell>
				);
			}
			return (
				<Table.Row key={item.id}>
					<Table.Cell collapsing>{`Visitante ${getExcludingNulls(item, "guestId", "")}`}</Table.Cell>
					{rows}
				</Table.Row>
			);
		});
		return columns;
	};

	return (
		<Screen hasHeader headerTitle="Visitantes">
			{modalVisible && <Quantity handleDismiss={closeModal} handleSubmit={addAttendance} />}
			<Container>
				<div className={styles.container}>
					<Image className={styles.logo} src={Logo} />
				</div>
				<div className={styles.justify}>
					<Button primary content="Agregar Asistencias" onClick={openModal} />
					<Button primary content="Agregar Visitante" onClick={addGuest} />
				</div>
				<Table celled compact striped className={styles.body}>
					<Table.Header>
						<Table.Row className={styles.header}>
							<Table.HeaderCell className={styles.header} collapsing>
								Nombre
							</Table.HeaderCell>
							{renderDateHeaderColumns()}
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderDetailedRows()}</Table.Body>
				</Table>
				<Divider horizontal>.</Divider>
			</Container>
		</Screen>
	);
};

Guests.propTypes = {
	dispatch: PropTypes.func,
};

export default connect()(Guests);
