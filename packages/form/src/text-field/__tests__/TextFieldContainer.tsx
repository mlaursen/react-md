import React from "react";
import { render } from "@testing-library/react";

import { TextFieldContainer } from "../TextFieldContainer";

describe("TextFieldContainer", () => {
  describe("theming", () => {
    // this is a terrible way to test things...
    const states = [
      // disabled states
      { disabled: true },
      { disabled: true, dense: true },
      { disabled: true, label: true },
      { disabled: true, inline: true },
      // invalid for active or error while disabled

      { disabled: true, dense: true, label: true },
      { disabled: true, dense: true, inline: true },
      { disabled: true, label: true, inline: true },

      { disabled: true, dense: true, label: true, inline: true },

      // remaining error states
      { error: true },
      { error: true, dense: true },
      { error: true, inline: true },
      { error: true, active: true },
      { error: true, label: true },

      { error: true, dense: true, inline: true },
      { error: true, dense: true, active: true },
      { error: true, dense: true, label: true },

      { error: true, dense: true, inline: true, active: true },
      { error: true, dense: true, inline: true, label: true },
      { error: true, dense: true, active: true, label: true },

      { error: true, dense: true, inline: true, active: true, label: true },

      // remaining active states
      { active: true },
      { active: true, dense: true },
      { active: true, inline: true },
      { active: true, label: true },

      { active: true, dense: true, inline: true },
      { active: true, dense: true, label: true },
      { active: true, inline: true, label: true },

      { active: true, dense: true, inline: true, label: true },

      // remaining label states
      { label: true },
      { label: true, dense: true },

      // remaining states
      { inline: true },
      { dense: true },
    ];

    describe("underline", () => {
      it("should render correctly with each state", () => {
        const { container, rerender } = render(
          <TextFieldContainer theme="underline" />
        );

        expect(container).toMatchSnapshot();

        states.forEach((props) => {
          rerender(<TextFieldContainer theme="underline" {...props} />);
          expect(container).toMatchSnapshot();
        });
      });
    });

    describe("filled", () => {
      it("should render correctly with each state", () => {
        const { container, rerender } = render(
          <TextFieldContainer theme="filled" />
        );

        expect(container).toMatchSnapshot();

        states.forEach((props) => {
          rerender(<TextFieldContainer theme="filled" {...props} />);
          expect(container).toMatchSnapshot();
        });
      });
    });

    describe("outline", () => {
      it("should render correctly with each state", () => {
        const { container, rerender } = render(
          <TextFieldContainer theme="outline" />
        );

        expect(container).toMatchSnapshot();

        states.forEach((props) => {
          rerender(<TextFieldContainer theme="outline" {...props} />);
          expect(container).toMatchSnapshot();
        });
      });
    });

    describe("none", () => {
      it("should render correctly with each state", () => {
        const { container, rerender } = render(
          <TextFieldContainer theme="none" />
        );

        expect(container).toMatchSnapshot();

        states.forEach((props) => {
          rerender(<TextFieldContainer theme="none" {...props} />);
          expect(container).toMatchSnapshot();
        });
      });
    });
  });

  it("should render correctly with optional left children within an addon", () => {
    const addonClassName =
      "rmd-text-field-addon rmd-text-field-addon--presentational";
    const leftChildren = <span data-testid="left">Left</span>;

    const { container, getByTestId, rerender } = render(
      <TextFieldContainer theme="none" leftChildren={leftChildren} />
    );
    let leftNode = getByTestId("left");
    expect(container).toMatchSnapshot();
    expect(leftNode.parentElement?.className).toBe(addonClassName);

    rerender(
      <TextFieldContainer
        theme="none"
        leftChildren={leftChildren}
        isLeftAddon
      />
    );
    leftNode = getByTestId("left");
    expect(container).toMatchSnapshot();
    expect(leftNode.parentElement?.className).toBe(addonClassName);

    rerender(
      <TextFieldContainer
        theme="none"
        leftChildren={leftChildren}
        isLeftAddon={false}
      />
    );
    leftNode = getByTestId("left");
    expect(container).toMatchSnapshot();
    expect(leftNode.parentElement?.className).not.toContain(
      "rmd-text-field-addon"
    );
  });

  it("should render correctly with optional right children within an addon", () => {
    const addonClassName =
      "rmd-text-field-addon rmd-text-field-addon--presentational";
    const rightChildren = <span data-testid="right">Right</span>;

    const { container, getByTestId, rerender } = render(
      <TextFieldContainer theme="none" rightChildren={rightChildren} />
    );
    let rightNode = getByTestId("right");
    expect(container).toMatchSnapshot();
    expect(rightNode.parentElement?.className).toBe(addonClassName);

    rerender(
      <TextFieldContainer
        theme="none"
        rightChildren={rightChildren}
        isRightAddon
      />
    );
    rightNode = getByTestId("right");
    expect(container).toMatchSnapshot();
    expect(rightNode.parentElement?.className).toBe(addonClassName);

    rerender(
      <TextFieldContainer
        theme="none"
        rightChildren={rightChildren}
        isRightAddon={false}
      />
    );
    rightNode = getByTestId("right");
    expect(container).toMatchSnapshot();
    expect(rightNode.parentElement?.className).not.toContain(
      "rmd-text-field-addon"
    );
  });
});
