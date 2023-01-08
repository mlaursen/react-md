import { UserInteractionModeProvider } from "@react-md/core";
import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement, Ref } from "react";
import { createRef } from "react";

import { List } from "../List";
import type { ListItemProps } from "../ListItem";
import { ListItem } from "../ListItem";

interface TestProps extends ListItemProps {
  nodeRef?: Ref<HTMLLIElement>;
}

function Test(props: TestProps): ReactElement {
  const { children = "Item", nodeRef, ...remaining } = props;
  return (
    <List>
      <ListItem {...remaining} ref={nodeRef}>
        {children}
      </ListItem>
    </List>
  );
}

describe("ListItem", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const nodeRef = createRef<HTMLLIElement>();
    const { getByRole, rerender } = render(<Test nodeRef={nodeRef} />);

    const item = getByRole("button", { name: "Item" });
    expect(nodeRef.current).toBeInstanceOf(HTMLLIElement);
    expect(nodeRef.current).toBe(item);
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

    rerender(<Test {...props} disabled />);
    expect(item).toBeInTheDocument();
    expect(item).toHaveClass("custom-class-name");
    expect(item).toMatchSnapshot();

    rerender(<Test {...props} disabledOpacity />);
    expect(item).toBeInTheDocument();
    expect(item).toHaveClass("custom-class-name");
    expect(item).toMatchSnapshot();

    rerender(<Test {...props} disabled disabledOpacity />);
    expect(item).toBeInTheDocument();
    expect(item).toHaveClass("custom-class-name");
    expect(item).toMatchSnapshot();
  });

  it("should implement the correct click behavior", async () => {
    const onClick = jest.fn();
    const props: TestProps = { onClick };
    const { getByRole, rerender } = render(<Test {...props} />, {
      wrapper: UserInteractionModeProvider,
    });

    const item = getByRole("button", { name: "Item" });
    expect(item).toHaveProperty("tabIndex", 0);
    fireEvent.click(item);
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(<Test {...props} disabled />);
    expect(item).toHaveProperty("tabIndex", -1);
    fireEvent.click(item);

    await waitFor(() => {
      expect(item.querySelector(".rmd-ripple")).toBeNull();
    });
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(<Test {...props} />);
    expect(item).toHaveProperty("tabIndex", 0);
    await userEvent.keyboard("[Tab]");
    item.focus();

    await userEvent.keyboard("[Space]");
    expect(onClick).toHaveBeenCalledTimes(2);

    await waitFor(() => {
      expect(item.querySelector(".rmd-ripple")).toBeNull();
    });

    rerender(<Test {...props} />);
    await userEvent.keyboard("[Enter]");
    expect(onClick).toHaveBeenCalledTimes(3);

    rerender(<Test {...props} disabled />);
    await userEvent.keyboard("[Space]");
    expect(onClick).toHaveBeenCalledTimes(3);

    rerender(<Test {...props} disabled />);
    await userEvent.keyboard("[Enter]");
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("should wrap text children in span elements to enable higher contrast", () => {
    const { getByRole, rerender } = render(<Test />);
    const item = getByRole("button", { name: "Item" });
    expect(item).toMatchSnapshot();

    rerender(<Test disableTextChildren />);
    expect(item).toMatchSnapshot();

    rerender(
      <Test>
        <div>This is some content</div>
      </Test>
    );
    expect(item).toMatchSnapshot();

    rerender(
      <Test disableTextChildren>
        <div>This is some content</div>
      </Test>
    );
    expect(item).toMatchSnapshot();
  });

  it("should update the height based on the provided addons and render correctly", () => {
    const { getByRole, rerender } = render(<Test />);

    const item = getByRole("button", { name: "Item" });
    expect(item).toMatchSnapshot();

    rerender(<Test secondaryText="Secondary text!" />);
    expect(item).toMatchSnapshot();

    rerender(<Test secondaryText={<span>Secondary text as element!</span>} />);
    expect(item).toMatchSnapshot();

    rerender(
      <Test
        primaryText="Primary Text!"
        secondaryText="Secondary text!"
        disableTextChildren
      />
    );
    expect(item).toHaveTextContent("Primary Text!Secondary text!Item");
    expect(item).toMatchSnapshot();

    rerender(<Test leftAddon="Pretend Icon" />);
    expect(item).toMatchSnapshot();

    rerender(
      <Test
        leftAddon="Pretend Icon"
        rightAddon="Pretend Avatar"
        rightAddonType="avatar"
      />
    );
    expect(item).toMatchSnapshot();

    rerender(
      <Test
        leftAddon="Pretend Media"
        leftAddonType="media"
        rightAddon="Pretend Avatar"
        rightAddonType="avatar"
      />
    );
    expect(item).toMatchSnapshot();

    rerender(
      <Test
        leftAddon="Pretend Large Media"
        leftAddonType="large-media"
        rightAddon="Pretend Icon"
        rightAddonType="icon"
        rightAddonPosition="bottom"
      />
    );
    expect(item).toMatchSnapshot();

    rerender(
      <Test
        leftAddon="Pretend Large Media"
        leftAddonType="large-media"
        rightAddon="Pretend Icon"
        rightAddonType="icon"
        rightAddonPosition="bottom"
        secondaryText="Secondary Text!"
        threeLines
      />
    );
    expect(item).toMatchSnapshot();
  });

  it("should allow for custom props to be passed to the primary text wrapper", () => {
    const ref = createRef<HTMLSpanElement>();
    const { getByRole } = render(
      <Test
        textProps={{
          ref,
          style: { backgroundColor: "red" },
          className: "custom-class-name",
        }}
      />
    );

    const item = getByRole("button", { name: "Item" });
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(item).toMatchSnapshot();
  });

  it("should allow for custom props to be passed to the secondary text wrapper", () => {
    const ref = createRef<HTMLSpanElement>();
    const { getByRole } = render(
      <Test
        secondaryText="Secondary Text!"
        secondaryTextProps={{
          ref,
          style: { backgroundColor: "red" },
          className: "custom-class-name",
        }}
      />
    );

    const item = getByRole("button", { name: /Item/ });
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(item).toMatchSnapshot();
  });
});
