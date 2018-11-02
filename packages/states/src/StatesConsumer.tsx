import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";
import cn from "classnames";
import memoizeOne from "memoize-one";

import { isFocusable } from "@react-md/utils";

import { IStatesContext } from "./StatesContext";

const LEFT_MOUSE = 0;
const PROP_DIFF_KEYS: Array<keyof IStatesConsumerProps> = [
  "children",
  "className",
  "focusedClassName",
  "pressedClassName",
  "advancedFocus",
  "pressable",
  "disabled",
  "onMouseUp",
  "onMouseDown",
  "onTouchStart",
  "onTouchEnd",
  "onKeyDown",
  "onKeyUp",
];

export type StatesConsumerKeyboardEvent = React.KeyboardEvent<any>;
export type StatesConsumerKeyboardListener = (event: StatesConsumerKeyboardEvent) => void;
export type StatesConsumerMouseEvent = React.MouseEvent<any>;
export type StatesConsumerMouseListener = (event: StatesConsumerMouseEvent) => void;
export type StatesConsumerFocusEvent = React.FocusEvent<any>;
export type StatesConsumerFocusListener = (event: StatesConsumerFocusEvent) => void;
export type StatesConsumerTouchEvent = React.TouchEvent<any>;
export type StatesConsumerTouchListener = (event: StatesConsumerTouchEvent) => void;

export interface IStatesConsumerChildProps {
  /**
   * Boolean if the children are currently disabled. This is really just a pass-down-value of the
   * `disabled` prop that was provided to the `StatesConsumer`.
   */
  disabled?: boolean;

  /**
   * The current className that includes the current states and the `className` that was
   * provided to the `StatesConsumer`.
   */
  className: string;

  /**
   * An optional `blur` event handler that will only be provided if the `advancedFocus` prop
   * is enabled and the child element currently has keyboard focus OR the `onBlur` prop was
   * provided to the `StatesConsumer`. If the `advancedFocus` prop was enabled, the built-in
   * blur handler will also call the `onBlur` prop if it was provided.
   */
  onBlur?: StatesConsumerFocusListener;

  /**
   * A `mouseup` event handler that is used for handling presses with the mouse. This will only be provided
   * if the `pressable` prop was enabled or if the `StatesConsumer` component was provided an `onMouseUp` prop.
   * This is required to be applied to the child element if you want correct press states to be applied.
   */
  onMouseUp?: StatesConsumerMouseListener;

  /**
   * A `mousedown` event handler that is used for handling presses with the mouse. This will only be provided
   * if the `pressable` prop was enabled or the `StatesConsumer` component was provided an `onMouseDown` prop.
   * This is required to be applied to the child element if you want correct press states to be applied.
   */
  onMouseDown?: StatesConsumerMouseListener;

  /**
   * A `touchstart` event handler that is used for handling presses with the mouse. This will only be provided
   * if the `pressable` prop was enabled or if the `StatesConsumer` component was provided an `onTouchStart` prop.
   * This is required to be applied to the child element if you want correct press states to be applied.
   */
  onTouchStart?: StatesConsumerTouchListener;

  /**
   * A `touchend` event handler that is used for handling presses with the mouse. This will only be provided
   * if the `pressable` prop was enabled or if the `StatesConsumer` component was provided an `onTouchEnd` prop.
   * This is required to be applied to the child element if you want correct press states to be applied.
   */
  onTouchEnd?: StatesConsumerTouchListener;

  /**
   * A `keydown` event handler that is used for handling presses with the keyboard. This will only be provided
   * if the `pressable` prop was enabled or if the `StatesConsumer` component was provided with an `onKeyDown`
   * prop. This is required to be applied to the child element if you want the correct press states to be applied.
   */
  onKeyDown?: StatesConsumerKeyboardListener;

  /**
   * A `keyup` event handler that is used for handling presses with the keyboard. This will only be provided
   * if the `pressable` prop was enabled or if the `StatesConsumer` component was provided with an `onKeyUp`
   * prop. This is required to be applied to the child element if you want the correct press states to be applied.
   */
  onKeyUp?: StatesConsumerKeyboardListener;
}

/**
 * These are really just pass-down-value of events that have their functionality merged with the StatesConsumer
 * functionality.
 */
export interface IStatesConsumerEvents {
  onMouseDown?: StatesConsumerMouseListener;
  onMouseUp?: StatesConsumerMouseListener;
  onTouchStart?: StatesConsumerTouchListener;
  onTouchEnd?: StatesConsumerTouchListener;
  onKeyDown?: StatesConsumerKeyboardListener;
  onKeyUp?: StatesConsumerKeyboardListener;
}

export interface IStatesConsumerBaseProps extends IStatesConsumerEvents {
  /**
   * An optional class name that should be merged with the current states class name.
   */
  className?: string;

  /**
   * Boolean if the element is disabled. This is mostly used so that elements that have been updated
   * to gain focus programmatically do not attach the `onBlur` event incorrectly.
   */
  disabled?: boolean;

  /**
   * Boolean if the child element should also gain the press states.
   */
  pressable?: boolean;

  /**
   * An optional className to apply when the child element is focused.
   */
  focusedClassName?: string;

  /**
   * An optional className to apply when the child element is pressed.
   */
  pressedClassName?: string;

  /**
   * Boolean if the child item is currently selected.
   */
  selected?: boolean;

  /**
   * A function to render any children with the merged class names and optional blur events. The child element
   * **must** apply the `ref` attribute to the child element as well as the provided class name and `onBlur` to
   * work correctly.
   */
  children: ((props: IStatesConsumerChildProps) => React.ReactNode) | React.ReactElement<any>;
}

export interface IStatesConsumerDefaultProps {
  pressable: boolean;
  disabled: boolean;
  selected: boolean;
}

