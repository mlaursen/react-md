import { describe, expect, it, jest } from "@jest/globals";
import { createRef, type ReactElement, type Ref } from "react";
import {
  act,
  cleanupResizeObserverAfterEach,
  rmdRender,
  screen,
  setupResizeObserverMock,
} from "../../test-utils/index.js";
import { LayoutAppBar, type LayoutAppBarProps } from "../LayoutAppBar.js";
import { Main } from "../Main.js";

const getVar = () =>
  window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--rmd-layout-header-height");

function Test(
  props: LayoutAppBarProps & { nodeRef?: Ref<HTMLDivElement> }
): ReactElement {
  const { nodeRef, ...remaining } = props;
  return (
    <>
      <LayoutAppBar {...remaining} ref={nodeRef} />
      <Main>Hello, world!</Main>
    </>
  );
}

cleanupResizeObserverAfterEach();

describe("LayoutAppBar", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      nodeRef: ref,
      children: "Content",
    } as const;

    const { rerender } = rmdRender(<Test {...props} />);

    const appBar = screen.getByRole("banner");
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toBe(appBar);
    expect(appBar).toMatchSnapshot();

    rerender(
      <Test
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(appBar).toMatchSnapshot();

    rerender(<Test {...props} position="sticky" />);
    expect(appBar).toMatchSnapshot();

    rerender(<Test {...props} as="div" data-testid="div" />);
    const divAppBar = screen.getByTestId("div");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(divAppBar);
    expect(divAppBar).toMatchSnapshot();
  });

  it("should automatically apply the app bar height as css variables", () => {
    const observer = setupResizeObserverMock();
    rmdRender(<Test />);

    expect(getVar()).toBe("0px");
    const appBar = screen.getByRole("banner");
    act(() => {
      observer.resizeElement(appBar, {
        height: 96,
      });
    });
    expect(getVar()).toBe("96px");
  });

  it("should throw an if there is no main element since it renders the SkipToMainContent component", () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => rmdRender(<LayoutAppBar />)).toThrow();
    error.mockRestore();
  });

  it("should allow props to be passed to the SkipToMainContent component", () => {
    rmdRender(
      <Test skipProps={{ children: "Main", className: "custom-link-class" }} />
    );

    const link = screen.getByRole("link");
    expect(link).toMatchSnapshot();
  });
});
