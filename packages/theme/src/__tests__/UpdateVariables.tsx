import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import UpdateVariables from "../UpdateVariables";
import { ICSSVariable } from "../utils";

describe("UpdateVariables", () => {
  let container: HTMLElement | null = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    // looks like the setProperty and getPropertyValue are mocked out, so
    // can add a fake implementation for tests
    const style = (document.documentElement as HTMLElement).style as any;
    style.setProperty = (name: string, value: string) => {
      style[name] = value;
    };

    style.getPropertyValue = (name: string) => style[name];
  });

  afterEach(() => {
    document.body.removeChild(container as HTMLElement);
    container = null;
  });

  it("should render without crashing with or without children provided", () => {
    expect(() =>
      render(<UpdateVariables variables={[]} />, container)
    ).not.toThrow();

    expect(() =>
      render(
        <UpdateVariables variables={[]}>
          <span />
        </UpdateVariables>,
        container
      )
    ).not.toThrow();
  });

  it("should provide the correct style prop for a children render function", () => {
    const renderer = jest.fn(({ style }) => <div style={style} />);
    let variables: ICSSVariable[] = [];
    render(
      <UpdateVariables variables={variables}>{renderer}</UpdateVariables>,
      container
    );

    expect(renderer).toBeCalledWith({});

    variables = [
      { name: "name", value: "" },
      { name: "hello-world", value: "#000" },
      { name: "1", value: "1" },
      { name: "1-2-3", value: "rgba(1, 2, 3, .12)" },
    ];
    render(
      <UpdateVariables variables={variables}>{renderer}</UpdateVariables>,
      container
    );

    expect(renderer).toBeCalledWith({
      style: {
        "--name": "",
        "--hello-world": "#000",
        "--1": "1",
        "--1-2-3": "rgba(1, 2, 3, .12)",
      },
    });
  });

  it("should correctly update the root css variables when no children are provided or it is a react element", () => {
    const variables = [
      { name: "name", value: "" },
      { name: "hello-world", value: "#000" },
      { name: "1", value: "1" },
      { name: "1-2-3", value: "rgba(1, 2, 3, .12)" },
    ];

    act(() => {
      render(<UpdateVariables variables={variables} />, container);
    });

    const rootStyle = (document.documentElement as HTMLElement).style;
    expect(rootStyle.getPropertyValue("--name")).toBe("");
    expect(rootStyle.getPropertyValue("--hello-world")).toBe("#000");
    expect(rootStyle.getPropertyValue("--1")).toBe("1");
    expect(rootStyle.getPropertyValue("--1-2-3")).toBe("rgba(1, 2, 3, .12)");

    const nextVariables = variables.slice();
    nextVariables[0].value = "SOMETHING_NEW";
    act(() => {
      render(<UpdateVariables variables={nextVariables} />, container);
    });

    expect(rootStyle.getPropertyValue("--name")).toBe("SOMETHING_NEW");
    expect(rootStyle.getPropertyValue("--hello-world")).toBe("#000");
    expect(rootStyle.getPropertyValue("--1")).toBe("1");
    expect(rootStyle.getPropertyValue("--1-2-3")).toBe("rgba(1, 2, 3, .12)");
  });
});
