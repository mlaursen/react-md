import type { ReactElement } from "react";
import { createRef } from "react";
import {
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from "../../test-utils";

import { ExpansionList } from "../ExpansionList";
import type { ExpansionPanelProps } from "../ExpansionPanel";
import { ExpansionPanel } from "../ExpansionPanel";
import type { ExpansionPanelHookOptions } from "../useExpansionPanels";
import { useExpansionPanels } from "../useExpansionPanels";

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
  it("should default to single expansion, allowing all panels to be closed, no expanded ids, and apply hidden while collapsed", async () => {
    const { container, getByRole, getAllByRole } = render(<Test />);
    const panel1 = getByRole("button", { name: "Panel 1" });
    const panel2 = getByRole("button", { name: "Panel 2" });
    const panel3 = getByRole("button", { name: "Panel 3" });

    const [panel1Contents, panel2Contents, panel3Contents] = getAllByRole(
      "region",
      { hidden: true }
    );

    expect(panel1).toHaveAttribute("aria-expanded", "false");
    expect(panel2).toHaveAttribute("aria-expanded", "false");
    expect(panel3).toHaveAttribute("aria-expanded", "false");
    expect(panel1Contents).toBeInTheDocument();
    expect(panel2Contents).toBeInTheDocument();
    expect(panel3Contents).toBeInTheDocument();
    expect(panel1Contents).toHaveAttribute("hidden");
    expect(panel2Contents).toHaveAttribute("hidden");
    expect(panel3Contents).toHaveAttribute("hidden");
    expect(container).toMatchSnapshot();

    fireEvent.click(panel1);
    expect(panel1).toHaveAttribute("aria-expanded", "true");
    expect(panel2).toHaveAttribute("aria-expanded", "false");
    expect(panel3).toHaveAttribute("aria-expanded", "false");
    expect(panel1Contents).not.toHaveAttribute("hidden");
    expect(panel2Contents).toHaveAttribute("hidden");
    expect(panel3Contents).toHaveAttribute("hidden");

    fireEvent.click(panel1);
    // have to wait because of the collapse transition
    await waitFor(() => {
      expect(panel1).toHaveAttribute("aria-expanded", "false");
      expect(panel2).toHaveAttribute("aria-expanded", "false");
      expect(panel3).toHaveAttribute("aria-expanded", "false");
      expect(panel1Contents).toHaveAttribute("hidden");
      expect(panel2Contents).toHaveAttribute("hidden");
      expect(panel3Contents).toHaveAttribute("hidden");
    });

    fireEvent.click(panel2);
    await waitFor(() => {
      expect(panel1).toHaveAttribute("aria-expanded", "false");
      expect(panel2).toHaveAttribute("aria-expanded", "true");
      expect(panel3).toHaveAttribute("aria-expanded", "false");
      expect(panel1Contents).toHaveAttribute("hidden");
      expect(panel2Contents).not.toHaveAttribute("hidden");
      expect(panel3Contents).toHaveAttribute("hidden");
    });

    fireEvent.click(panel3);
    await waitFor(() => {
      expect(panel1).toHaveAttribute("aria-expanded", "false");
      expect(panel2).toHaveAttribute("aria-expanded", "false");
      expect(panel3).toHaveAttribute("aria-expanded", "true");
      expect(panel1Contents).toHaveAttribute("hidden");
      expect(panel2Contents).toHaveAttribute("hidden");
      expect(panel3Contents).not.toHaveAttribute("hidden");
    });
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
    render(<Test multiple preventAllClosed />);
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
    render(<Test preventAllClosed />);
    const panel1 = screen.getByRole("button", { name: "Panel 1" });
    const panel2 = screen.getByRole("button", { name: "Panel 2" });
    const panel3 = screen.getByRole("button", { name: "Panel 3" });

    expect(panel1).toHaveAttribute("aria-expanded", "true");
    expect(panel2).toHaveAttribute("aria-expanded", "false");
    expect(panel3).toHaveAttribute("aria-expanded", "false");

    await user.tab();
    expect(document.activeElement).toBe(panel1);

    await user.keyboard("[End]");
    expect(document.activeElement).toBe(panel3);

    await user.keyboard("[Home]");
    expect(document.activeElement).toBe(panel1);

    await user.keyboard("[ArrowUp]");
    expect(document.activeElement).toBe(panel3);

    await user.keyboard("[ArrowUp]");
    expect(document.activeElement).toBe(panel2);

    await user.keyboard("[ArrowDown]");
    expect(document.activeElement).toBe(panel3);

    await user.keyboard("[ArrowDown]");
    expect(document.activeElement).toBe(panel1);

    // not searchable
    await user.keyboard("p");
    expect(document.activeElement).toBe(panel1);
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
    const { getByRole, rerender } = render(<ExpansionPanel {...props} />);

    const contentEl = getByRole("region", { hidden: true });
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
    expect(content1).toHaveAttribute("hidden");
    expect(content1).not.toHaveClass("rmd-collapse--enter");
    expect(content1).not.toHaveClass("rmd-collapse--leave");

    rerender(<Test defaultExpandedIndex={0} />);
    await user.click(panel1);
    expect(content1).not.toHaveAttribute("hidden");
    expect(content1).toHaveClass("rmd-collapse--enter");
    expect(content1).not.toHaveClass("rmd-collapse--leave");
  });
});
