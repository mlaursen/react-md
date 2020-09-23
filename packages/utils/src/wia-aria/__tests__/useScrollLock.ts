import { renderHook } from "@testing-library/react-hooks";

import {
  useScrollLock,
  disable,
  enable,
  DATA_RMD_NOSCROLL,
} from "../useScrollLock";

describe("useScrollLock", () => {
  describe("enable", () => {
    afterEach(() => {
      document.body.removeAttribute(DATA_RMD_NOSCROLL);
    });

    it("should set the correct styles for an HTMLElement", () => {
      const div = document.createElement("div");

      enable(div);
      expect(div.style.overflow).toBe("hidden");
    });

    it("should apply the data-rmd-noscroll attribute to the element", () => {
      const div = document.createElement("div");
      enable(div);
      expect(div.getAttribute(DATA_RMD_NOSCROLL)).toBe("");

      enable(document.body);
      expect(document.body.getAttribute(DATA_RMD_NOSCROLL)).toBe("");
    });

    it("should set the correct styles for the body element", () => {
      enable(document.body);
      expect(document.body.style.overflow).toBe("hidden");
      expect(document.body.getAttribute(DATA_RMD_NOSCROLL)).toBe("");
    });
  });

  describe("disable", () => {
    it("should not do anything if the element does not have data-rmd-noscroll", () => {
      const div = document.createElement("div");
      div.style.overflow = "auto";
      disable(div);
      expect(div.style.overflow).toBe("auto");

      document.body.style.overflow = "auto";
      disable(document.body);
      expect(document.body.style.overflow).toBe("auto");
    });

    it("should reset all the styles for a div element", () => {
      const div = document.createElement("div");
      enable(div);
      disable(div);

      expect(div.style.overflow).toBe("");
      expect(div.getAttribute(DATA_RMD_NOSCROLL)).toBeNull();
    });

    it("should reset all the styles for the body element", () => {
      enable(document.body);
      disable(document.body);

      expect(document.body.style.overflow).toBe("");
      expect(document.body.getAttribute(DATA_RMD_NOSCROLL)).toBeNull();
    });
  });

  describe("useScrollLock", () => {
    let div: HTMLDivElement;
    beforeEach(() => {
      div = document.createElement("div");
    });

    afterEach(() => {
      disable(document.body);
    });

    it("should apply the correct styles when enabled", () => {
      renderHook(() => useScrollLock(true, div));
      renderHook(() => useScrollLock(true, document.body));

      expect(div.getAttribute(DATA_RMD_NOSCROLL)).toBe("");
      expect(document.body.getAttribute(DATA_RMD_NOSCROLL)).toBe("");
    });

    // I don't know how to test switching to disabled. For some reason it is the
    // div element from setup to teardown, but when it is in the disable function,
    // it changes to the document.body...

    it("should default to using the document.body for scroll locking", () => {
      renderHook(() => useScrollLock(true));
      expect(document.body.getAttribute(DATA_RMD_NOSCROLL)).toBe("");

      disable(document.body);
      renderHook(() => useScrollLock(true, null));
      expect(document.body.getAttribute(DATA_RMD_NOSCROLL)).toBe("");
    });
  });
});
