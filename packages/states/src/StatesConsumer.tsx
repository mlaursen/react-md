import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import memoizeOne from "memoize-one";

import { IStatesContext } from "./StatesContext";

export interface IStatesConsumerChildrenFunction {
  className: string;
  ref: (e: HTMLElement | null) => void;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface IStatesConsumerBaseProps {
  /**
   * Boolean if the element is disabled. This is mostly used so that elements that have been updated
   * to gain focus programmatically do not attach the `onBlur` event incorrectly.
   *
   * @docgen
   */
  disabled?: boolean;

  /**
   * An optional class name that should be merged with the current states class name.
   *
   * @docgen
   */
  className?: string;

  /**
   * An optional function to be called when the element is blurred. When the `disabled` prop is enabled,
   * the `children` callback function will return `undefined` for `onBlur` so that elements that have been
   * updated to gain focus programmatically do not attach the `onBlur` event incorrectly.
   *
   * @docgen
   */
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;

  /**
   * An optional function to be called when the element is clicked. When the `disabled` prop is enabled,
   * the `children` callback function will return `undefined` for `onClick` so that elements that have been
   * updated to gain focus programmatically do not attach the `onBlur` event incorrectly.
   *
   * @docgen
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;

  /**
   * A function to render any children with the merged class names and optional blur events. The child element
   * **must** apply the `ref` attribute to the child element as well as the provided class name and `onBlur` to
   * work correctly.
   *
   * @docgen
   */
  children?: ((props: IStatesConsumerChildrenFunction) => React.ReactNode);
}

export type IStatesConsumerProps = IStatesContext & IStatesConsumerBaseProps;

export default class StatesConsumer extends React.Component<IStatesConsumerProps, {}> {
  public static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    children: PropTypes.func.isRequired,
  };

  private el: HTMLElement | null;
  constructor(props: IStatesConsumerProps) {
    super(props);

    this.el = null;
  }

  public shouldComponentUpdate(nextProps: IStatesConsumerProps) {
    if (
      this.props.advancedFocus !== nextProps.advancedFocus ||
      this.props.disabled !== nextProps.disabled ||
      this.props.children !== nextProps.children ||
      this.props.className !== nextProps.className
    ) {
      return true;
    } else if (!this.el || !this.props.advancedFocus) {
      return false;
    }

    const isCurrentTarget = this.isFocusTarget(this.props);
    const isNextTarget = this.isFocusTarget(nextProps);
    return isCurrentTarget !== isNextTarget;
  }

  public render() {
    const { className: propClassName, children, advancedFocus, disabled, onBlur: propOnBlur, onClick: propOnClick } = this.props;

    const isFocused = advancedFocus && this.isFocusTarget(this.props);
    const className = cn(propClassName, {
      "rmd-states--simple": !advancedFocus,
      "rmd-states--focus": isFocused,
    });

    let onBlur = disabled ? undefined : propOnBlur;
    let onClick = disabled ? undefined : propOnClick;
    if (!disabled && isFocused) {
      onBlur = this.handleBlur;
      onClick = this.handleClick;
    }

    if (typeof children === "function") {
      return children({ className, ref: this.ref, onBlur, onClick });
    }

    return null;
  }

  private isFocusTarget = ({ focusTarget }: IStatesConsumerProps): boolean => {
    if (!this.el || !focusTarget) {
      return false;
    }

    return this.el === focusTarget;
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

  private handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }

    this.props.resetFocusTarget(e.currentTarget);
  };

  private handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.props.resetFocusTarget(e.currentTarget);
  };
}
