import * as React from "react";
import MenuItem from "./MenuItem";
import { Omit, IWithForwardedRef, Maybe } from "@react-md/utils";
import { IdRequired, RequireAtLeastOne } from "../types";

type MenuItemInputAttributes = Pick<
  React.HTMLAttributes<HTMLInputElement>,
  "onChange"
>;

export interface IMenuItemFileInputLabels {
  inputLabel?: string;
  inputLabelledBy?: string;
}

export interface IMenuItemFileInputProps
  extends IdRequired,
    IMenuItemFileInputLabels,
    IWithForwardedRef<HTMLLIElement>,
    Omit<
      React.HTMLAttributes<HTMLLIElement>,
      "id" | "role" | "onChange" | "defaultValue"
    >,
    MenuItemInputAttributes {
  disabled?: boolean;
  inputClassName?: string;
  capture?: "user" | "environemnt" | string;
  multiple?: boolean;
}

type MenuItemFileInputProps = IMenuItemFileInputProps &
  RequireAtLeastOne<IMenuItemFileInputLabels>;

export interface IMenuItemFileInputDefaultProps {
  disabled: boolean;
  multiple: boolean;
  onChange: Required<MenuItemInputAttributes>["onChange"];
}

export type MenuItemFileInputWithDefaultProps = MenuItemFileInputProps &
  IMenuItemFileInputDefaultProps;

const MenuItemFileInput: React.FunctionComponent<
  MenuItemFileInputProps
> = providedProps => {
  const {
    onChange,
    forwardedRef,
    onClick,
    inputLabel,
    inputLabelledBy,
    inputClassName,
    capture,
    multiple,
    children,
    ...props
  } = providedProps as MenuItemFileInputWithDefaultProps;

  function handleClick(event: React.MouseEvent<HTMLLIElement>) {
    if (onClick) {
      onClick(event);
    }

    const { currentTarget } = event;
    const target = event.target as Maybe<HTMLInputElement>;

    event.stopPropagation();
    if (target && target.type === "file") {
      return;
    }
    const input = currentTarget.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    input.click();
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    onChange(event);

    console.log("CHANGED");
    console.log("\n");
    const { currentTarget } = event;
    (currentTarget.closest('[role="menuitem"]') as HTMLLIElement).click();
  }

  const { id, disabled } = props;
  return (
    <MenuItem {...props} onClick={handleClick}>
      {children}
      <input
        id={`${id}-input`}
        type="file"
        disabled={disabled}
        onChange={handleChange}
        aria-label={inputLabel}
        aria-labelledby={inputLabelledBy}
        className={inputClassName}
        multiple={multiple}
        capture={capture}
        tabIndex={-1}
      />
    </MenuItem>
  );
};

const defaultProps: IMenuItemFileInputDefaultProps = {
  disabled: false,
  multiple: false,
  onChange: (event: React.FormEvent<HTMLInputElement>) => {},
};

MenuItemFileInput.defaultProps = defaultProps;

export default React.forwardRef<HTMLLIElement, MenuItemFileInputProps>(
  (props, ref) => <MenuItemFileInput {...props} forwardedRef={ref} />
);
