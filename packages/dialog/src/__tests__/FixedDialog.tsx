import type { ReactElement } from "react";
import { useRef } from "react";
import { render } from "@testing-library/react";
import { DATA_RMD_NOSCROLL } from "@react-md/utils";

import type { FixedDialogProps } from "../FixedDialog";
import { FixedDialog } from "../FixedDialog";

const noop = (): void => {};

function Test({
  id = "dialog",
  "aria-label": ariaLabel = "Label",
  onRequestClose = noop,
  visible = false,
  children,
  ...props
}: Partial<FixedDialogProps>): ReactElement {
  const fixedTo = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button type="button" ref={fixedTo}>
        Fixed To
      </button>
      <FixedDialog
        {...props}
        id={id}
        aria-label={ariaLabel}
        visible={visible}
        onRequestClose={onRequestClose}
        fixedTo={fixedTo}
      >
        {children}
      </FixedDialog>
    </>
  );
}

describe("FixedDialog", () => {
  it("should disable the overlay and scroll lock behavior by default", () => {
    const onRequestClose = jest.fn();
    const { baseElement } = render(
      <Test visible onRequestClose={onRequestClose} />
    );

    expect(baseElement).toMatchSnapshot();
    expect(document.body).not.toHaveAttribute(DATA_RMD_NOSCROLL);
    expect(onRequestClose).not.toBeCalled();
  });
});
