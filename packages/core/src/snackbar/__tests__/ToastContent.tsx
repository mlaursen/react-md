import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { render, screen, waitFor } from "../../test-utils/index.js";
import { ToastContent } from "../ToastContent.js";

describe("ToastContent", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "content",
      ref,
      children: "Some Content!",
    } as const;
    const { rerender } = render(<ToastContent {...props} />);
    const content = screen.getByTestId("content");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(content);
    expect(content).toMatchSnapshot();

    rerender(
      <ToastContent
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(content).toMatchSnapshot();
  });

  it("should only render the children if the disableWrapper prop is enabled", () => {
    const { container } = render(
      <ToastContent data-testid="content" disableWrapper>
        Content
      </ToastContent>
    );

    expect(() => screen.getByTestId("content")).toThrow();
    expect(container).toMatchSnapshot();
  });

  it("should attempt to enable multiline content automatically", async () => {
    const props = {
      "data-testid": "content",
      children: <p>Some text</p>,
    } as const;

    const getComputedStyle = vi
      .spyOn(window, "getComputedStyle")
      .mockReturnValue(
        // @ts-expect-error
        {
          lineHeight: "",
        }
      );

    const { rerender, unmount } = render(<ToastContent {...props} />);
    await waitFor(() => {
      expect(getComputedStyle).toHaveBeenCalled();
    });
    let content = screen.getByTestId("content");
    expect(content).not.toHaveClass("rmd-toast-content--v-padding");

    rerender(<ToastContent {...props} multiline />);
    content = screen.getByTestId("content");
    expect(content).toHaveClass("rmd-toast-content--v-padding");

    unmount();
    expect(content).not.toBeInTheDocument();

    getComputedStyle.mockReturnValue(
      // @ts-expect-error
      {
        lineHeight: "22",
      }
    );
    vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(120);
    render(<ToastContent {...props} />);
    content = screen.getByTestId("content");

    // because there is an animation frame before calling
    await waitFor(() => {
      expect(content).toHaveClass("rmd-toast-content--v-padding");
    });
  });
});
