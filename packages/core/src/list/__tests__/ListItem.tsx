import { describe, expect, it, jest } from "@jest/globals";
import { type ReactElement, type Ref, createRef } from "react";

import { UserInteractionModeProvider } from "../../interaction/UserInteractionModeProvider.js";
import { INTERACTION_CONFIG } from "../../interaction/config.js";
import {
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from "../../test-utils/index.js";
import { List } from "../List.js";
import { ListItem, type ListItemProps } from "../ListItem.js";

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
    const { rerender } = render(<Test nodeRef={nodeRef} />);

    const item = screen.getByRole("button", { name: "Item" });
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
    const { rerender } = render(<Test {...props} />, {
      wrapper: UserInteractionModeProvider,
    });

    const item = screen.getByRole("button", { name: "Item" });
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
    const { rerender } = render(<Test />);
    const item = screen.getByRole("button", { name: "Item" });
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

  it("should wrap text children in span elements to enable higher contrast unless the higher contrast is disabled", () => {
    const higherContrastMock = jest
      .spyOn(INTERACTION_CONFIG, "higherContrast", "get")
      .mockReturnValue(false);
    const { rerender } = render(<Test />);
    const item = screen.getByRole("button", { name: "Item" });
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

    higherContrastMock.mockRestore();
  });

  it("should update the height based on the provided addons and render correctly", () => {
    const { rerender } = render(<Test />);

    const item = screen.getByRole("button", { name: "Item" });
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
        multiline
      />
    );
    expect(item).toMatchSnapshot();
  });

  it("should allow for custom props to be passed to the primary text wrapper", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Test
        textProps={{
          ref,
          style: { backgroundColor: "red" },
          className: "custom-class-name",
        }}
      />
    );

    const item = screen.getByRole("button", { name: "Item" });
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(item).toMatchSnapshot();
  });

  it("should allow for custom props to be passed to the secondary text wrapper", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Test
        secondaryText="Secondary Text!"
        secondaryTextProps={{
          ref,
          style: { backgroundColor: "red" },
          className: "custom-class-name",
        }}
      />
    );

    const item = screen.getByRole("button", { name: /Item/ });
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(item).toMatchSnapshot();
  });

  it("should not allow presentational items to be interactable", async () => {
    render(<Test role="presentation" />);

    const item = screen.getByRole("presentation");
    expect(item).not.toHaveAttribute("tabIndex");

    await userEvent.click(item);
    expect(item.querySelector(".rmd-ripple")).toBeNull();
  });
});
