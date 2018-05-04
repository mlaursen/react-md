import * as React from "react";
import ReactDOM from "react-dom";

import App from "components/App";

const root = document.getElementById("root");

ReactDOM.hydrate(<App />, root);
