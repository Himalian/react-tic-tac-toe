import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";

import App from "./App";

const container = document.getElementById("root");
if (container !== null) {
	const root = createRoot(container);
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
else {
	console.error("root element not found, please check `index.html`")
}
