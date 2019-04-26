import { cleanup, renderHook } from "react-hooks-testing-library";

import useScrollLock, { disable, enable } from "../useScrollLock";
import { DATA_RMD_NOSCROLL } from "../constants";

describe("useScrollLock", () => {
  // scrollTo doesn't exist in this version of jsdom
  const scrollTo = jest.fn() as jest.Mock<typeof window.scrollTo>;
  beforeAll(() => {
    window.scrollTo = scrollTo;
  });

  describe("enable", () => {
    afterEach(() => {
      document.body.removeAttribute(DATA_RMD_NOSCROLL);
      Object.defineProperty(window, "pageYOffset", {
        value: 0,
      });
    });

    it("should set the correct styles for an HTMLElement", () => {
      const div = document.createElement("div");

      enable(div);
      expect(div.style.top).toBe("0px");
      expect(div.style.overflow).toBe("hidden");
      expect(div.style.position).toBe("fixed");
    });

    it("should apply the data-rmd-noscroll attribute to the element", () => {
      const div = document.createElement("div");
      enable(div);
      expect(div.getAttribute(DATA_RMD_NOSCROLL)).toBe("");

      enable(document.body);
      expect(document.body.getAttribute(DATA_RMD_NOSCROLL)).toBe("");
    });

    it("should use the negate the scrollTop value for an HTMLElement", () => {
      const div = document.createElement("div");
      div.scrollTop = 0;

      enable(div);
      expect(div.style.top).toBe("0px");

      div.scrollTop = 200;
      enable(div);
      expect(div.style.top).toBe("-200px");
    });

    it("should set the correct styles for the body element", () => {
      enable(document.body);

      expect(document.body.style.left).toBe("0px");
      expect(document.body.style.right).toBe("0px");
      expect(document.body.style.top).toBe("0px");
      expect(document.body.style.overflow).toBe("hidden");
      expect(document.body.style.position).toBe("fixed");
    });

    it("should negate the pageYOffset value for the body element", () => {
      Object.defineProperty(window, "pageYOffset", {
        value: 0,
      });
      enable(document.body);
      expect(document.body.style.top).toBe("0px");

      Object.defineProperty(window, "pageYOffset", {
        value: 200,
      });
      enable(document.body);
      expect(document.body.style.top).toBe("-200px");
    });
  });

  describe("disable", () => {
    afterAll(() => {
      Object.defineProperty(window, "pageYOffset", {
        value: 0,
      });
    });

    it("should not do anything if the element does not have data-rmd-noscroll", () => {
      const div = document.createElement("div");
      div.style.left = "100px";
      div.style.top = "300px";
      div.style.position = "fixed";
      disable(div);
      expect(div.style.left).toBe("100px");
      expect(div.style.top).toBe("300px");
      expect(div.style.position).toBe("fixed");

      document.body.style.left = "100px";
      document.body.style.top = "300px";
      document.body.style.position = "fixed";
      disable(document.body);
      expect(document.body.style.left).toBe("100px");
      expect(document.body.style.top).toBe("300px");
      expect(document.body.style.position).toBe("fixed");
    });

    it("should reset all the styles for a div element", () => {
      const div = document.createElement("div");
      enable(div);
      disable(div);

      expect(div.style.top).toBe("");
      expect(div.style.overflow).toBe("");
      expect(div.style.position).toBe("");
      expect(div.getAttribute(DATA_RMD_NOSCROLL)).toBeNull();
    });

    it("should reset all the styles for the body element", () => {
      enable(document.body);
      disable(document.body);

      expect(document.body.style.top).toBe("");
      expect(document.body.style.overflow).toBe("");
      expect(document.body.style.position).toBe("");
      expect(document.body.getAttribute(DATA_RMD_NOSCROLL)).toBeNull();
    });

    it("should trigger window.scrollTo with the absolute value of the top style for the document.body", () => {
      scrollTo.mockClear();
      enable(document.body);
      disable(document.body);
      expect(window.scrollTo).toBeCalledWith(0, 0);

      Object.defineProperty(window, "pageYOffset", {
        value: 300,
      });
      scrollTo.mockClear();
      enable(document.body);
      disable(document.body);
      expect(window.scrollTo).toBeCalledWith(0, 300);
    });
  });

  describe("useScrollLock", () => {
    let div: HTMLDivElement;
    beforeEach(() => {
      div = document.createElement("div");
    });

    afterEach(() => {
      disable(document.body);
      cleanup();
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
