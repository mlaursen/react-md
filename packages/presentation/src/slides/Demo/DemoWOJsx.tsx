import React, { Component, createElement } from "react";

export class First extends Component {
  public render() {
    return createElement("div", {
      className: "red",
    });
  }
}

export class Second extends Component {
  public render() {
    return createElement(
      "div",
      {
        className: "red",
      },
      createElement(
        "button",
        {
          type: "button",
        },
        "Button"
      )
    );
  }
}

export class FirstJSX extends Component {
  public render() {
    return <div className="red" />;
  }
}

export class SecondJSX extends Component {
  public render() {
    return (
      <div className="red">
        <button type="button">Button</button>
      </div>
    );
  }
}
