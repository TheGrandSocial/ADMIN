// React
import React from "react";

// Libraries
import { Container } from "semantic-ui-react";

// Components
import Screen from "@Components/Screen";
import Text from "@Components/Text";

// Styles
import styles from "./styles.module.css";

const NoMatch = () => {
	return (
		<Screen>
			<Container>
				<div className={styles.container}>
					<Text className={styles.title}>Oops!</Text>
					<Text className={styles.subTitle}>404 - Page Not Found</Text>
					<div className={styles.paragraphContainer}>
						<Text className={styles.paragraph}>
							The page you are looking for might have been removed had its name changed or is temporarily unavailable.
						</Text>
					</div>
				</div>
			</Container>
		</Screen>
	);
};

export default NoMatch;
