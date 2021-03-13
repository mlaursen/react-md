import React, { ReactElement } from "react";
import { render, fireEvent } from "@testing-library/react";

import { usePanels, UsePanelsOptions } from "../usePanels";
import { ExpansionList } from "../ExpansionList";
import { ExpansionPanel } from "../ExpansionPanel";

function Test({
  idPrefix = "panel",
  count = 3,
  multiple,
  preventAllClosed,
  defaultExpandedIndex,
}: Partial<UsePanelsOptions>): ReactElement {
  const [panels, onKeyDown] = usePanels({
    idPrefix,
    count,
    multiple,
    preventAllClosed,
    defaultExpandedIndex,
  });

  return (
    <ExpansionList onKeyDown={onKeyDown} data-testid="list">
      {panels.map((panel, i) => (
        <ExpansionPanel
          key={panel.id}
          {...panel}
          data-testid={`panel-${i + 1}`}
          header={`Header ${i + 1}`}
        >
          {`Content ${i + 1}`}
          {/* throwing a false error? */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor={`${panel.id}-input`}>Label</label>
          <input id={`${panel.id}-input`} type="text" />
        </ExpansionPanel>
      ))}
    </ExpansionList>
  );
}

const getById = (id: string) => {
  const panel = document.getElementById(id);
  if (!panel) {
    throw new Error();
  }

  return panel;
};

describe("usePanels", () => {
  describe("validation", () => {
    it("should throw a RangeError when the count is less than 1", () => {
      const error = jest.spyOn(console, "error");
      error.mockImplementation(() => {});

      const expected = new RangeError("The `count` must be greater than `0`");

      expect(() => render(<Test count={0} />)).toThrow(expected);
      expect(() => render(<Test count={-1} />)).toThrow(expected);
      expect(() => render(<Test count={-3} />)).toThrow(expected);
      expect(() => render(<Test count={-100} />)).toThrow(expected);

      error.mockRestore();
    });

    it("should throw a range Error when the defaultExpandedIndex is greater than the count", () => {
      const error = jest.spyOn(console, "error");
      error.mockImplementation(() => {});

      const expected = new RangeError(
        "The `defaultExpandedIndex` must be less than or equal to the `count`"
      );
      expect(() => render(<Test defaultExpandedIndex={3} />)).toThrowError(
        expected
      );
      expect(() => render(<Test defaultExpandedIndex={5} />)).toThrowError(
        expected
      );

      error.mockRestore();
    });

    it("should throw a range Error when the defaultExpandedIndex is less than -1", () => {
      const error = jest.spyOn(console, "error");
      error.mockImplementation(() => {});

      const expected = new RangeError(
        "The `defaultExpandedIndex` must be greater than or equal to `-1`"
      );
      expect(() => render(<Test defaultExpandedIndex={-2} />)).toThrowError(
        expected
      );
      expect(() => render(<Test defaultExpandedIndex={-5} />)).toThrowError(
        expected
      );

      error.mockRestore();
    });

    it("should throw a range Error when any number in the defaultExpandedIndex array is is greater than the count", () => {
      const error = jest.spyOn(console, "error");
      error.mockImplementation(() => {});

      const expected = new RangeError(
        "The `defaultExpandedIndex` array must contain numbers less than the `count`"
      );
      expect(() => render(<Test defaultExpandedIndex={[4]} />)).toThrowError(
        expected
      );
      expect(() =>
        render(<Test defaultExpandedIndex={[0, 1, 8]} />)
      ).toThrowError(expected);
      expect(() =>
        render(<Test defaultExpandedIndex={[4, 5, 100]} />)
      ).toThrowError(expected);

      error.mockRestore();
    });

    it("should throw a range Error when any number in the defaultExpandedIndex array is is less than 0", () => {
      const error = jest.spyOn(console, "error");
      error.mockImplementation(() => {});

      const expected = new RangeError(
        "The `defaultExpandedIndex` array must contain numbers greater than or equal to `0`"
      );
      expect(() => render(<Test defaultExpandedIndex={[-1]} />)).toThrowError(
        expected
      );
      expect(() =>
        render(<Test defaultExpandedIndex={[0, -1]} />)
      ).toThrowError(expected);
      expect(() =>
        render(<Test defaultExpandedIndex={[-1, -2, -3, 1]} />)
      ).toThrowError(expected);

      error.mockRestore();
    });
  });

  it("should provide the correct props to be passed to an ExpansionList and a list of ExpansionPanel components", () => {
    const { container, getByTestId } = render(<Test />);
    const list = getByTestId("list");

    expect(container).toMatchSnapshot();
    expect(list.childNodes.length).toBe(3);
  });

  it("should allow for a default expanded index", () => {
    let { unmount } = render(<Test defaultExpandedIndex={0} />);
    let panel1 = getById("panel-1");
    let panel2 = getById("panel-2");
    let panel3 = getById("panel-3");

    expect(panel1.getAttribute("aria-expanded")).toBe("true");
    expect(panel2.getAttribute("aria-expanded")).toBe(null);
    expect(panel3.getAttribute("aria-expanded")).toBe(null);
    unmount();

    ({ unmount } = render(<Test defaultExpandedIndex={1} />));
    panel1 = getById("panel-1");
    panel2 = getById("panel-2");
    panel3 = getById("panel-3");

    expect(panel1.getAttribute("aria-expanded")).toBe(null);
    expect(panel2.getAttribute("aria-expanded")).toBe("true");
    expect(panel3.getAttribute("aria-expanded")).toBe(null);
    unmount();

    ({ unmount } = render(<Test defaultExpandedIndex={2} />));
    panel1 = getById("panel-1");
    panel2 = getById("panel-2");
    panel3 = getById("panel-3");

    expect(panel1.getAttribute("aria-expanded")).toBe(null);
    expect(panel2.getAttribute("aria-expanded")).toBe(null);
    expect(panel3.getAttribute("aria-expanded")).toBe("true");
  });

  it("should expand all panels when the defaultExpandedIndex is -1", () => {
    const { container } = render(<Test defaultExpandedIndex={-1} />);

    expect(container).toMatchSnapshot();
    const panel1 = getById("panel-1");
    const panel2 = getById("panel-2");
    const panel3 = getById("panel-3");

    expect(panel1.getAttribute("aria-expanded")).toBe("true");
    expect(panel2.getAttribute("aria-expanded")).toBe("true");
    expect(panel3.getAttribute("aria-expanded")).toBe("true");
  });

  it("should default to only allowing 1 panel to be visible at a time", () => {
    render(<Test />);

    const panel1 = getById("panel-1");
    const panel2 = getById("panel-2");
    const panel3 = getById("panel-3");

    expect(panel1.getAttribute("aria-expanded")).toBe(null);
    expect(panel2.getAttribute("aria-expanded")).toBe(null);
    expect(panel3.getAttribute("aria-expanded")).toBe(null);

    fireEvent.click(panel1);
    expect(panel1.getAttribute("aria-expanded")).toBe("true");
    expect(panel2.getAttribute("aria-expanded")).toBe(null);
    expect(panel3.getAttribute("aria-expanded")).toBe(null);

    fireEvent.click(panel2);
    expect(panel1.getAttribute("aria-expanded")).toBe(null);
    expect(panel2.getAttribute("aria-expanded")).toBe("true");
    expect(panel3.getAttribute("aria-expanded")).toBe(null);

    fireEvent.click(panel3);
    expect(panel1.getAttribute("aria-expanded")).toBe(null);
    expect(panel2.getAttribute("aria-expanded")).toBe(null);
    expect(panel3.getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(panel3);
    expect(panel1.getAttribute("aria-expanded")).toBe(null);
    expect(panel2.getAttribute("aria-expanded")).toBe(null);
    expect(panel3.getAttribute("aria-expanded")).toBe(null);
  });

  it("should allow the defaultExpandedIndex to be a list of indexes", () => {
    const defaultExpandedIndex = [0, 4, 3];
    render(<Test defaultExpandedIndex={defaultExpandedIndex} count={5} />);

    expect(getById("panel-1")).toHaveAttribute("aria-expanded", "true");
    expect(getById("panel-2")).not.toHaveAttribute("aria-expanded");
    expect(getById("panel-3")).not.toHaveAttribute("aria-expanded");
    expect(getById("panel-4")).toHaveAttribute("aria-expanded", "true");
    expect(getById("panel-5")).toHaveAttribute("aria-expanded", "true");
  });

  it("should default to expanding the first panel if the defaultExpandedIndex is omitted when the preventAllClosed option is enabled", () => {
    render(<Test preventAllClosed />);

    expect(getById("panel-1").getAttribute("aria-expanded")).toBe("true");
  });

  it("should set the aria-disabled attribute on the expanded panel when the preventAllClosed option is enabled and prevent the panel from closing", () => {
    render(<Test preventAllClosed defaultExpandedIndex={0} />);

    const panel1 = getById("panel-1");
    const panel2 = getById("panel-2");
    const panel3 = getById("panel-3");

    expect(panel1.getAttribute("aria-disabled")).toBe("true");
    expect(panel1.getAttribute("aria-expanded")).toBe("true");
    expect(panel2.getAttribute("aria-disabled")).toBe(null);
    expect(panel2.getAttribute("aria-expanded")).toBe(null);
    expect(panel3.getAttribute("aria-disabled")).toBe(null);
    expect(panel3.getAttribute("aria-expanded")).toBe(null);

    fireEvent.click(panel2);
    expect(panel1.getAttribute("aria-disabled")).toBe(null);
    expect(panel1.getAttribute("aria-expanded")).toBe(null);
    expect(panel2.getAttribute("aria-disabled")).toBe("true");
    expect(panel2.getAttribute("aria-expanded")).toBe("true");
    expect(panel3.getAttribute("aria-disabled")).toBe(null);
    expect(panel3.getAttribute("aria-expanded")).toBe(null);

    fireEvent.click(panel2);
    expect(panel1.getAttribute("aria-disabled")).toBe(null);
    expect(panel1.getAttribute("aria-expanded")).toBe(null);
    expect(panel2.getAttribute("aria-disabled")).toBe("true");
    expect(panel2.getAttribute("aria-expanded")).toBe("true");
    expect(panel3.getAttribute("aria-disabled")).toBe(null);
    expect(panel3.getAttribute("aria-expanded")).toBe(null);
  });

  it("should prevent the last panel from being closed when preventAllClosed and multiple are enabled", () => {
    render(<Test preventAllClosed multiple defaultExpandedIndex={0} />);

    const panel1 = getById("panel-1");
    const panel2 = getById("panel-2");
    const panel3 = getById("panel-3");

    expect(panel1).toHaveAttribute("aria-expanded", "true");
    expect(panel2).not.toHaveAttribute("aria-expanded");
    expect(panel3).not.toHaveAttribute("aria-expanded");

    fireEvent.click(panel1);
    expect(panel1).toHaveAttribute("aria-expanded", "true");
    expect(panel2).not.toHaveAttribute("aria-expanded");
    expect(panel3).not.toHaveAttribute("aria-expanded");

    fireEvent.click(panel2);
    expect(panel1).toHaveAttribute("aria-expanded", "true");
    expect(panel2).toHaveAttribute("aria-expanded", "true");
    expect(panel3).not.toHaveAttribute("aria-expanded");

    fireEvent.click(panel1);
    fireEvent.click(panel2);
    expect(panel1).not.toHaveAttribute("aria-expanded");
    expect(panel2).toHaveAttribute("aria-expanded", "true");
    expect(panel3).not.toHaveAttribute("aria-expanded");
  });

  it("should enable the margin-top styles when the panel is not the first panel and the previous panel or itself is expanded and expand when clicked", () => {
    render(<Test multiple />);

    const className = "rmd-expansion-panel--margin-top";
    const panel1 = getById("panel-1");
    const panel1Container = getById("panel-1-container");
    const panel2 = getById("panel-2");
    const panel2Container = getById("panel-2-container");
    const panel3 = getById("panel-3");
    const panel3Container = getById("panel-3-container");

    expect(panel1.getAttribute("aria-expanded")).toBe(null);
    expect(panel2.getAttribute("aria-expanded")).toBe(null);
    expect(panel3.getAttribute("aria-expanded")).toBe(null);
    expect(panel1Container.className).not.toContain(className);
    expect(panel2Container.className).not.toContain(className);
    expect(panel3Container.className).not.toContain(className);

    fireEvent.click(panel1);
    expect(panel1.getAttribute("aria-expanded")).toBe("true");
    expect(panel2.getAttribute("aria-expanded")).toBe(null);
    expect(panel3.getAttribute("aria-expanded")).toBe(null);
    expect(panel1Container.className).not.toContain(className);
    expect(panel2Container.className).toContain(className);
    expect(panel3Container.className).not.toContain(className);

    fireEvent.click(panel2);
    expect(panel1.getAttribute("aria-expanded")).toBe("true");
    expect(panel2.getAttribute("aria-expanded")).toBe("true");
    expect(panel3.getAttribute("aria-expanded")).toBe(null);
    expect(panel1Container.className).not.toContain(className);
    expect(panel2Container.className).toContain(className);
    expect(panel3Container.className).toContain(className);

    fireEvent.click(panel1);
    expect(panel1.getAttribute("aria-expanded")).toBe(null);
    expect(panel2.getAttribute("aria-expanded")).toBe("true");
    expect(panel3.getAttribute("aria-expanded")).toBe(null);
    expect(panel1Container.className).not.toContain(className);
    expect(panel2Container.className).toContain(className);
    expect(panel3Container.className).toContain(className);

    fireEvent.click(panel2);
    expect(panel1.getAttribute("aria-expanded")).toBe(null);
    expect(panel2.getAttribute("aria-expanded")).toBe(null);
    expect(panel3.getAttribute("aria-expanded")).toBe(null);
    expect(panel1Container.className).not.toContain(className);
    expect(panel2Container.className).not.toContain(className);
    expect(panel3Container.className).not.toContain(className);

    fireEvent.click(panel3);
    expect(panel1.getAttribute("aria-expanded")).toBe(null);
    expect(panel2.getAttribute("aria-expanded")).toBe(null);
    expect(panel3.getAttribute("aria-expanded")).toBe("true");
    expect(panel1Container.className).not.toContain(className);
    expect(panel2Container.className).not.toContain(className);
    expect(panel3Container.className).toContain(className);
  });

  it("should allow for focus behavior with the ArrowUp, ArrowDown, Home, and End keys", () => {
    render(<Test />);
    const panel1 = getById("panel-1");
    const panel2 = getById("panel-2");
    const panel3 = getById("panel-3");

    panel1.focus();
    fireEvent.keyDown(panel1, { key: "ArrowDown" });
    expect(document.activeElement).toBe(panel2);

    fireEvent.keyDown(panel2, { key: "ArrowDown" });
    expect(document.activeElement).toBe(panel3);

    fireEvent.keyDown(panel3, { key: "ArrowDown" });
    expect(document.activeElement).toBe(panel1);

    fireEvent.keyDown(panel1, { key: "ArrowUp" });
    expect(document.activeElement).toBe(panel3);

    fireEvent.keyDown(panel3, { key: "ArrowUp" });
    expect(document.activeElement).toBe(panel2);

    fireEvent.keyDown(panel2, { key: "ArrowUp" });
    expect(document.activeElement).toBe(panel1);

    fireEvent.keyDown(panel1, { key: "End" });
    expect(document.activeElement).toBe(panel3);

    fireEvent.keyDown(panel3, { key: "End" });
    expect(document.activeElement).toBe(panel3);

    fireEvent.keyDown(panel3, { key: "Home" });
    expect(document.activeElement).toBe(panel1);

    fireEvent.keyDown(panel3, { key: "Home" });
    expect(document.activeElement).toBe(panel1);

    panel2.focus();
    fireEvent.keyDown(panel2, { key: "Home" });
    expect(document.activeElement).toBe(panel1);

    panel2.focus();
    fireEvent.keyDown(panel2, { key: "End" });
    expect(document.activeElement).toBe(panel3);
  });

  it("should not trigger the focus behavior if any of the meta keys are being pressed or a non-movement key is pressed", () => {
    render(<Test />);
    const panel1 = getById("panel-1");

    panel1.focus();
    fireEvent.keyDown(panel1, { key: "Alt" });
    expect(document.activeElement).toBe(panel1);

    fireEvent.keyDown(panel1, { key: "ArrowDown", altKey: true });
    expect(document.activeElement).toBe(panel1);

    fireEvent.keyDown(panel1, { key: "ArrowDown", shiftKey: true });
    expect(document.activeElement).toBe(panel1);

    fireEvent.keyDown(panel1, { key: "ArrowDown", metaKey: true });
    expect(document.activeElement).toBe(panel1);

    fireEvent.keyDown(panel1, { key: "ArrowDown", ctrlKey: true });
    expect(document.activeElement).toBe(panel1);

    fireEvent.keyDown(panel1, { key: "A" });
    expect(document.activeElement).toBe(panel1);
  });
});
