import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";

import {
  type ButtonTheme,
  type ButtonThemeType,
} from "../../button/buttonStyles.js";
import { rmdRender, screen } from "../../test-utils/index.js";
import { FileInput } from "../FileInput.js";

const PROPS = {
  labelProps: {
    "data-testid": "label",
  },
} as const;

describe("FileInput", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLInputElement>();
    const props = {
      ...PROPS,
      ref,
    } as const;

    const { rerender } = rmdRender(<FileInput {...props} />);

    const label = screen.getByTestId("label");
    const input = screen.getByLabelText(/Upload/);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(input);
    expect(label).toMatchSnapshot();

    rerender(
      <FileInput
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(label).toMatchSnapshot();
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
    const label = screen.getByTestId("label");

    themes.forEach((theme) => {
      themeTypes.forEach((themeType) => {
        rerender(<FileInput theme={theme} themeType={themeType} />);

        expect(label).toMatchSnapshot();
      });
    });
  });

  it("should render as an icon button unless children are provided which will then render the icon and the text", () => {
    const { rerender } = rmdRender(<FileInput {...PROPS} />);
    const label = screen.getByTestId("label");
    expect(label).toMatchSnapshot();

    rerender(<FileInput buttonType="icon-square" />);
    expect(label).toMatchSnapshot();

    rerender(<FileInput>Upload</FileInput>);
    expect(label).toMatchSnapshot();

    rerender(<FileInput iconAfter>Upload</FileInput>);
    expect(label).toMatchSnapshot();

    rerender(<FileInput icon={null}>Upload</FileInput>);
    expect(label).toMatchSnapshot();
  });

  it("should update the default SrOnly text to be phoneOnly when the responsive prop is enabled", () => {
    rmdRender(<FileInput {...PROPS} responsive />);
    const label = screen.getByTestId("label");
    expect(label).toMatchSnapshot();
  });

  it("should support configuring the label through srOnlyLabel, aria-label, or aria-labelledby", () => {
    const { rerender } = rmdRender(<FileInput {...PROPS} />);

    const label = screen.getByTestId("label");
    const input = label.querySelector("input");
    if (!input) {
      throw new Error("Unable to find HTMLInputElement");
    }
    expect(label).toHaveTextContent("Upload");

    rerender(<FileInput {...PROPS} srOnlyLabel="My Label" />);
    expect(label).toHaveTextContent("My Label");

    rerender(<FileInput {...PROPS} aria-label="My Label" />);
    expect(label).not.toHaveTextContent("My Label");
    expect(label).not.toHaveTextContent("Upload");
    expect(label).not.toHaveAttribute("aria-label");
    expect(input).toHaveAttribute("aria-label", "My Label");

    rerender(<FileInput {...PROPS} aria-labelledby="id-of-some-element" />);
    expect(label).not.toHaveTextContent("My Label");
    expect(label).not.toHaveTextContent("Upload");
    expect(label).not.toHaveAttribute("aria-label");
    expect(label).not.toHaveAttribute("aria-labelledby");
    expect(input).not.toHaveAttribute("aria-label");
    expect(input).toHaveAttribute("aria-labelledby", "id-of-some-element");
  });
});
