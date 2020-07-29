import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "components/Layout";
import Home from "components/Home";
import Route1 from "components/Route1";

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/route-1" component={Route1} />
      </Switch>
    </Layout>
  );
}
