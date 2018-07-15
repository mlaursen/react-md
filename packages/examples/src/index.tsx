import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
// import "./fonts/material-icons/MaterialIcons-Regular.eot";
// import "./fonts/material-icons/MaterialIcons-Regular.ijmap";
// import "./fonts/material-icons/MaterialIcons-Regular.svg";
// import "./fonts/material-icons/MaterialIcons-Regular.ttf";
// import "./fonts/material-icons/MaterialIcons-Regular.woff";
// import "./fonts/material-icons/MaterialIcons-Regular.woff2";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
