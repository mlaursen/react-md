import * as React from "react";
import { ResizeObserver } from "@react-md/resize";

export interface ISimpleExampleState {
  style: React.CSSProperties;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * max) + min;
}

export default class SimpleExample extends React.Component<{}, ISimpleExampleState> {
  private el: Element | null;
  private timeout?: number;
  constructor(props: {}) {
    super(props);

    this.state = {
      style: { maxHeight: 100, maxWidth: 150 },
    };
    this.el = null;
  }

  public componentDidMount() {
    this.timeout = window.setTimeout(this.randomize, 3000);
  }

  public componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  public render() {
    const { style } = this.state;

    return (
      <div id="simple-example" style={style} className="resize-observers__container">
        <ResizeObserver target="#simple-example">
          {({ height, width, el }) => {
            this.el = el;

            return (
              <table className="resize-observers__table">
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
            )
          }}
        </ResizeObserver>
      </div>
    )
  }

  private randomize = () => {
    const maxWidth = this.el && this.el.parentElement ? this.el.parentElement.offsetWidth : 300;

    this.timeout = window.setTimeout(this.randomize, randomInt(2, 8) * 1000);
    this.setState({ style: { maxHeight: randomInt(100, 500), maxWidth: randomInt(150, maxWidth) } });
  }
}
