import { describe, expect, it, jest } from "@jest/globals";
import { createRef } from "react";
import { fireEvent, render, screen } from "test-utils";
import { ClickableCard } from "../ClickableCard.js";

describe("ClickableCard", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "card",
      ref,
      onClick: jest.fn(),
    } as const;
    const { rerender } = render(<ClickableCard {...props} />);

    const element = screen.getByTestId("card");
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toBe(element);
    expect(element).toMatchSnapshot();

    rerender(
      <ClickableCard
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();
  });

  it("should not have a tabIndex while disabled", () => {
    render(<ClickableCard data-testid="card" disabled onClick={jest.fn()} />);
    const card = screen.getByTestId("card");
    expect(card).toHaveAttribute("aria-disabled");
    expect(card).not.toHaveAttribute("tabIndex");
  });

  it("should keyboard click correctly", () => {
    const onClick = jest.fn();
    render(<ClickableCard data-testid="card" onClick={onClick} />);

    const card = screen.getByTestId("card");
    expect(onClick).not.toHaveBeenCalled();

    fireEvent.keyDown(card, { key: " " });
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(card, { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("should not fire the click event while disabled", () => {
    const onClick = jest.fn();
    render(<ClickableCard data-testid="card" onClick={onClick} disabled />);
    const card = screen.getByTestId("card");

    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(card, { key: " " });
    expect(onClick).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(card, { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
