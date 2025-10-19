import { type ReactElement, createRef } from "react";
import { beforeEach, describe, expect, it } from "vitest";

import {
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from "../../test-utils/index.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";
import { isElementVisible } from "../../utils/isElementVisible.js";
import { ExpansionList } from "../ExpansionList.js";
import { ExpansionPanel, type ExpansionPanelProps } from "../ExpansionPanel.js";
import {
  type ExpansionPanelHookOptions,
  useExpansionPanels,
} from "../useExpansionPanels.js";

interface TestProps extends ExpansionPanelHookOptions {
  manualIds?: boolean;
  disablePanel2?: boolean;
}

function Test(props: TestProps): ReactElement {
  const { manualIds, ...options } = props;
  const { getPanelProps } = useExpansionPanels(options);

  return (
    <ExpansionList>
      <ExpansionPanel
        {...getPanelProps(manualIds ? "panel-1" : 0)}
        headerChildren="Panel 1"
      >
        Panel 1 Contents
      </ExpansionPanel>
      <ExpansionPanel
        {...getPanelProps(manualIds ? "panel-2" : 1)}
        headerChildren="Panel 2"
      >
        Panel 2 Contents
      </ExpansionPanel>
      <ExpansionPanel
        {...getPanelProps(manualIds ? "panel-3" : 2)}
        headerChildren="Panel 3"
      >
        Panel 3 Contents
      </ExpansionPanel>
    </ExpansionList>
  );
}

describe("ExpansionPanel", () => {
  beforeEach(() => {
    TRANSITION_CONFIG.disabled = false;
  });

  it("should default to single expansion, allowing all panels to be closed, no expanded ids, and apply hidden while collapsed", async () => {
    const { container } = render(<Test />);
    const panel1 = screen.getByRole("button", { name: "Panel 1" });
    const panel2 = screen.getByRole("button", { name: "Panel 2" });
    const panel3 = screen.getByRole("button", { name: "Panel 3" });

    const [panel1Contents, panel2Contents, panel3Contents] =
      screen.getAllByRole("region");

    expect(panel1).toHaveAttribute("aria-expanded", "false");
    expect(panel2).toHaveAttribute("aria-expanded", "false");
    expect(panel3).toHaveAttribute("aria-expanded", "false");
    expect(panel1Contents).toBeInTheDocument();
    expect(panel2Contents).toBeInTheDocument();
    expect(panel3Contents).toBeInTheDocument();
    expect(isElementVisible(panel1Contents)).toBe(false);
    expect(isElementVisible(panel2Contents)).toBe(false);
    expect(isElementVisible(panel3Contents)).toBe(false);
    expect(container).toMatchSnapshot();

    fireEvent.click(panel1);
    expect(panel1).toHaveAttribute("aria-expanded", "true");
    expect(panel2).toHaveAttribute("aria-expanded", "false");
    expect(panel3).toHaveAttribute("aria-expanded", "false");
    expect(isElementVisible(panel1Contents)).toBe(true);
    expect(isElementVisible(panel2Contents)).toBe(false);
    expect(isElementVisible(panel3Contents)).toBe(false);

    fireEvent.click(panel1);
    // have to wait because of the collapse transition
    await waitFor(() => {
      expect(isElementVisible(panel1Contents)).toBe(false);
    });
    expect(panel1).toHaveAttribute("aria-expanded", "false");
    expect(panel2).toHaveAttribute("aria-expanded", "false");
    expect(panel3).toHaveAttribute("aria-expanded", "false");
    expect(isElementVisible(panel2Contents)).toBe(false);
    expect(isElementVisible(panel3Contents)).toBe(false);

    fireEvent.click(panel2);
    await waitFor(() => {
      expect(isElementVisible(panel2Contents)).toBe(true);
    });
    expect(panel1).toHaveAttribute("aria-expanded", "false");
    expect(panel2).toHaveAttribute("aria-expanded", "true");
    expect(panel3).toHaveAttribute("aria-expanded", "false");
    expect(isElementVisible(panel1Contents)).toBe(false);
    expect(isElementVisible(panel3Contents)).toBe(false);

    fireEvent.click(panel3);
    await waitFor(() => {
      expect(isElementVisible(panel2Contents)).toBe(false);
    });
    expect(panel1).toHaveAttribute("aria-expanded", "false");
    expect(panel2).toHaveAttribute("aria-expanded", "false");
    expect(panel3).toHaveAttribute("aria-expanded", "true");
    expect(isElementVisible(panel1Contents)).toBe(false);
    expect(isElementVisible(panel3Contents)).toBe(true);
  });

  it("should support multiple panel expansion using the multiple prop", async () => {
    const user = userEvent.setup();
    render(<Test multiple defaultExpandedIndex={1} />);
    const panel1 = screen.getByRole("button", { name: "Panel 1" });
    const panel2 = screen.getByRole("button", { name: "Panel 2" });
    const panel3 = screen.getByRole("button", { name: "Panel 3" });

    expect(panel1).toHaveAttribute("aria-expanded", "false");
    expect(panel2).toHaveAttribute("aria-expanded", "true");
    expect(panel3).toHaveAttribute("aria-expanded", "false");

    await user.click(panel1);
    expect(panel1).toHaveAttribute("aria-expanded", "true");
    expect(panel2).toHaveAttribute("aria-expanded", "true");
    expect(panel3).toHaveAttribute("aria-expanded", "false");

    await user.click(panel1);
    expect(panel1).toHaveAttribute("aria-expanded", "false");
    expect(panel2).toHaveAttribute("aria-expanded", "true");
    expect(panel3).toHaveAttribute("aria-expanded", "false");
  });

  it("should support providing a list of default expanded ids", () => {
    render(
      <Test
        manualIds
        multiple
        defaultExpandedIds={() => ["panel-1", "panel-2"]}
      />
    );
    const panel1 = screen.getByRole("button", { name: "Panel 1" });
    const panel2 = screen.getByRole("button", { name: "Panel 2" });
    const panel3 = screen.getByRole("button", { name: "Panel 3" });

    expect(panel1).toHaveAttribute("aria-expanded", "true");
    expect(panel2).toHaveAttribute("aria-expanded", "true");
    expect(panel3).toHaveAttribute("aria-expanded", "false");
  });

  it("should support preventing all the panels from being closed", async () => {
    const user = userEvent.setup();
    render(<Test multiple preventAllCollapsed />);
    const panel1 = screen.getByRole("button", { name: "Panel 1" });
    const panel2 = screen.getByRole("button", { name: "Panel 2" });
    const panel3 = screen.getByRole("button", { name: "Panel 3" });

    expect(panel1).toHaveAttribute("aria-expanded", "true");
    expect(panel2).toHaveAttribute("aria-expanded", "false");
    expect(panel3).toHaveAttribute("aria-expanded", "false");
    expect(panel1).toHaveAttribute("aria-disabled");

    await user.click(panel1);
    expect(panel1).toHaveAttribute("aria-expanded", "true");
    expect(panel2).toHaveAttribute("aria-expanded", "false");
    expect(panel3).toHaveAttribute("aria-expanded", "false");
  });

  it("should handle keyboard movement correctly", async () => {
    const user = userEvent.setup();
    render(<Test preventAllCollapsed />);
    const panel1 = screen.getByRole("button", { name: "Panel 1" });
    const panel2 = screen.getByRole("button", { name: "Panel 2" });
    const panel3 = screen.getByRole("button", { name: "Panel 3" });

    expect(panel1).toHaveAttribute("aria-expanded", "true");
    expect(panel2).toHaveAttribute("aria-expanded", "false");
    expect(panel3).toHaveAttribute("aria-expanded", "false");

    await user.tab();
    expect(panel1).toHaveFocus();

    await user.keyboard("[End]");
    expect(panel3).toHaveFocus();

    await user.keyboard("[Home]");
    expect(panel1).toHaveFocus();

    await user.keyboard("[ArrowUp]");
    expect(panel3).toHaveFocus();

    await user.keyboard("[ArrowUp]");
    expect(panel2).toHaveFocus();

    await user.keyboard("[ArrowDown]");
    expect(panel3).toHaveFocus();

    await user.keyboard("[ArrowDown]");
    expect(panel1).toHaveFocus();

    // not searchable
    await user.keyboard("p");
    expect(panel1).toHaveFocus();
  });

  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props: ExpansionPanelProps = {
      children: "Content",
      expanded: false,
      onExpandClick() {
        // do nothing
      },
      contentProps: {
        ref,
      },
    };
    const { rerender } = render(<ExpansionPanel {...props} />);

    const contentEl = screen.getByRole("region");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(contentEl);
    expect(contentEl).toMatchSnapshot();

    rerender(
      <ExpansionPanel
        {...props}
        contentProps={{
          ...props.contentProps,
          style: { color: "white" },
          className: "custom-class-name",
        }}
      />
    );
    expect(contentEl).toMatchSnapshot();
  });

  it("should apply the correct styling, HTML attributes, and allow a ref on the content element", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      ref,
      children: "Content",
      expanded: false,
      onExpandClick() {
        // do nothing
      },
    } as const;
    const { container, rerender } = render(<ExpansionPanel {...props} />);

    const containerEl = container.firstElementChild;
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(containerEl);
    expect(containerEl).toMatchSnapshot();

    rerender(
      <ExpansionPanel
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(containerEl).toMatchSnapshot();
  });

  it("should support disabling the transition", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Test disableTransition defaultExpandedIndex={0} />
    );
    const panel1 = screen.getByRole("button", { name: "Panel 1" });

    const content1 = screen.getByRole("region", { name: "Panel 1" });
    await user.click(panel1);
    expect(isElementVisible(content1)).toBe(false);
    expect(content1).not.toHaveClass("rmd-collapse--enter");
    expect(content1).not.toHaveClass("rmd-collapse--leave");

    rerender(<Test defaultExpandedIndex={0} />);
    await user.click(panel1);
    expect(isElementVisible(content1)).toBe(true);
    expect(content1).toHaveClass("rmd-collapse--enter");
    expect(content1).not.toHaveClass("rmd-collapse--leave");
  });
});
