import { describe, expect, it } from "@jest/globals";
import { type ReactElement, type Ref, createRef } from "react";

import { render, screen } from "../../test-utils/index.js";
import { List } from "../List.js";
import { ListSubheader, type ListSubheaderProps } from "../ListSubheader.js";

interface TestProps extends ListSubheaderProps {
  nodeRef?: Ref<HTMLLIElement>;
}

function Test(props: TestProps): ReactElement {
  const { children = "Subheader", nodeRef, ...remaining } = props;
  return (
    <List>
      <ListSubheader {...remaining} ref={nodeRef}>
        {children}
      </ListSubheader>
    </List>
  );
}

describe("ListSubheader", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const nodeRef = createRef<HTMLLIElement>();
    const { rerender } = render(<Test nodeRef={nodeRef} />);

    const item = screen.getByRole("presentation");
    expect(nodeRef.current).toBeInstanceOf(HTMLLIElement);
    expect(nodeRef.current).toBe(item);
    expect(item).toMatchSnapshot();

    rerender(<Test inset />);
    expect(item).toMatchSnapshot();

    const props: TestProps = {
      nodeRef,
      style: {
        color: "orange",
      },
      className: "custom-class-name",
    };

    rerender(<Test {...props} />);
    expect(item).toBeInTheDocument();
    expect(item).toHaveClass("custom-class-name");
    expect(item).toMatchSnapshot();

    rerender(<Test {...props} inset />);
    expect(item).toBeInTheDocument();
    expect(item).toHaveClass("custom-class-name");
    expect(item).toMatchSnapshot();

    rerender(<Test role="listitem" />);
    expect(item).toMatchSnapshot();

    rerender(
      <Test>
        <span>Some amazing custom content</span>
      </Test>
    );
    expect(item).toMatchSnapshot();
  });

  it("should allow for custom props to be passed to the text wrapper", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Test
        textProps={{
          ref,
          style: { backgroundColor: "orange" },
          className: "custom-class-name",
        }}
      />
    );

    const item = screen.getByRole("presentation");
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(item).toMatchSnapshot();
  });
});
