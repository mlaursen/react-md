import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import memoizeOne from "memoize-one";

import { IStatesContext } from "./StatesContext";

const LEFT_MOUSE = 0;
const PROP_DIFF_KEYS: Array<keyof IStatesConsumerProps> = [
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

export interface IStatesConsumerChildrenFunction {
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
   * A ref that should be applied to an HTMLElement. This **needs** to be applied to get
   * correct focus states applied.
   */
  ref: (e: HTMLElement | null) => void;

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
   * This is required to be applied to the child element if you want correct press states.
   */
  onMouseUp?: StatesConsumerMouseListener;

  /**
   * A `mousedown` event handler that is used for handling presses with the mouse. This will only be provided
   * if the `pressable` prop was enabled or the `StatesConsumer` component was provided an `onMouseDown` prop.
   * This is required to be applied to the child element if you want correct press states.
   */
  onMouseDown?: StatesConsumerMouseListener;

  /**
   * A `touchstart` event handler that is used for handling presses with the mouse. This will only be provided
   * if the `pressable` prop was enabled or if the `StatesConsumer` component was provided an `onTouchStart` prop.
   * This is required to be applied to the child element if you want correct press states.
   */
  onTouchStart?: StatesConsumerTouchListener;

  /**
   * A `touchend` event handler that is used for handling presses with the mouse. This will only be provided
   * if the `pressable` prop was enabled or if the `StatesConsumer` component was provided an `onTouchEnd` prop.
   * This is required to be applied to the child element if you want
   * correct press states.
   */
  onTouchEnd?: StatesConsumerTouchListener;
  onKeyDown?: StatesConsumerKeyboardListener;
  onKeyUp?: StatesConsumerKeyboardListener;
}

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
   *
   * @docgen
   */
  className?: string;

  /**
   * Boolean if the element is disabled. This is mostly used so that elements that have been updated
   * to gain focus programmatically do not attach the `onBlur` event incorrectly.
   *
   * @docgen
   */
  disabled?: boolean;

  /**
   * Boolean if the child element should also gain the press states.
   *
   * @docgen
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
   * A function to render any children with the merged class names and optional blur events. The child element
   * **must** apply the `ref` attribute to the child element as well as the provided class name and `onBlur` to
   * work correctly.
   *
   * @docgen
   */
  children: ((props: IStatesConsumerChildrenFunction) => React.ReactNode);
}

export interface IStatesConsumerDefaultProps {
  pressable: boolean;
}

export type IStatesConsumerProps = IStatesContext & IStatesConsumerBaseProps;

export interface IStatesConsumerState {
  pressed: boolean;
}

export type StatesConsumerWithDefaultProps = IStatesConsumerProps & IStatesConsumerDefaultProps;

export default class StatesConsumer extends React.Component<IStatesConsumerProps, IStatesConsumerState> {
  public static propTypes = {
    className: PropTypes.string,
    focusedClassName: PropTypes.string,
    pressedClassName: PropTypes.string,
    pressable: PropTypes.bool,
    disabled: PropTypes.bool,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
    children: PropTypes.func.isRequired,
  };

  public static defaultProps: IStatesConsumerDefaultProps = {
    pressable: true,
  };

  private el: HTMLElement | null;
  constructor(props: IStatesConsumerProps) {
    super(props);

    this.state = { pressed: false };
    this.el = null;
  }

  public shouldComponentUpdate(nextProps: IStatesConsumerProps, nextState: IStatesConsumerState) {
    if (PROP_DIFF_KEYS.some(key => this.props[key] !== nextProps[key]) || this.state.pressed !== nextState.pressed) {
      return true;
    } else if (!this.el || !this.props.advancedFocus) {
      return false;
    }

    const isCurrentTarget = this.isFocusTarget(this.props);
    const isNextTarget = this.isFocusTarget(nextProps);
    return isCurrentTarget !== isNextTarget;
  }

  public render() {
    const { pressed } = this.state;
    const {
      className: propClassName,
      focusedClassName,
      pressedClassName,
      children,
      advancedFocus,
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
      [`${focusedClassName}`]: !!focusedClassName && isFocused,
      [`${pressedClassName}`]: !!pressedClassName && !disabled && pressed,
    });

    return children({
      disabled,
      className,
      ref: this.ref,
      onKeyDown: pressable && isFocused ? this.handleKeyDown : onKeyDown,
      onKeyUp: !disabled && pressable && pressed ? this.handleKeyUp : onKeyUp,
      onMouseDown: pressable || isFocused ? this.handleMouseDown : onMouseDown,
      onMouseUp: pressable && pressed ? this.handleMouseUp : onMouseUp,
      onTouchStart: pressable ? this.handleTouchStart : onTouchStart,
      onTouchEnd: pressable && pressed ? this.handleTouchEnd : onTouchEnd,
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

  private ref = (el: HTMLElement | null) => {
    if (el) {
      this.props.initFocusTarget(el);
      this.el = el;
    } else if (this.el) {
      this.props.deinitFocusTarget(this.el);
      this.el = null;
    }
  };

  private handleKeyDown = (event: StatesConsumerKeyboardEvent) => {
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

    if (this.props.pressable && event.button === LEFT_MOUSE) {
      this.press();
    }
  };

  private handleMouseUp = (event: StatesConsumerMouseEvent) => {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }

    this.unpress();
  };

  private handleTouchStart = (event: StatesConsumerTouchEvent) => {
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
