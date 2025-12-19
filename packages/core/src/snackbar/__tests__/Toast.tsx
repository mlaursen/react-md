import { type ReactElement, createRef } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { FontIcon } from "../../icon/FontIcon.js";
import {
  type RenderResult,
  rmdRender as baseRender,
  screen,
  userEvent,
} from "../../test-utils/index.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";
import { Typography } from "../../typography/Typography.js";
import { Toast } from "../Toast.js";
import { CurrentToastActionsProvider } from "../useCurrentToastActions.js";

const render = (ui: ReactElement): RenderResult =>
  baseRender(ui, {
    wrapper: ({ children }) => (
      <CurrentToastActionsProvider
        value={{
          clearTimer: vi.fn(),
          pauseRemoveTimeout: vi.fn(),
          removeToast: vi.fn(),
          resumeRemoveTimeout: vi.fn(),
          startRemoveTimeout: vi.fn(),
        }}
      >
        {children}
      </CurrentToastActionsProvider>
    ),
  });

describe("Toast", () => {
  beforeEach(() => {
    TRANSITION_CONFIG.disabled = false;
  });

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

    expect(() => screen.getByRole("button")).toThrowError();

    rerender(<Toast {...props} action={<span>Action</span>} />);
    const action = screen.getByRole("button", { name: "Action" });
    expect(action).toBeInTheDocument();
    expect(action).toMatchSnapshot();

    const onClick = vi.fn();
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
    render(
      <Toast data-testid="toast" visible={false}>
        Hello
      </Toast>
    );

    expect(() => screen.getByTestId("toast")).toThrowError();
  });
});