export type IStatesConsumerProps = IStatesContext & IStatesConsumerBaseProps;

export interface IStatesConsumerState {
  pressed: boolean;
}

export type StatesConsumerWithDefaultProps = IStatesConsumerProps & IStatesConsumerDefaultProps;

/**
 * The `StatesConsumer` component is used for applying the dynamic pressed states and hover effects for
 * an html element that is clickable or hoverable. This should probably just mostly be used internally
 * within react-md, but there might be cases where it is helpful to plug into the states provider manually.
 */
export default class StatesConsumer extends React.Component<
  IStatesConsumerProps,
  IStatesConsumerState
> {
  public static propTypes = {
    className: PropTypes.string,
    focusedClassName: PropTypes.string,
    pressedClassName: PropTypes.string,
    pressable: PropTypes.bool,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  };

  public static defaultProps: IStatesConsumerDefaultProps = {
    pressable: true,
    selected: false,
    disabled: false,
  };

  private el: HTMLElement | null;
  private touched: boolean;
  constructor(props: IStatesConsumerProps) {
    super(props);

    this.touched = false;
    this.state = { pressed: false };
    this.el = null;
  }

  public componentDidMount() {
    if (!this.props.pressable) {
      return;
    }

    this.el = ReactDOM.findDOMNode(this) as HTMLElement;
    const original = this.el;
    if (!isFocusable(this.el, true)) {
      while (this.el && !isFocusable(this.el, true)) {
        this.el = this.el.parentElement;
      }
    }

    if (!this.el) {
      if (process.env.NODE_ENV === "development") {
        const { props } = this;
        // tslint:disable-next-line
        class StatesConsumerError extends Error {
          private consumerProps: IStatesConsumerProps;
          constructor(...args: any[]) {
            super(...args);

            this.consumerProps = props;
          }
        }

        throw new StatesConsumerError(
          "The `StatesConsumer` component was mounted without finding a valid HTMLElement as its child. " +
            "This should be fixed before deploying to production. The current props are available on the " +
            "error instance as `error.consumerProps`."
        );
      }

      return;
    }
    this.props.initFocusTarget(this.el);
  }

  public shouldComponentUpdate(nextProps: IStatesConsumerProps, nextState: IStatesConsumerState) {
    if (
      PROP_DIFF_KEYS.some(key => this.props[key] !== nextProps[key]) ||
      this.state.pressed !== nextState.pressed
    ) {
      return true;
    } else if (!this.el || !this.props.advancedFocus) {
      return false;
    }

    const isCurrentTarget = this.isFocusTarget(this.props);
    const isNextTarget = this.isFocusTarget(nextProps);
    return isCurrentTarget !== isNextTarget;
  }

  public componentWillUnmount() {
    if (this.el) {
      this.props.deinitFocusTarget(this.el);
      this.el = null;
    }
  }

  public render() {
    const { pressed } = this.state;
    const {
      className: propClassName,
      focusedClassName,
      pressedClassName,
      children,
      advancedFocus,
      selected,
      disabled,
      pressable,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      onKeyUp,
      onKeyDown,
    } = this.props as StatesConsumerWithDefaultProps;

    const isFocused = advancedFocus && this.isFocusTarget(this.props);
    const className = cn(propClassName, {
      "rmd-states--simple": !advancedFocus,
      "rmd-states--focus": isFocused,
      "rmd-states--pressed": !disabled && pressed,
      "rmd-states--selected": !disabled && selected,
      [`${focusedClassName}`]: !!focusedClassName && isFocused,
      [`${pressedClassName}`]: !!pressedClassName && !disabled && pressed,
    });

    const props = {
      disabled,
      className,
      onKeyDown: pressable && isFocused ? this.handleKeyDown : onKeyDown,
      onKeyUp: !disabled && pressable && pressed ? this.handleKeyUp : onKeyUp,
      onMouseDown: pressable || isFocused ? this.handleMouseDown : onMouseDown,
      onMouseUp: pressable && pressed ? this.handleMouseUp : onMouseUp,
      onTouchStart: pressable ? this.handleTouchStart : onTouchStart,
      onTouchEnd: pressable && pressed ? this.handleTouchEnd : onTouchEnd,
    } as IStatesConsumerChildProps;
    if (typeof children === "function") {
      return children(props);
    }

    const child = React.Children.only(children);
    return React.cloneElement(child, {
      ...props,
      className: cn(className, child.props.className),
    });
  }

  private isFocusTarget = ({ focusTarget }: IStatesConsumerProps): boolean => {
    if (!this.el || !focusTarget) {
      return false;
    }

    return this.el === focusTarget;
  };

  private press = () => {
    if (!this.state.pressed) {
      this.setState({ pressed: true });
    }
  };

  private unpress = () => {
    if (this.state.pressed) {
      this.setState({ pressed: false });
    }
  };

  private handleKeyDown = (event: StatesConsumerKeyboardEvent) => {
    this.touched = false;
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }

    if (event.key === " " || event.key === "Enter") {
      this.press();
    }
  };

  private handleKeyUp = (event: StatesConsumerKeyboardEvent) => {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }

    this.unpress();
  };

  private handleMouseDown = (event: StatesConsumerMouseEvent) => {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }

    if (!this.touched && this.props.pressable && event.button === LEFT_MOUSE) {
      this.press();
    }
    this.touched = false;
  };

  private handleMouseUp = (event: StatesConsumerMouseEvent) => {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }

    this.unpress();
  };

  private handleTouchStart = (event: StatesConsumerTouchEvent) => {
    this.touched = true;
    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }

    this.press();
  };

  private handleTouchEnd = (event: StatesConsumerTouchEvent) => {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }

    this.unpress();
  };
}
