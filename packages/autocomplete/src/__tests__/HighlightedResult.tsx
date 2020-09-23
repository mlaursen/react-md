import React from "react";
import { render } from "@testing-library/react";

import { HighlightedResult } from "../HighlightedResult";

const PROPS = {
  id: "result",
  enabled: true,
};

const getResult = () => {
  const result = document.getElementById("result");
  if (!result) {
    throw new Error();
  }

  return result;
};

describe("HighlightedResult", () => {
  it("should return the children when not enabled, there's no value, or the children are not a string", () => {
    const { container, rerender } = render(
      <HighlightedResult {...PROPS} value="">
        <span>Content</span>
      </HighlightedResult>
    );
    expect(getResult).toThrow();
    expect(container).toMatchSnapshot();

    rerender(
      <HighlightedResult {...PROPS} value="con">
        <span>Content</span>
      </HighlightedResult>
    );
    expect(getResult).toThrow();
    expect(container).toMatchSnapshot();

    rerender(
      <HighlightedResult {...PROPS} value="">
        Content
      </HighlightedResult>
    );
    expect(getResult).toThrow();
    expect(container).toMatchSnapshot();

    rerender(
      <HighlightedResult {...PROPS} enabled={false} value="con">
        Content
      </HighlightedResult>
    );
    expect(getResult).toThrow();
    expect(container).toMatchSnapshot();

    rerender(
      <HighlightedResult {...PROPS} enabled={false} value="no match">
        Content
      </HighlightedResult>
    );
    expect(getResult).toThrow();
    expect(container).toMatchSnapshot();

    rerender(
      <HighlightedResult {...PROPS} value="con">
        Content
      </HighlightedResult>
    );
    expect(getResult).not.toThrow();
    expect(container).toMatchSnapshot();
  });

  it("should correctly highlight matches that start with the value ignoring case and prevent a leading and trailing empty string", () => {
    const props = { ...PROPS, children: "This is some Content!" };
    const { container, rerender } = render(
      <HighlightedResult {...props} value="t" />
    );

    let result = getResult();
    expect(result.textContent).toBe("T");
    expect(container).toMatchSnapshot();

    // one for the <span> and one TextNode for the remaining match
    expect(container.childNodes.length).toBe(2);

    rerender(<HighlightedResult {...props} value="t!" />);
    result = getResult();
    expect(result.textContent).toBe("t!");
    expect(container).toMatchSnapshot();

    // one for the TextNode of unmatched content and the <span> the match
    expect(container.childNodes.length).toBe(2);

    rerender(<HighlightedResult {...props} value="Is SOME" />);
    result = getResult();
    expect(result.textContent).toBe("is some");
    expect(container).toMatchSnapshot();

    // one for the TextNode of unmatched prefix, one <span> for the highlighted
    // text, and the reamining TextNode for the unmatched suffix
    expect(container.childNodes.length).toBe(3);
  });

  it("should allow for custom style and className", () => {
    const style = { marginLeft: 10, textDecoration: "underline" };
    const className = "test-class-name";

    const { container } = render(
      <HighlightedResult
        {...PROPS}
        style={style}
        className={className}
        value="con"
      >
        Content
      </HighlightedResult>
    );
    expect(container).toMatchSnapshot();

    const result = getResult();
    expect(result.style.marginLeft).toBe("10px");
    expect(result.style.textDecoration).toBe("underline");
    expect(result.className).toContain(className);
  });
});
