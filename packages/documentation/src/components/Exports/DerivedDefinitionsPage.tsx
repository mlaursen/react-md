import * as React from "react";
import * as Router from "react-router";

export type IDerivedDefinitionsPageProps = Router.RouteComponentProps<void>;

import DefinitionsPage from "./DefinitionsPage";
import dummyData from "./dummyData";

export default class DerivedDefinitionsPage extends React.Component<IDerivedDefinitionsPageProps> {
  constructor(props: IDerivedDefinitionsPageProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const {
      match: { path },
    } = this.props;
    let packageName = path.substring("/packages/".length);
    packageName = packageName.substring(0, packageName.indexOf("/"));
    // console.log("packageName:", packageName);

    return <DefinitionsPage packageDefinition={dummyData} />;
  }
}
