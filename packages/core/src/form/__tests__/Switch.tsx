import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { CircularProgress } from "../../progress/CircularProgress.js";
import { rmdRender, screen } from "test-utils";
import { Switch, type SwitchProps } from "../Switch.js";

const labelProps = {
  "data-testid": "label",
};

describe("Switch", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLInputElement>();
    const props = {
      ref,
      label: "Switch",
      labelProps,
    } as const;

    const { rerender } = rmdRender(<Switch {...props} />);

    const label = screen.getByTestId("label");
    const switchInput = screen.getByRole("switch", { name: "Switch" });
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(switchInput);
    expect(label).toMatchSnapshot();

    rerender(
      <Switch
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(label).toMatchSnapshot();

    rerender(
      <Switch
        {...props}
        ballStyle={{ background: "orange" }}
        ballClassName="ball-class-name"
        trackStyle={{ width: "10%" }}
        trackClassName="track-class-name"
        trackProps={{
          className: "track-props-class-name",
        }}
        containerProps={{
          style: { fontSize: "3rem" },
          className: "container-class-name",
        }}
      />
    );
    expect(label).toMatchSnapshot();

    rerender(<Switch {...props} id="custom-id" />);
    expect(label).toMatchSnapshot();
  });

  it("should allow the switch to gain the error and active colors by enabling the current-color class", () => {
    const { rerender } = rmdRender(
      <Switch label="Switch" active labelProps={labelProps} />
    );
    const label = screen.getByTestId("label");
    expect(label).toMatchSnapshot();

    rerender(<Switch label="Switch" error />);
    expect(label).toMatchSnapshot();
  });

  it("should merge any labelProps correctly", () => {
    rmdRender(
      <Switch
        label="Switch"
        style={{ color: "orange" }}
        labelProps={{
          ...labelProps,
          style: { color: "red" },
          className: "test-class-name",
        }}
        className="root-class-name"
      />
    );

    const label = screen.getByTestId("label");
    expect(label).toMatchSnapshot();
  });

  it("should render correctly when disabled", () => {
    rmdRender(<Switch label="Switch" labelProps={labelProps} disabled />);

    const label = screen.getByTestId("label");
    expect(label).toMatchSnapshot();
  });

  it("should support rendering the label before and after as well as stacked", () => {
    const { rerender } = rmdRender(
      <Switch label="Switch" labelProps={labelProps} iconAfter />
    );

    const label = screen.getByTestId("label");
    expect(label).toMatchSnapshot();

    rerender(<Switch label="Switch" labelProps={labelProps} stacked />);
    expect(label).toMatchSnapshot();

    rerender(
      <Switch label="Switch" labelProps={labelProps} stacked iconAfter />
    );
    expect(label).toMatchSnapshot();
  });

  it("should support rendering the form messages with the switch", () => {
    const props: SwitchProps = {
      label: "Label",
      messageProps: {
        children: "Help Text",
      },
      messageContainerProps: {
        "data-testid": "container",
      },
    };

    const { rerender } = rmdRender(<Switch {...props} />);

    const container = screen.getByTestId("container");
    expect(() => screen.getByText("Help Text")).not.toThrow();
    expect(container).toMatchSnapshot();

    rerender(
      <Switch
        {...props}
        error
        messageProps={{ error: true, children: "Error Text" }}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should support rendering a CircularProgress by using the ballAddon prop", () => {
    rmdRender(
      <Switch
        label="Switch"
        labelProps={labelProps}
        ballAddon={<CircularProgress aria-label="Loading" />}
      />
    );

    expect(() => screen.getByRole("progressbar")).not.toThrow();
    const label = screen.getByTestId("label");
    expect(label).toMatchSnapshot();
  });
});
