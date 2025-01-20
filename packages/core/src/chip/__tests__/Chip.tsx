import { describe, expect, it, jest } from "@jest/globals";
import { type ReactElement, createRef } from "react";

import { FontIcon } from "../../icon/FontIcon.js";
import { INTERACTION_CONFIG } from "../../interaction/config.js";
import {
  fireEvent,
  render,
  rmdRender,
  screen,
  userEvent,
} from "../../test-utils/index.js";
import { useToggle } from "../../useToggle.js";
import { DISPLAY_NONE_CLASS } from "../../utils/isElementVisible.js";
import { Chip } from "../Chip.js";

describe("Chip", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      ref,
      children: "Chip",
    } as const;
    const { rerender } = render(<Chip {...props} />);

    const chip = screen.getByRole("button", { name: "Chip" });
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(chip);
    expect(chip).toMatchSnapshot();

    rerender(
      <Chip
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(chip).toMatchSnapshot();

    rerender(<Chip {...props} disabled />);
    expect(chip).toMatchSnapshot();

    rerender(<Chip {...props} theme="outline" />);
    expect(chip).toMatchSnapshot();

    rerender(<Chip {...props} disabled theme="outline" />);
    expect(chip).toMatchSnapshot();
  });

  it("should apply the pressed class name while raisable", () => {
    const modeMock = jest
      .spyOn(INTERACTION_CONFIG, "mode", "get")
      .mockReturnValue("press");
    const { rerender } = render(<Chip raisable>Chip</Chip>);
    const chip = screen.getByRole("button");

    fireEvent.mouseDown(chip);
    expect(chip).toHaveClass("rmd-chip--pressed");
    expect(chip).toMatchSnapshot();

    fireEvent.mouseUp(chip);
    expect(chip).not.toHaveClass("rmd-chip--pressed");
    expect(chip).toMatchSnapshot();

    rerender(<Chip>Chip</Chip>);
    fireEvent.mouseDown(chip);
    expect(chip).not.toHaveClass("rmd-chip--pressed");
    expect(chip).toMatchSnapshot();

    fireEvent.mouseUp(chip);
    expect(chip).not.toHaveClass("rmd-chip--pressed");
    expect(chip).toMatchSnapshot();

    modeMock.mockRestore();
  });

  it("should wrap the children in an additional span unless the disableContentWrap prop is enabled", () => {
    const ref = createRef<HTMLSpanElement>();
    const props = {
      contentStyle: { color: "red" },
      contentClassName: "content-class-name",
      contentProps: {
        ref,
        className: "custom-class-name",
      },
      children: "Content",
    } as const;

    const { rerender } = render(<Chip {...props} />);
    const chip = screen.getByRole("button", { name: "Content" });

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(chip.firstElementChild);
    expect(chip).toMatchSnapshot();

    rerender(<Chip {...props} disableContentWrap />);
    expect(ref.current).toBe(null);
    expect(chip).toMatchSnapshot();
  });

  it("should allow for addons to appear before and after the children", () => {
    render(
      <Chip
        leftAddon={<FontIcon>favorite</FontIcon>}
        rightAddon={<FontIcon>close</FontIcon>}
      >
        Content
      </Chip>
    );

    const chip = screen.getByRole("button", { name: "Content" });
    expect(chip).toMatchSnapshot();
  });

  it("should render as a span when the noninteractive prop is enabled", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      "data-testid": "chip",
      ref,
      children: "Content",
    } as const;
    const { rerender } = render(<Chip {...props} noninteractive />);

    let chip = screen.getByTestId("chip");
    expect(chip).toBeInstanceOf(HTMLSpanElement);
    expect(chip).not.toHaveAttribute("aria-pressed");
    expect(chip).not.toHaveAttribute("type");
    expect(chip).toBeEnabled();
    expect(chip).not.toHaveClass("rmd-interaction-surface");
    expect(chip).toMatchSnapshot();

    rerender(<Chip {...props} />);
    chip = screen.getByTestId("chip");
    expect(chip).toBeInstanceOf(HTMLButtonElement);
    expect(chip).toHaveAttribute("type", "button");
    expect(chip).toBeEnabled();
    expect(chip).toHaveClass("rmd-interaction-surface");
    expect(chip).toMatchSnapshot();
  });

  describe("selectable chips", () => {
    it("should update the aria-pressed state based on the selected state for interactable chips", () => {
      const { rerender } = render(
        <Chip data-testid="chip" selected={false}>
          Chip
        </Chip>
      );
      const buttonChip = screen.getByTestId("chip");
      expect(buttonChip).not.toHaveAttribute("aria-pressed");

      rerender(
        <Chip data-testid="chip" selected>
          Chip
        </Chip>
      );
      expect(buttonChip).toHaveAttribute("aria-pressed", "true");

      rerender(
        <Chip data-testid="chip" selected noninteractive>
          Chip
        </Chip>
      );

      const spanChip = screen.getByTestId("chip");
      expect(spanChip).not.toHaveAttribute("aria-pressed", "true");
    });

    it("should apply the selected icon when the selectedThemed prop is not true", () => {
      const props = {
        selected: false,
        children: "Chip",
      } as const;

      const { rerender } = render(<Chip {...props} />);
      const chip = screen.getByRole("button");
      expect(chip).toMatchSnapshot();

      rerender(<Chip {...props} selected />);
      expect(chip).toMatchSnapshot();

      rerender(<Chip {...props} leftAddon={<FontIcon>favorite</FontIcon>} />);
      expect(chip).toMatchSnapshot();

      rerender(
        <Chip {...props} selected leftAddon={<FontIcon>favorite</FontIcon>} />
      );
      expect(chip).toMatchSnapshot();

      rerender(
        <Chip
          {...props}
          leftAddon={<FontIcon>favorite</FontIcon>}
          selectedIconAfter
        />
      );
      expect(chip).toMatchSnapshot();

      rerender(
        <Chip
          {...props}
          selected
          leftAddon={<FontIcon>favorite</FontIcon>}
          selectedIconAfter
        />
      );
      expect(chip).toMatchSnapshot();

      rerender(<Chip {...props} rightAddon={<FontIcon>favorite</FontIcon>} />);
      expect(chip).toMatchSnapshot();

      rerender(
        <Chip {...props} selected rightAddon={<FontIcon>favorite</FontIcon>} />
      );
      expect(chip).toMatchSnapshot();

      rerender(
        <Chip
          {...props}
          rightAddon={<FontIcon>favorite</FontIcon>}
          selectedIconAfter
        />
      );
      expect(chip).toMatchSnapshot();

      rerender(
        <Chip
          {...props}
          selected
          rightAddon={<FontIcon>favorite</FontIcon>}
          selectedIconAfter
        />
      );
      expect(chip).toMatchSnapshot();
    });

    it("should allow for a custom selectedIcon", () => {
      const { rerender } = render(
        <Chip selected={false} selectedIcon={<FontIcon>favorite</FontIcon>}>
          Chip
        </Chip>
      );

      const chip = screen.getByRole("button");
      expect(chip).toMatchSnapshot();

      rerender(
        <Chip selected selectedIcon={<FontIcon>favorite</FontIcon>}>
          Chip
        </Chip>
      );
      expect(chip).toMatchSnapshot();

      rerender(
        <Chip selected={false} selectedIcon="Text">
          Chip
        </Chip>
      );
      expect(chip).toMatchSnapshot();

      rerender(
        <Chip selected selectedIcon="Text">
          Chip
        </Chip>
      );
      expect(chip).toMatchSnapshot();

      rerender(
        <Chip selected={false} selectedIcon="Text" selectedIconAfter>
          Chip
        </Chip>
      );
      expect(chip).toMatchSnapshot();

      rerender(
        <Chip selected selectedIcon="Text" selectedIconAfter>
          Chip
        </Chip>
      );
      expect(chip).toMatchSnapshot();
    });

    it(`should apply ${DISPLAY_NONE_CLASS} to the icon if the disableIconTransition prop is enabled`, () => {
      const props = {
        selected: false,
        children: "Chip",
        selectedThemed: false,
        disableIconTransition: true,
      } as const;

      const { rerender } = render(<Chip {...props} />);
      const chip = screen.getByRole("button");
      expect(chip).toMatchSnapshot();

      rerender(<Chip {...props} selected />);
      expect(chip).toMatchSnapshot();

      rerender(<Chip {...props} selectedIconAfter />);
      expect(chip).toMatchSnapshot();

      rerender(<Chip {...props} selected selectedIconAfter />);
      expect(chip).toMatchSnapshot();
    });

    it("should allow a className to only be applied while selected", async () => {
      const user = userEvent.setup();
      function Test(): ReactElement {
        const { toggled, toggle } = useToggle();
        return (
          <Chip
            selectedClassName="selected-class-name"
            selected={toggled}
            onClick={toggle}
          >
            Chip
          </Chip>
        );
      }

      rmdRender(<Test />);
      const chip = screen.getByRole("button", { name: "Chip" });
      expect(chip).not.toHaveClass("selected-class-name");

      await user.click(chip);
      expect(chip).toHaveClass("selected-class-name");
    });
  });
});
