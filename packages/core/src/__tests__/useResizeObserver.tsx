import { type ReactElement, useEffect } from "react";
import { describe, expect, it, vi } from "vitest";

import {
  act,
  createResizeObserverEntry,
  render,
  screen,
  setupResizeObserverMock,
  waitFor,
} from "../test-utils/index.js";
import { cleanupResizeObserverAfterEach } from "../test-utils/vitest/index.js";
import {
  type ResizeObserverEntryCallback,
  useResizeObserver,
} from "../useResizeObserver.js";

cleanupResizeObserverAfterEach();

describe("useResizeObserver", () => {
  it("should only create a single shared observer to improve performance", () => {
    const observe = vi.fn();
    const resizeObserverSpy = vi
      .spyOn(globalThis, "ResizeObserver")
      .mockImplementation(() => ({
        observe,
        disconnect: vi.fn(),
        unobserve: vi.fn(),
      }));

    function UpdateTest({
      onUpdate,
    }: {
      onUpdate: ResizeObserverEntryCallback;
    }): ReactElement {
      const ref = useResizeObserver({ onUpdate });
      return <div ref={ref} />;
    }

    const onUpdate1 = vi.fn();
    const onUpdate2 = vi.fn();
    const onUpdate3 = vi.fn();
    const onUpdate4 = vi.fn();
    const onUpdate5 = vi.fn();

    function Test(): ReactElement {
      return (
        <>
          <UpdateTest onUpdate={onUpdate1} />
          <UpdateTest onUpdate={onUpdate2} />
          <UpdateTest onUpdate={onUpdate3} />
          <UpdateTest onUpdate={onUpdate4} />
          <UpdateTest onUpdate={onUpdate5} />
        </>
      );
    }

    render(<Test />);
    expect(observe).toHaveBeenCalledTimes(5);
    expect(resizeObserverSpy).toHaveBeenCalledTimes(1);
  });

  it("should do nothing when disabled, both the height and width are disabled, or there is no element", () => {
    const resizeObserverSpy = vi.spyOn(globalThis, "ResizeObserver");
    const noRefUpdate = vi.fn();
    const disabledUpdate = vi.fn();
    const disabledSizesUpdate = vi.fn();

    function Test(): ReactElement {
      useResizeObserver({ onUpdate: noRefUpdate });
      const disabledRef = useResizeObserver({
        disabled: true,
        onUpdate: disabledUpdate,
      });
      const disabledSizesRef = useResizeObserver({
        disableHeight: true,
        disableWidth: true,
        onUpdate: disabledSizesUpdate,
      });

      return (
        <>
          <div ref={disabledRef} />
          <div ref={disabledSizesRef} />
        </>
      );
    }

    expect(resizeObserverSpy).toHaveBeenCalledTimes(0);
    render(<Test />);
    expect(resizeObserverSpy).toHaveBeenCalledTimes(0);
  });

  it("should wait an animation frame before updating the entries to prevent the `ResizeObserver loop limit exceeded` error", async () => {
    const frameCalled = vi.fn();
    const onUpdate = vi.fn();
    function Test(): ReactElement {
      const ref = useResizeObserver({ onUpdate });
      useEffect(() => {
        globalThis.requestAnimationFrame(frameCalled);
      }, []);
      return <div ref={ref} data-testid="div" />;
    }

    render(<Test />);
    const div = screen.getByTestId("div");
    expect(frameCalled).not.toHaveBeenCalled();
    expect(onUpdate).not.toHaveBeenCalled();

    const contentRect = div.getBoundingClientRect();
    const size: ResizeObserverSize = {
      blockSize: contentRect.height,
      inlineSize: contentRect.width,
    };

    await waitFor(() => {
      expect(frameCalled).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith({
        target: div,
        contentRect,
        borderBoxSize: [size],
        contentBoxSize: [size],
        devicePixelContentBoxSize: [],
      });
    });
  });

  it("should only trigger the onUpdate callback if the height and width have changed and the height or width change is not disabled", () => {
    const resizeObserver = setupResizeObserverMock();

    const allowBothUpdate = vi.fn();
    const allowHeightUpdate = vi.fn();
    const allowWidthUpdate = vi.fn();

    function Test(): ReactElement {
      const ref1 = useResizeObserver({
        onUpdate: allowBothUpdate,
      });
      const ref2 = useResizeObserver({
        onUpdate: allowHeightUpdate,
        disableWidth: true,
      });
      const ref3 = useResizeObserver({
        onUpdate: allowWidthUpdate,
        disableHeight: true,
      });

      return (
        <>
          <div data-testid="allow-both" ref={ref1} />
          <div data-testid="allow-height" ref={ref2} />
          <div data-testid="allow-width" ref={ref3} />
        </>
      );
    }

    render(<Test />);

    const allowBoth = screen.getByTestId("allow-both");
    const allowHeight = screen.getByTestId("allow-height");
    const allowWidth = screen.getByTestId("allow-width");

    expect(allowBothUpdate).toHaveBeenCalledTimes(1);
    expect(allowBothUpdate).toHaveBeenCalledWith(
      createResizeObserverEntry(allowBoth)
    );
    expect(allowHeightUpdate).toHaveBeenCalledTimes(1);
    expect(allowHeightUpdate).toHaveBeenCalledWith(
      createResizeObserverEntry(allowHeight)
    );
    expect(allowWidthUpdate).toHaveBeenCalledTimes(1);
    expect(allowWidthUpdate).toHaveBeenCalledWith(
      createResizeObserverEntry(allowWidth)
    );

    const allowBothHeightEntry = createResizeObserverEntry(allowBoth, {
      height: 100,
      width: 0,
    });
    act(() => {
      resizeObserver.resizeElement(allowBoth, allowBothHeightEntry);
    });
    expect(allowBothUpdate).toHaveBeenCalledTimes(2);
    expect(allowBothUpdate).toHaveBeenCalledWith(allowBothHeightEntry);
    expect(allowHeightUpdate).toHaveBeenCalledTimes(1);
    expect(allowWidthUpdate).toHaveBeenCalledTimes(1);

    const allowBothWidthEntry = createResizeObserverEntry(allowBoth, {
      height: 100,
      width: 100,
    });
    act(() => {
      resizeObserver.resizeElement(allowBoth, allowBothWidthEntry);
    });
    expect(allowBothUpdate).toHaveBeenCalledTimes(3);
    expect(allowBothUpdate).toHaveBeenCalledWith(allowBothWidthEntry);
    expect(allowHeightUpdate).toHaveBeenCalledTimes(1);
    expect(allowWidthUpdate).toHaveBeenCalledTimes(1);

    // should not be called since there are no changes
    act(() => {
      resizeObserver.resizeElement(allowBoth, allowBothWidthEntry);
    });
    expect(allowBothUpdate).toHaveBeenCalledTimes(3);
    expect(allowHeightUpdate).toHaveBeenCalledTimes(1);
    expect(allowWidthUpdate).toHaveBeenCalledTimes(1);

    // should not be fired
    const allowHeightInvalidEntry = createResizeObserverEntry(allowHeight, {
      height: 0,
      width: 100,
    });
    act(() => {
      resizeObserver.resizeElement(allowHeight, allowHeightInvalidEntry);
    });
    expect(allowBothUpdate).toHaveBeenCalledTimes(3);
    expect(allowHeightUpdate).toHaveBeenCalledTimes(1);
    expect(allowWidthUpdate).toHaveBeenCalledTimes(1);

    const allowHeightValidEntry = createResizeObserverEntry(allowHeight, {
      width: 100,
      height: 100,
    });
    act(() => {
      resizeObserver.resizeElement(allowHeight, allowHeightValidEntry);
    });
    expect(allowBothUpdate).toHaveBeenCalledTimes(3);
    expect(allowHeightUpdate).toHaveBeenCalledTimes(2);
    expect(allowHeightUpdate).toHaveBeenCalledWith(allowHeightValidEntry);
    expect(allowWidthUpdate).toHaveBeenCalledTimes(1);

    // should not be fired
    const allowWidthInvalidEntry = createResizeObserverEntry(allowWidth, {
      height: 100,
      width: 0,
    });
    act(() => {
      resizeObserver.resizeElement(allowWidth, allowWidthInvalidEntry);
    });
    expect(allowBothUpdate).toHaveBeenCalledTimes(3);
    expect(allowWidthUpdate).toHaveBeenCalledTimes(1);
    expect(allowWidthUpdate).toHaveBeenCalledTimes(1);

    const allowWidthValidEntry = createResizeObserverEntry(allowWidth, {
      width: 100,
      height: 100,
    });
    act(() => {
      resizeObserver.resizeElement(allowWidth, allowWidthValidEntry);
    });
    expect(allowBothUpdate).toHaveBeenCalledTimes(3);
    expect(allowHeightUpdate).toHaveBeenCalledTimes(2);
    expect(allowWidthUpdate).toHaveBeenCalledTimes(2);
    expect(allowWidthUpdate).toHaveBeenCalledWith(allowWidthValidEntry);
  });
});
