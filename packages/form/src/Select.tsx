import {
  Portal,
  PropsWithRef,
  useEnsuredId,
  useEnsuredRef,
  useFixedPositioning,
  useScaleTransition,
  useToggle,
} from "@react-md/core";
import type { ListElement } from "@react-md/list";
import { List } from "@react-md/list";
import { Overlay } from "@react-md/overlay";
import type { ReactElement, ReactNode, Ref } from "react";
import { HTMLAttributes, useRef } from "react";
import { FormMessageContainer } from "./FormMessageContainer";
import { useFormTheme } from "./FormThemeProvider";
import { Label } from "./Label";
import type { TextFieldProps } from "./TextField";
import { TextField, textField } from "./TextField";
import { TextFieldContainer } from "./TextFieldContainer";
import { FormFieldOptions } from "./types";

export interface SelectProps extends TextFieldProps {
  inputRef?: Ref<HTMLInputElement>;
  children: ReactNode;
}

export function Select(props: SelectProps): ReactElement {
  const { children, inputRef, ...remaining } = props;
  const [nodeRef, ref] = useEnsuredRef(inputRef);
  const { toggled: visible, enable: show, disable: hide } = useToggle();
  const listboxRef = useRef<ListElement>(null);
  const cancel = useRef(false);
  const { style, transitionOptions } = useFixedPositioning({
    nodeRef: listboxRef,
    fixedTo: nodeRef,
    transformOrigin: true,
    width: "equal",
    onScroll(_event, data) {
      if (!data.visible) {
        cancel.current = true;
        hide();
      }
    },
  });
  const { elementProps, rendered } = useScaleTransition({
    ...transitionOptions,
    transitionIn: visible,
    className: "rmd-listbox rmd-listbox--temporary",
    onEntering() {
      listboxRef.current?.focus();
    },
    onExiting() {
      if (!cancel.current) {
        nodeRef.current?.focus();
      }
    },
    onExited() {
      cancel.current = false;
    },
  });

  return (
    <>
      <Overlay visible={visible} noOpacity onClick={hide} />
      <TextField
        {...remaining}
        active={visible}
        aria-hidden
        aria-haspopup="listbox"
        ref={ref}
        readOnly
        onClick={show}
        onKeyDown={(event) => {
          switch (event.key) {
            case " ":
              event.preventDefault();
              event.stopPropagation();
              show();
              break;
            case "Enter":
              event.stopPropagation();
              break;
          }
        }}
        onFocus={(event) => {
          const input = event.currentTarget;
          input.setSelectionRange(null, null);
        }}
      />
      <Portal>
        {rendered && (
          <List
            role="listbox"
            tabIndex={0}
            {...elementProps}
            style={style}
            onClick={hide}
            onKeyDown={(event) => {
              switch (event.key) {
                case "Escape":
                  event.preventDefault();
                  event.stopPropagation();
                  hide();
                  break;
              }
            }}
          >
            {children}
          </List>
        )}
      </Portal>
    </>
  );
}
