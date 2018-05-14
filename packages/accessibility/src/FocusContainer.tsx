import * as React from "react";
import * as PropTypes from "prop-types";
import { IBaseProps } from "@react-md/internal-types";

declare const process: any;

export interface IFocusContainerProps extends IBaseProps {
  /**
   * Boolean if the focus container is enabled. This will make it so that any tab key presses
   * are restricted to "focusable" elements within the focus container.
   */
  enabled?: boolean;

  /**
   * Boolean if the focus container should auto focus the `defaultFocusQuery` or the first
   * "focusable" element in the focus container.
   */
  immediateFocus?: boolean;

  /**
   * The html tag name to render the focus container as.
   */
  tagName?: string;

  /**
   * A query selector string to use to find all the focusable elements within the focus container.
   */
  focusQuery?: string;

  /**
   * An optional query selector string to use to find the first focusable element within the focus
   * container. When the `immediateFocus` prop is enabled, the result of this query will be focused
   * instead of the first focusable element in the focus container.
   */
  defaultFocusQuery?: string | null;
}

export interface IFocusContainerDefaultProps {
  tagName: string;
  enabled: boolean;
  immediateFocus: boolean;
  focusQuery: string;
  defaultFocusQuery: null;
}

export type FocusContainerWithDefaultProps = IFocusContainerProps & IFocusContainerDefaultProps;

const BASE_FOCUSABLE_ELEMENTS = "[href],[tabindex]:not([tabindex=-1])";
const FOCUSABLE_ELEMENTS_QUERY = ["button", "input", "textarea", "select"]
  .reduce((queryString, element) => `${queryString},${element}:not([disabled])`, BASE_FOCUSABLE_ELEMENTS);

export default class FocusContainer extends React.Component<FocusContainerWithDefaultProps, null> {
  public static FocusQuery = FOCUSABLE_ELEMENTS_QUERY;
  public static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    enabled: PropTypes.bool,
    immediateFocus: PropTypes.bool,
    focusQuery: PropTypes.string,
    defaultFocusQuery: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  public static defaultProps = {
    tagName: "div",
    enabled: true,
    immediateFocus: true,
    focusQuery: FocusContainer.FocusQuery,
    defaultFocusQuery: null,
  };

  /**
   * This is the container element of the `FocusContainer`. This is used to find all the
   * elements that can be focus targets.
   */
  private container: HTMLElement | null = null;

  /**
   * This is a list of focusable elements found within the `FocusContainer` children.
   */
  private focusables: HTMLElement[] = [];

  public componentDidMount() {
    if (this.props.enabled) {
      this.enableFocusTrap();
    }
  }

  public componentDidUpdate(prevProps: FocusContainerWithDefaultProps) {
    if (this.props.enabled === prevProps.enabled) {
      this.updateFocusables();
      return;
    }

    if (this.props.enabled) {
      this.enableFocusTrap();
    } else {
      this.disableFocusTrap();
    }
  }

  public componentWillUnmount() {
    this.disableFocusTrap();
  }

  public render() {
    const {
      tagName,
      children,
      enabled,
      immediateFocus,
      focusQuery,
      defaultFocusQuery,
      ...props
    } = this.props;

    return React.createElement(tagName, {
      ...props,
      ref: this.setRef,
    }, children);
  }

  private setRef = (container: HTMLElement | null) => {
    this.container = container;
  }

  private enableFocusTrap = () => {
    window.addEventListener("keydown", this.handleKeyDown, true);

    if (this.props.immediateFocus) {
      this.updateFocusables();
      this.attemptDefaultFocus();
    }
  }

  private disableFocusTrap = () => {
    window.removeEventListener("keydown", this.handleKeyDown, true);
  }

  private updateFocusables = () => {
    if (!this.container) {
      this.focusables = [];
      return;
    }

    this.focusables = [].slice.call(this.container.querySelectorAll(this.props.focusQuery));
  }

  private attemptDefaultFocus = () => {
    if (!this.container) {
      return;
    }

    if (!this.focusables.length) {
      this.updateFocusables();
    }

    const { defaultFocusQuery } = this.props;
    let el: HTMLElement | null = null;
    if (defaultFocusQuery) {
      el = this.container.querySelector(defaultFocusQuery);
    } else {
      [el] = this.focusables;
    }

    if (process.env.NODE_ENV !== "production" && !el) {
      throw new Error((
        "You specified that the `FocusContainer` component should focus an element on mount but a focusable " +
        "element was not found as one of the children in this container. This happened because the " +
        "`defaultFocusQuery` is not a correctly formatted query selector string, the query selector could not " +
        "find the element, or there are no focusable elements in the children."
      ));
    }

    if (el) {
      el.focus();
    }
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const { key } = e;
    if (key !== "TabKey" || !this.container) {
      return;
    }
    if (!this.container.contains(document.activeElement)) {
      e.preventDefault();
      e.stopPropagation();
      this.attemptDefaultFocus();
      return;
    }

    const [firstFocusableEl] = this.focusables;
    const lastFocusableEl = this.focusables[this.focusables.length - 1];
    if (this.focusables.length === 1) {
      // When there is only 1 focusable element in the FocusContainer, just make sure that
      // other elements can not be focused with the tab key
      e.preventDefault();
      e.stopPropagation();

      if (firstFocusableEl && document.activeElement !== firstFocusableEl) {
        firstFocusableEl.focus();
      }

      return;
    }

    // Allow normal browser tab behavior until the user presses shift+tab on the first
    // focusable element or just tab on the last focusable element. In these 2 cases, update
    // the tab behavior to loop around instead of going out of the FocusContainer.
    const { target, shiftKey } = e;
    const [first] = this.focusables;
    const last = this.focusables[this.focusables.length - 1];
    if (shiftKey && target === first) {
      e.preventDefault();
      e.stopPropagation();
      last.focus();
    } else if (!shiftKey && target === last) {
      e.preventDefault();
      e.stopPropagation();
      first.focus();
    }
  }
}
