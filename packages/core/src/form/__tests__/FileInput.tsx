import { describe, expect, it } from "@jest/globals";
import { createRef, type HTMLAttributes } from "react";
import {
  type ButtonTheme,
  type ButtonThemeType,
} from "../../button/buttonStyles.js";
import { rmdRender, screen } from "../../test-utils/index.js";
import { FileInput } from "../FileInput.js";

const PROPS = {
  labelProps: {
    "data-testid": "label",
  } as HTMLAttributes<HTMLLabelElement>,
} as const;

describe("FileInput", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLInputElement>();
    const props = {
      ...PROPS,
      ref,
    } as const;

    const { rerender } = rmdRender(<FileInput {...props} />);

    const element = screen.getByTestId("label");
    const input = screen.getByLabelText(/Upload/);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(input);
    expect(element).toMatchSnapshot();

    rerender(
      <FileInput
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();
  });

  it("should support all the  button themes", () => {
    const themes: readonly ButtonTheme[] = [
      "clear",
      "primary",
      "secondary",
      "warning",
      "error",
      "disabled",
    ];
    const themeTypes: readonly ButtonThemeType[] = [
      "flat",
      "outline",
      "contained",
    ];

    const { rerender } = rmdRender(<FileInput {...PROPS} />);
    const element = screen.getByTestId("label");

    themes.forEach((theme) => {
      themeTypes.forEach((themeType) => {
        rerender(<FileInput theme={theme} themeType={themeType} />);

        expect(element).toMatchSnapshot();
      });
    });
  });

  it("should render as an icon button unless children are provided which will then render the icon and the text", () => {
    const { rerender } = rmdRender(<FileInput {...PROPS} />);
    const element = screen.getByTestId("label");
    expect(element).toMatchSnapshot();

    rerender(<FileInput buttonType="icon-square" />);
    expect(element).toMatchSnapshot();

    rerender(<FileInput>Upload</FileInput>);
    expect(element).toMatchSnapshot();

    rerender(<FileInput iconAfter>Upload</FileInput>);
    expect(element).toMatchSnapshot();

    rerender(<FileInput icon={null}>Upload</FileInput>);
    expect(element).toMatchSnapshot();
  });

  it("should update the default SrOnly text to be phoneOnly when the responsive prop is enabled", () => {
    rmdRender(<FileInput {...PROPS} responsive />);
    const element = screen.getByTestId("label");
    expect(element).toMatchSnapshot();
  });
});
