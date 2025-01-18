import { describe, expect, it, jest } from "@jest/globals";
import { createRef, useState } from "react";
import { act, render, screen, userEvent } from "../../test-utils/index.js";
import {
  cleanupResizeObserverAfterEach,
  setupResizeObserverMock,
} from "../../test-utils/jest-globals/index.js";
import { FontIcon } from "../../icon/FontIcon.js";
import { TextArea, type TextAreaProps } from "../TextArea.js";

describe("TextArea", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLTextAreaElement>();
    const props = {
      label: "Area",
      ref,
    } as const;
    const { rerender } = render(<TextArea {...props} />);

    const textarea = screen.getByRole("textbox", { name: "Area" });
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(ref.current).toBe(textarea);
    expect(textarea).toMatchSnapshot();

    rerender(
      <TextArea
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(textarea).toMatchSnapshot();
  });

  it("should support the readOnly state", () => {
    render(
      <TextArea readOnly containerProps={{ "data-testid": "container" }} />
    );

    const container = screen.getByTestId("container");
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("readOnly");
    expect(container).toMatchSnapshot();
  });

  it("should support the disabled state", () => {
    render(
      <TextArea
        label="Label"
        disabled
        containerProps={{ "data-testid": "container" }}
      />
    );

    const container = screen.getByTestId("container");
    const field = screen.getByRole("textbox");
    expect(field).toBeDisabled();
    expect(container).toMatchSnapshot();
  });

  it("should support an error state", () => {
    render(
      <TextArea
        label="Label"
        error
        containerProps={{ "data-testid": "container" }}
      />
    );

    const container = screen.getByTestId("container");
    expect(container).toMatchSnapshot();
  });

  it("should allow the active state to be controlled programmatically instead of with css only by using the active prop", () => {
    const props: TextAreaProps = {
      containerProps: { "data-testid": "container" },
    };
    const { rerender } = render(<TextArea {...props} />);

    const container = screen.getByTestId("container");
    expect(container).toMatchSnapshot();

    rerender(<TextArea {...props} active />);
    expect(container).toMatchSnapshot();

    rerender(<TextArea {...props} label="Label" />);
    expect(container).toMatchSnapshot();

    rerender(<TextArea {...props} label="Label" active />);
    expect(container).toMatchSnapshot();
  });

  it("should render the FormMessageContainer when the messageProps have been defined", () => {
    const { rerender } = render(
      <TextArea
        label="Area"
        messageContainerProps={{ "data-testid": "message-container" }}
      />
    );
    expect(() => screen.getByTestId("message-container")).toThrow();

    rerender(
      <TextArea
        label="Area"
        messageContainerProps={{ "data-testid": "message-container" }}
        messageProps={{ children: "Help text" }}
      />
    );

    const messageContainer = screen.getByTestId("message-container");
    expect(messageContainer).toMatchSnapshot();
  });

  it("should automatically merge the error and theme props when messageProps have been defined", () => {
    render(
      <TextArea
        label="Area"
        error
        theme="filled"
        messageContainerProps={{ "data-testid": "message-container" }}
        messageProps={{ children: "Help Text" }}
      />
    );

    const messageContainer = screen.getByTestId("message-container");
    expect(messageContainer).toMatchSnapshot();
  });

  it("should update the placeholder to be a space instead of an empty string when a label has been provided so that floating labels work correctly", () => {
    const { rerender } = render(<TextArea />);

    const field = screen.getByRole("textbox");
    expect(field).toHaveAttribute("placeholder", "");

    rerender(<TextArea label="Label" />);
    expect(field).toHaveAttribute("placeholder", " ");

    rerender(<TextArea label="Label" placeholder="" />);
    expect(field).toHaveAttribute("placeholder", " ");

    rerender(<TextArea label="Label" placeholder="Placeholder" />);
    expect(field).toHaveAttribute("placeholder", "Placeholder");
  });

  it("should allow for addons before and after the input", () => {
    render(
      <TextArea
        containerProps={{ "data-testid": "container" }}
        label="Area"
        leftAddon={<FontIcon data-testid="favorite">favorite</FontIcon>}
        rightAddon={<FontIcon data-testid="close">close</FontIcon>}
      />
    );

    const container = screen.getByTestId("container");
    expect(() => screen.getByTestId("favorite")).not.toThrow();
    expect(() => screen.getByTestId("close")).not.toThrow();
    expect(container).toMatchSnapshot();
  });

  it("should allow the label to by styled by labelProps or the labelStyle/labelClassName", () => {
    const { rerender } = render(
      <TextArea
        label="Label"
        labelStyle={{ color: "red" }}
        labelClassName="label-class-name"
        labelProps={{
          "data-testid": "label",
          style: { background: "orange" },
          className: "label-props-class-name",
        }}
      />
    );

    const label = screen.getByTestId("label");
    expect(label).toHaveStyle("background: orange");
    expect(label).not.toHaveStyle("color: red");
    expect(label).toHaveClass("label-props-class-name");
    expect(label).not.toHaveClass("label-class-name");
    expect(label).toMatchSnapshot();

    rerender(
      <TextArea
        label="Label"
        labelStyle={{ color: "red" }}
        labelClassName="label-class-name"
        labelProps={{
          "data-testid": "label",
        }}
      />
    );

    expect(label).not.toHaveStyle("background: orange");
    expect(label).toHaveStyle("color: red");
    expect(label).not.toHaveClass("label-props-class-name");
    expect(label).toHaveClass("label-class-name");
    expect(label).toMatchSnapshot();
  });

  it("should support the the native browser resize behavior", () => {
    const props: TextAreaProps = {
      containerProps: { "data-testid": "container" },
      resizeContainerProps: { "data-testid": "resize-container" },
    };
    const { rerender } = render(<TextArea {...props} resize="none" />);
    const getResizeContainer = () => screen.getByTestId("resize-container");

    const container = screen.getByTestId("container");
    expect(getResizeContainer).toThrow();
    expect(container).toMatchSnapshot();

    rerender(<TextArea {...props} resize="vertical" />);
    expect(getResizeContainer).toThrow();
    expect(container).toMatchSnapshot();

    rerender(<TextArea {...props} resize="horizontal" />);
    expect(getResizeContainer).toThrow();
    expect(container).toMatchSnapshot();

    rerender(<TextArea {...props} resize="both" />);
    expect(getResizeContainer).toThrow();
    expect(container).toMatchSnapshot();

    rerender(<TextArea {...props} resize="auto" />);
    expect(getResizeContainer).not.toThrow();
    expect(container).toMatchSnapshot();
  });

  it("should focus the textarea if the container is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TextArea
        label="Label"
        containerProps={{ "data-testid": "container" }}
        resize="none"
      />
    );

    const container = screen.getByTestId("container");
    const textarea = screen.getByRole("textbox", { name: "Label" });
    await user.click(container);
    expect(textarea).toHaveFocus();
  });

  it("should allow the value to be controlled", async () => {
    function Test() {
      const [value, setValue] = useState("");

      return (
        <TextArea
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
          }}
          label="Label"
        />
      );
    }

    const user = userEvent.setup();
    render(<Test />);
    const textarea = screen.getByRole("textbox", { name: "Label" });

    await user.type(textarea, "Hello, world!");
    expect(textarea).toHaveValue("Hello, world!");
  });

  describe("resizing behavior", () => {
    function setup(maxRows?: number) {
      const observer = setupResizeObserverMock();
      const user = userEvent.setup();
      render(
        <TextArea
          label="Label"
          containerProps={{ "data-testid": "container" }}
          maxRows={maxRows}
        />
      );

      const container = screen.getByTestId("container");
      const textarea = screen.getByRole("textbox", { name: "Label" });
      const mask = screen.getByRole("textbox", {
        name: "",
        hidden: true,
      });
      expect(textarea).not.toBe(mask);

      const getHeightVar = () =>
        window
          .getComputedStyle(container)
          .getPropertyValue("--rmd-textarea-height");
      const maskScrollHeight = jest
        .spyOn(mask, "scrollHeight", "get")
        // the default height of 3.5rem
        .mockReturnValue(56);

      return {
        mask,
        user,
        observer,
        textarea,
        container,
        getHeightVar,
        maskScrollHeight,
      };
    }

    cleanupResizeObserverAfterEach();

    it("should update the height as the user types", async () => {
      const { user, container, textarea, getHeightVar, maskScrollHeight } =
        setup();
      expect(getHeightVar()).toBe("");

      await user.type(textarea, "First line\nSecond Line\nThird Line");
      expect(getHeightVar()).toBe("56px");
      expect(container).toMatchSnapshot();

      // 4 lines of text
      maskScrollHeight.mockReturnValue(72);

      await user.type(textarea, "\nForth line!");
      expect(getHeightVar()).toBe("72px");
      expect(container).toMatchSnapshot();
    });

    it("should update the height if the width changes", () => {
      const { mask, observer, getHeightVar, maskScrollHeight } = setup();
      expect(getHeightVar()).toBe("");

      act(() => {
        observer.resizeElement(mask, { width: 200, height: 56 });
      });
      expect(getHeightVar()).toBe("56px");

      act(() => {
        observer.resizeElement(mask, { width: 200, height: 55 });
      });
      expect(getHeightVar()).toBe("56px");

      maskScrollHeight.mockReturnValue(72);
      act(() => {
        observer.resizeElement(mask, { width: 120, height: 55 });
      });
      expect(getHeightVar()).toBe("72px");
    });

    it("should include the borderHeight if the box-sizing is set to border-box", () => {
      const { mask, container, getHeightVar, observer } = setup();
      expect(getHeightVar()).toBe("");

      const baseStyle = window.getComputedStyle(container);
      baseStyle.borderTopWidth = "1px";
      baseStyle.borderBottomWidth = "1px";

      const getComputedStyle = jest
        .spyOn(window, "getComputedStyle")
        .mockImplementationOnce(() => {
          baseStyle.boxSizing = "border-box";
          return baseStyle;
        });

      act(() => {
        observer.resizeElement(mask, { width: 100 });
      });
      expect(getHeightVar()).toBe("58px");

      getComputedStyle.mockImplementationOnce(() => {
        baseStyle.boxSizing = "content-box";
        return baseStyle;
      });
      act(() => {
        observer.resizeElement(mask, { width: 120 });
      });
      expect(getHeightVar()).toBe("56px");
    });

    it("should limit the height when the max rows are greater than 0", () => {
      const { mask, textarea, observer, getHeightVar, maskScrollHeight } =
        setup(3);
      expect(getHeightVar()).toBe("");

      act(() => {
        observer.resizeElement(mask, { width: 100 });
      });
      expect(getHeightVar()).toBe("56px");
      expect(textarea).not.toHaveClass("rmd-textarea--scrollable");

      maskScrollHeight.mockReturnValue(72);
      act(() => {
        observer.resizeElement(mask, { width: 110 });
      });
      expect(getHeightVar()).toBe("72px");
      expect(textarea).toHaveClass("rmd-textarea--scrollable");

      maskScrollHeight.mockReturnValue(96);
      act(() => {
        observer.resizeElement(mask, { width: 100 });
      });
      expect(getHeightVar()).toBe("72px");
      expect(textarea).toHaveClass("rmd-textarea--scrollable");

      maskScrollHeight.mockReturnValue(56);
      act(() => {
        observer.resizeElement(mask, { width: 110 });
      });
      expect(getHeightVar()).toBe("56px");
      expect(textarea).not.toHaveClass("rmd-textarea--scrollable");
    });

    it("should not resize onChange when the resize behavior is not set to auto", async () => {
      const user = userEvent.setup();
      render(
        <TextArea
          label="Label"
          resize="none"
          containerProps={{ "data-testid": "container" }}
        />
      );
      const container = screen.getByTestId("container");
      const textarea = screen.getByRole("textbox", { name: "Label" });
      const getHeightVar = () =>
        window
          .getComputedStyle(container)
          .getPropertyValue("--rmd-textarea-height");
      expect(getHeightVar()).toBe("");

      await user.type(textarea, "Hello, world!");
      expect(getHeightVar()).toBe("");
    });
  });
});
