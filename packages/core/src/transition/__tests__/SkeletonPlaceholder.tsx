import { type ReactElement, type RefObject, createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, rmdRender, screen } from "../../test-utils/index.js";
import { SkeletonPlaceholder } from "../SkeletonPlaceholder.js";
import {
  type SkeletonPlaceholderStylingProps,
  useSkeletonPlaceholder,
} from "../useSkeletonPlaceholder.js";

describe("SkeletonPlaceholder", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "placeholder",
      ref,
      delay: "0ms",
      width: "405",
    } as const;

    const { rerender } = render(<SkeletonPlaceholder {...props} />);

    const element = screen.getByTestId("placeholder");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(element);
    expect(element).toMatchSnapshot();

    rerender(
      <SkeletonPlaceholder
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();
  });

  it("should support disabling the random values by enabling the disabled prop", () => {
    render(<SkeletonPlaceholder disabled data-testid="placeholder" />);
    const placeholder = screen.getByTestId("placeholder");

    expect(placeholder).not.toHaveClass("rmd-skeleton-placeholder");
    expect(placeholder).toMatchSnapshot();
  });

  it("should generate random styles on the client only when ssr is enabled", () => {
    const renderCount: RefObject<number> = { current: 0 };
    const generatedProps: RefObject<SkeletonPlaceholderStylingProps[]> = {
      current: [],
    };

    function Test(): ReactElement {
      renderCount.current++;

      const skeleton = useSkeletonPlaceholder();
      generatedProps.current.push(skeleton);
      return <div {...skeleton} />;
    }

    rmdRender(<Test />, { rmdConfig: { ssr: true } });
    expect(renderCount.current).toBe(2);
    expect(generatedProps.current.length).toBe(2);
    const [ssrProps, clientProps] = generatedProps.current;

    expect(ssrProps.style).toBe(undefined);
    expect(clientProps.style).toMatchObject({
      animationDelay: expect.any(String),
      width: expect.any(String),
    });
  });
});
