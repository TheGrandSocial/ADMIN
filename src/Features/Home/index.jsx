// React
import React, { useEffect, useState } from "react";

// Libraries
import PropTypes from "prop-types";
import { Container, Table, Image } from "semantic-ui-react";
import { isEmpty, reduce, pickBy, keys, map, includes } from "lodash";
import moment from "moment";

// Redux
import { connect } from "react-redux";
import genericAction from "@Redux/Actions/generic";

// Components
import Screen from "@Components/Screen";

// Assets
import { Logo } from "@Assets";

// Styles
import styles from "./styles.module.css";

const Home = ({ dispatch }) => {
	const [dateColumns, setDateColumns] = useState([]);
	const [counts, setCounts] = useState([]);

	useEffect(() => {
		(async () => {
			const data = await dispatch(genericAction({ method: "get", route: "/attendance", emptyResponseType: [] }));
			const dates = pickBy(data[0], (value, key) => {
				if (new RegExp(/\b[0-9]+(?:_[0-9]+)+(?:_[0-9]{3,})?\b/, "g").test(key)) {
					return key;
				}
			});
			const columns = keys(dates);
			const countData = map(
				["Basica", "Intermedia", "Clase Indeterminada", "Solo Social", "Visitantes", "Total"],
				(item) => {
					let temp = { type: item };
					for (const date of columns) {
						temp = {
							...temp,
							[date]: reduce(
								data,
								(total, curr) => {
									if (item === "Total") {
										return curr[`${date}_Date`] ? total + 1 : total;
									} else if (item === "Visitantes") {
										return curr[`${date}_Date`] && curr["guestId"] ? total + 1 : total;
									} else if (item === "Solo Social") {
										if (curr[date] === "Social" && curr[`${date}_Date`]) return total + 1;
										return total;
									} else if (item === "Clase Indeterminada") {
										if (curr[date] === "Clase / Social" && curr[`${date}_Date`]) return total + 1;
										return total;
									} else {
										if (includes(curr[date], item) && curr[`${date}_Date`]) return total + 1;
										return total;
									}
								},
								0
							),
						};
					}
					return temp;
				}
			);
			setCounts(countData);
			setDateColumns(columns);
		})();
	}, []);

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

	const renderCountRows = () => {
		const columns = map(counts, (item, index) => {
			const { type } = item;
			let rows = [];
			for (const x of dateColumns) {
				rows.push(
					<Table.Cell key={index + x} collapsing>
						{item[x]}
					</Table.Cell>
				);
			}
			return (
				<Table.Row key={index}>
					<Table.Cell collapsing>{type}</Table.Cell>
					{rows}
				</Table.Row>
			);
		});
		return columns;
	};

	return (
		<Screen hasHeader headerTitle="Resumen">
			<Container>
				<div className={styles.container}>
					<Image className={styles.logo} src={Logo} />
				</div>
				<Table celled compact striped>
					<Table.Header>
						<Table.Row className={styles.header}>
							<Table.HeaderCell collapsing className={styles.header}>
								Tipo
							</Table.HeaderCell>
							{renderDateHeaderColumns()}
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderCountRows()}</Table.Body>
				</Table>
			</Container>
		</Screen>
	);
};

Home.propTypes = {
	dispatch: PropTypes.func,
};

export default connect()(Home);
