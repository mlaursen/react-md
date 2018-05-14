import * as React from "react";
import { Text } from "@react-md/typography";
import { Collapse } from "@react-md/transition";

export interface ICollapseExampleState {
  collapsed: boolean;
}
export default class CollapseExample extends React.Component<null, ICollapseExampleState> {
  constructor(props) {
    super(props);

    this.state = { collapsed: true };
  }

  public render() {
    const { collapsed } = this.state;
    return (
      <section id="collapse-examples" className="example">
        <button
          id="collapse-toggle-btn"
          type="button"
          aria-controls="collapse-area-1"
          aria-expanded={collapsed ? "false" : "true"}
          onClick={this.toggle}
        >
          Toggle
        </button>
        <Collapse
          id="collapse-area-1"
          collapsed={collapsed}
          className="card"
        >
          <Text type="body-1">
            Lorem ipsum
          </Text>
          <div className="color" />
        </Collapse>
      </section>
    );
  }

  private toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }
}
