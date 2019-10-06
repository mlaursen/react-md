import React from "react";
import { mocked } from "ts-jest/utils";
import { cleanup, render, fireEvent } from "utils/tests";

import DemoSandbox from "../DemoSandbox";
import useSandbox from "../useSandbox";

jest.mock("../useSandbox");

const useSandboxMock = mocked(useSandbox);

beforeEach(() => {
  useSandboxMock.mockImplementation(defaultSandbox => ({
    sandbox: defaultSandbox,
    loading: false,
  }));
});
afterEach(cleanup);

describe("DemoSandbox", () => {
  it("should not return to a from url that does not start with /packages so malicious urls can't be returned to", () => {
    const sandbox = {};
    const push = jest.fn();
    const router = {
      push,
      query: {
        pkg: "tree",
        name: "Single Select Tree",
        from: "/packages/tree/demos#single-select-tree-demo-title",
      },
      pathname: "/sandbox",
    };
    const { getById, rerender } = render(<DemoSandbox sandbox={sandbox} />, {
      router,
    });
    const closeBtn = getById<HTMLButtonElement>("sandbox-dialog-close");

    fireEvent.click(closeBtn);
    expect(push).toBeCalledWith(router.query.from);

    push.mockClear();
    const badRouter = {
      ...router,
      query: {
        ...router.query,
        from:
          "http://im-a-bad-website.com/packages/tree/demos#single-select-tree-demo-title",
      },
    };
    rerender(<DemoSandbox sandbox={sandbox} />, { router: badRouter });

    fireEvent.click(closeBtn);
    expect(push).toBeCalledWith(router.pathname);
  });
});
