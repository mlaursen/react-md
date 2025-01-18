import { describe, expect, it, jest } from "@jest/globals";
import { waitFor } from "@testing-library/react";
import {
  ResizeObserverManager,
  resizeObserverManager,
} from "../../../useResizeObserver.js";
import { cleanupResizeObserverAfterEach } from "../../jest-globals/resize-observer.js";
import { createResizeObserverEntry } from "../../utils/resize-observer.js";
import { setupResizeObserverMock } from "../ResizeObserver.js";

describe("ResizeObserverMock", () => {
  cleanupResizeObserverAfterEach();

  it("should throw an error when the resizeElement function is called for an element that is not being watched", () => {
    const baseRect = document.body.getBoundingClientRect();
    const resizeObserver = setupResizeObserverMock();
    const element = document.createElement("div");

    const onUpdate = jest.fn();
    resizeObserverManager.subscribe({
      element,
      onUpdate,
      disableHeight: false,
      disableWidth: false,
    });
    expect(onUpdate).toHaveBeenCalledTimes(1);

    expect(() => {
      resizeObserver.resizeElement(document.createElement("div"));
    }).toThrow(
      "The `ResizeObserverMock` is not watching the target element and cannot be resized"
    );

    resizeObserver.resizeElement(element, { height: 100, width: 100 });
    expect(onUpdate).toHaveBeenCalledTimes(2);

    resizeObserver.resizeElement(element, (target) => ({
      target,
      contentRect: {
        ...baseRect,
        height: 20,
        width: 20,
      },
      borderBoxSize: [{ inlineSize: 100, blockSize: 100 }],
      contentBoxSize: [{ inlineSize: 40, blockSize: 80 }],
      devicePixelContentBoxSize: [],
    }));
    expect(onUpdate).toHaveBeenCalledTimes(3);
    expect(onUpdate).toHaveBeenLastCalledWith({
      target: element,
      contentRect: {
        ...baseRect,
        height: 20,
        width: 20,
      },
      borderBoxSize: [{ inlineSize: 100, blockSize: 100 }],
      contentBoxSize: [{ inlineSize: 40, blockSize: 80 }],
      devicePixelContentBoxSize: [],
    });

    resizeObserver.disconnect();
    expect(() => {
      resizeObserver.resizeElement(element, (target) =>
        createResizeObserverEntry(target, { width: 50, height: 100 })
      );
    }).toThrow(
      "The `ResizeObserverMock` is not watching the target element and cannot be resized"
    );
  });

  it("should support resizing all elements so that you can do fun stuff with jest spies", () => {
    const baseRect = document.body.getBoundingClientRect();
    const element1 = document.createElement("div");
    const element2 = document.createElement("div");
    const element3 = document.createElement("div");
    const element4 = document.createElement("div");

    const rect1 = jest
      .spyOn(element1, "getBoundingClientRect")
      .mockReturnValue({
        ...baseRect,
        height: 100,
        width: 150,
      });
    jest.spyOn(element2, "getBoundingClientRect").mockReturnValue({
      ...baseRect,
      height: 100,
      width: 150,
    });
    jest.spyOn(element3, "getBoundingClientRect").mockReturnValue({
      ...baseRect,
      height: 100,
      width: 150,
    });
    const rect4 = jest
      .spyOn(element4, "getBoundingClientRect")
      .mockReturnValue({
        ...baseRect,
        height: 100,
        width: 150,
      });

    const update1 = jest.fn();
    const update2 = jest.fn();
    const update3 = jest.fn();
    const update4 = jest.fn();
    const resizeObserver = setupResizeObserverMock();

    resizeObserverManager.subscribe({
      element: element1,
      onUpdate: update1,
      disableHeight: false,
      disableWidth: false,
    });
    resizeObserverManager.subscribe({
      element: element2,
      onUpdate: update2,
      disableHeight: false,
      disableWidth: false,
    });
    resizeObserverManager.subscribe({
      element: element3,
      onUpdate: update3,
      disableHeight: false,
      disableWidth: false,
    });
    resizeObserverManager.subscribe({
      element: element4,
      onUpdate: update4,
      disableHeight: false,
      disableWidth: false,
    });
    expect(update1).toHaveBeenCalledTimes(1);
    expect(update2).toHaveBeenCalledTimes(1);
    expect(update3).toHaveBeenCalledTimes(1);
    expect(update4).toHaveBeenCalledTimes(1);

    rect1.mockReturnValue({ ...baseRect, height: 200, width: 100 });
    rect4.mockReturnValue({ ...baseRect, height: 50, width: 200 });
    resizeObserver.resizeAllElements();
    expect(update1).toHaveBeenCalledTimes(2);
    expect(update2).toHaveBeenCalledTimes(1);
    expect(update3).toHaveBeenCalledTimes(1);
    expect(update4).toHaveBeenCalledTimes(2);
  });

  it("should support animation frames to mimic real behavior", async () => {
    const raf = jest.spyOn(window, "requestAnimationFrame");
    const manager = new ResizeObserverManager();
    setupResizeObserverMock({ raf: true, manager });
    expect(raf).not.toHaveBeenCalled();

    const element = document.createElement("div");
    const onUpdate = jest.fn();

    manager.subscribe({
      element,
      onUpdate,
      disableHeight: false,
      disableWidth: false,
    });
    expect(raf).toHaveBeenCalledTimes(1);
    expect(onUpdate).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalled();
    });
  });
});
