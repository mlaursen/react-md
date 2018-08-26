import * as React from "react";
import { ResizeListener } from "@react-md/listeners";

export interface IResizeListenerUsingOnResizeState {
  height: number;
  width: number;
}

export default class ResizeListenerUsingOnResize extends React.Component<{}, IResizeListenerUsingOnResizeState> {
  constructor(props: {}) {
    super(props);

    this.state = { height: 0, width: 0 };
  }

  public render() {
    const { height, width } = this.state;
    return (
      <React.Fragment>
        <ResizeListener onResize={this.handleResize} />
        <table>
          <tbody>
            <tr>
              <th scope="row">height:</th>
              <td>{height}</td>
            </tr>
            <tr>
              <th scope="row">width:</th>
              <td>{width}</td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }

  private handleResize = (event: Event) => {
    const { innerWidth, innerHeight } = window;
    this.setState({ height: innerHeight, width: innerWidth });
  };
}
