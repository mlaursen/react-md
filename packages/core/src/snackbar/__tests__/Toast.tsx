import type { ReactElement } from "react";
import { createRef } from "react";
import type { RenderResult } from "../../test-utils";
import { rmdRender as baseRender, screen, userEvent } from "../../test-utils";

import { FontIcon } from "../../icon";
import { Typography } from "../../typography";
import { Toast } from "../Toast";
import { CurrentToastActionsProvider } from "../useCurrentToastActions";

const render = (ui: ReactElement): RenderResult =>
  baseRender(ui, {
    wrapper: ({ children }) => (
      <CurrentToastActionsProvider
        value={{
          clearTimer: jest.fn(),
          pauseRemoveTimeout: jest.fn(),
          removeToast: jest.fn(),
          resumeRemoveTimeout: jest.fn(),
          startRemoveTimeout: jest.fn(),
        }}
      >
        {children}
      </CurrentToastActionsProvider>
    ),
  });

describe("Toast", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "toast",
      ref,
      visible: true,
    } as const;
    const { rerender } = render(<Toast {...props} />);
    const toast = screen.getByTestId("toast");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(toast);
    expect(toast).toMatchSnapshot();

    rerender(
      <Toast
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(toast).toMatchSnapshot();
  });

  it("should render any valid element within the ToastActionButton", async () => {
    const user = userEvent.setup();
    const props = {
      children: <Typography>Hello, world!</Typography>,
      visible: true,
    } as const;
    const { rerender } = render(<Toast {...props} />);

    expect(() => screen.getByRole("button")).toThrow();

    rerender(<Toast {...props} action={<span>Action</span>} />);
    const action = screen.getByRole("button", { name: "Action" });
    expect(action).toBeInTheDocument();
    expect(action).toMatchSnapshot();

    const onClick = jest.fn();
    rerender(
      <Toast
        {...props}
        action={{
          onClick,
          children: <FontIcon>favorite</FontIcon>,
          buttonType: "icon",
          "aria-label": "New Action",
        }}
      />
    );

    const newAction = screen.getByRole("button", { name: "New Action" });
    expect(newAction).toMatchSnapshot();

    await user.click(newAction);
    expect(onClick).toHaveBeenCalled();
  });

  it("should not be in the dom while not visible", () => {
    const { getByTestId } = render(
      <Toast data-testid="toast" visible={false}>
        Hello
      </Toast>
    );

    expect(() => getByTestId("toast")).toThrow();
  });
});
