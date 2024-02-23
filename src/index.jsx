// React
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "@Redux";

// App
import App from "./App";

// Styles
import "@Styles/index.css";

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
