import React, { FunctionComponent, ErrorInfo, Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { StatesConfig } from "@react-md/states";
import { KeyboardTracker } from "@react-md/wia-aria";
import { TextContainer, Text } from "@react-md/typography";

import "./slides.scss";
import Navigator from "./Navigator/Navigator";
import CurrentSlide from "./CurrentSlide";
import CurrentIndex from "./CurrentIndex";
import Footer from "./Footer/Footer";

const history = createBrowserHistory();

const App: FunctionComponent = () => (
  <StatesConfig>
    <KeyboardTracker>
      <Router history={history}>
        <CurrentIndex>
          <Navigator>
            <CurrentSlide />
          </Navigator>
          <Footer />
        </CurrentIndex>
      </Router>
    </KeyboardTracker>
  </StatesConfig>
);
export default App;
