import { type ReactElement } from "react";
import { describe, expect, it } from "vitest";

import { render as baseRender, screen } from "../../test-utils/index.js";
import {
  HighlightText,
  type HighlightTextComponentProps,
} from "../HighlightText.js";
import { HighlightTextMark } from "../HighlightTextMark.js";

function MarkWithDataTestId(props: HighlightTextComponentProps): ReactElement {
  return <HighlightTextMark data-testid="mark" {...props} />;
}

const render = (ui: ReactElement) =>
  baseRender(ui, {
    wrapper: function Wrapper({ children }) {
      return <div data-testid="wrapper">{children}</div>;
    },
  });

describe("HighlightText", () => {
  it("should return the children as-is if there is no query, the children are not a string, or the children is an empty string", () => {
    const { rerender } = render(<HighlightText query="">{null}</HighlightText>);

    const wrapper = screen.getByTestId("wrapper");
    expect(wrapper).toBeEmptyDOMElement();

    rerender(<HighlightText query="hello, world!">{null}</HighlightText>);
    expect(wrapper).toBeEmptyDOMElement();

    rerender(
      <HighlightText query="hello, world!">
        <span>Hello, world!</span>
      </HighlightText>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should highlight the text by wrapping in a Mark by default", () => {
    render(
      <HighlightText query="favorite">
        {"I'm Commander Shepard, and this is my favorite store on the Citadel."}
      </HighlightText>
    );
    const wrapper = screen.getByTestId("wrapper");
    expect(wrapper).toHaveTextContent(
      "I'm Commander Shepard, and this is my favorite store on the Citadel."
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should default to find all matches of the query string and wrap in the highlight component", () => {
    const { rerender } = render(
      <HighlightText query="t" highlight={MarkWithDataTestId}>
        {"I'm Commander Shepard, and this is my favorite store on the Citadel."}
      </HighlightText>
    );

    const wrapper = screen.getByTestId("wrapper");
    expect(screen.getAllByTestId("mark")).toHaveLength(5);
    expect(wrapper).toHaveTextContent(
      "I'm Commander Shepard, and this is my favorite store on the Citadel."
    );
    expect(wrapper).toMatchSnapshot();

    rerender(
      <HighlightText query="t" highlight={MarkWithDataTestId} firstMatchOnly>
        {"I'm Commander Shepard, and this is my favorite store on the Citadel."}
      </HighlightText>
    );
    expect(screen.getAllByTestId("mark")).toHaveLength(1);
    expect(wrapper).toHaveTextContent(
      "I'm Commander Shepard, and this is my favorite store on the Citadel."
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should be able to highlight text if the children are an array", () => {
    const show = true;
    const hide = false;
    render(
      <HighlightText query="t" highlight={MarkWithDataTestId}>
        Some prefixed text{show && " with a conditional"}
        {hide && " not valid"}. With a suffix.
      </HighlightText>
    );

    const wrapper = screen.getByTestId("wrapper");
    expect(screen.getAllByTestId("mark")).toHaveLength(5);
    expect(wrapper).toHaveTextContent(
      "Some prefixed text with a conditional. With a suffix."
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle diacritics correctly", () => {
    render(
      <HighlightText query="déjà" highlight={MarkWithDataTestId}>
        {"I often experience déjà vu when visiting this place."}
      </HighlightText>
    );

    const wrapper = screen.getByTestId("wrapper");
    expect(() => screen.getByTestId("mark")).not.toThrowError();
    expect(wrapper).toHaveTextContent(
      "I often experience déjà vu when visiting this place."
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should ignore whitespace", () => {
    const { rerender } = render(
      <HighlightText query="hello " highlight={MarkWithDataTestId}>
        Hello world
      </HighlightText>
    );

    const wrapper = screen.getByTestId("wrapper");
    const mark = screen.getByTestId("mark");
    expect(mark).toHaveTextContent("Hello");
    expect(wrapper).toHaveTextContent("Hello world");
    expect(wrapper).toMatchSnapshot();

    rerender(
      <HighlightText query=" " highlight={MarkWithDataTestId}>
        Hello world
      </HighlightText>
    );
    expect(() => screen.getByTestId("mark")).toThrowError();
    expect(wrapper).toHaveTextContent("Hello world");
    expect(wrapper).toMatchSnapshot();
  });

  it("should work correctly when the match starts at the beginning of the string", () => {
    const loremIpsum =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget metus ut mi mattis dapibus. Praesent interdum sapien ut posuere convallis. Donec et tristique ex. Aliquam erat volutpat. Donec sit amet dui egestas, tempus quam id, hendrerit risus. Nullam tincidunt quam ut dui aliquet ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus, purus vitae tincidunt placerat, quam diam lobortis magna, et aliquam ante diam id nunc. Cras blandit leo eu nisi elementum, nec gravida ligula pharetra. Etiam molestie luctus orci, vel hendrerit lacus eleifend ut. Nullam placerat dolor ac mi congue, non auctor metus consectetur. Ut pretium mollis vulputate.";
    render(<HighlightText query="lorem ipsum">{loremIpsum}</HighlightText>);

    const wrapper = screen.getByTestId("wrapper");
    expect(wrapper).toHaveTextContent(loremIpsum);
  });
});
