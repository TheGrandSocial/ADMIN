// React
import React from "react";

// Libraries
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

// Styles
import styles from "./styles.module.css";

const Text = ({ children = "", className, as, href, disabled = false, style, text, onClick }) => {
	const renderChild = (child) => {
		if (typeof child === "string") {
			if (child.includes("\n")) {
				return child
					.split("\n")
					.filter((item) => {
						return item !== "\r";
					})
					.map((item) => {
						return (
							<div>
								{item.replace(/(?:\\[rn])+/g, "")}
								{(item.match(/(?:\\[n])/g) || []).map(() => {
									return <br />;
								})}
							</div>
						);
					});
			}
			return child;
		}
		return child;
	};

	return (
		<Header
			as={as || "h5"}
			className={`${styles.text} ${className}`}
			href={href}
			disabled={disabled}
			style={style}
			onClick={onClick}>
			{renderChild(children || text)}
		</Header>
	);
};

Text.propTypes = {
	text: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	as: PropTypes.string,
	href: PropTypes.string,
	disabled: PropTypes.bool,
	style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	onClick: PropTypes.func,
};

export default Text;
