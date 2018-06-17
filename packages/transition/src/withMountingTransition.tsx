import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export declare type TransitionEvent = React.TransitionEvent<HTMLElement | React.ReactHTMLElement<any>>;

export interface IMountingTransitionProps {
  /**
   * An optional className to apply.
   */
  className?: string;

  /**
   * Boolean if the component should be visible. When this prop changes from `false` to `true`,
   * the enter transition will start. When this prop changes from `false` to `true`, the leave
   * transition will start.
   */
  visible: boolean;

  /**
   * An optional function to call when the enter or leave transition ends.
   */
  onTransitionEnd?: (e: TransitionEvent) => void;
}

export interface IMountingTransitionState {
  rendered: boolean;
  transitioning: boolean;
  transitioningActive: boolean;
}

export interface IInjectedMountingTransitionProps {
  /**
   * The full component's class name. This will be updated to include the transition names
   * during the transition and return back to the empty string or provided className prop
   * once the transition has finished.
   */
  className: string;

  /**
   * Boolean if the component is currently transitioning.
   */
  transitioning: boolean;

  /**
   * A function to call when the enter or leave transition has finished. You are required to
   * apply this function to the child component so that the transitions will finish. If this
   * is excluded, the component will never unmount fully.
   */
  onTransitionEnd: (e: TransitionEvent) => void;
}

/**
 * This is like another version of CSSTransitionGroup (v1) that renders null instead
 * of a span when empty and only works for one element at a time.
 *
 * When the visible prop is false, nothing will be rendered. When the visible prop is switched
 * to true, it will start the in transition by:
 * - rendering the component as normal (so no additional class names)
 * - providing the component with an enter transition class name
 * - providing the component with an enter and active transition class name
 * - rendering the component as normal once transition has finished (so no additional class names)
 *
 * Now when the visible prop is switched to false, it will start the leave transition with the same flow as
 * above but reversed. Once the transition is done, it will render nothing again.
 *
 * The class names generated will be:
 * - `${transitionName}--enter`
 * - `${transitionName}--enter-active`
 * - `${transitionName}--leave`
 * - `${transitionName}--leave-active`
 *
 * So to get the animation working correctly, your component being wrapped with this HOC **must** apply the
 * provided className prop and apply the onTransitionEnd prop that gets passed down.
 *
 * @param {String} transitionName - The transition name to use for the enter and leave transitions. Suffixes will be applied
 *    this this string for each stage of the transition.
 * @return {function} a higher order component creator function.
 */
export default function withMountingTransition<ComponentProps extends {}>(transitionName: string) {
  return function withMountingTransitionClassName(Component: React.ComponentType<ComponentProps & IInjectedMountingTransitionProps>) {
    type WithMountingTransitionProps = ComponentProps & IMountingTransitionProps;
    let displayName = 'WithMountingTransition';
    if (process.env.NODE_ENV !== "produciton") {
      displayName = `withMountingTransition(${Component.displayName})`;
    }

    return class WithMountingTransition extends React.Component<WithMountingTransitionProps, IMountingTransitionState> {
      public static displayName = displayName;
      public static propTypes = {
        className: PropTypes.string,
        visible: PropTypes.bool.isRequired,
        onTransitionEnd: PropTypes.func,
      };

      public static getDerivedStateFromProps(nextProps: ComponentProps & IMountingTransitionProps, prevState: IMountingTransitionState) {
        if (nextProps.visible && !prevState.rendered && !prevState.transitioning) {
          return { rendered: true, transitioning: true, transitioningActive: false };
        } else if (!nextProps.visible && prevState.rendered && !prevState.transitioning) {
          return { transitioning: true, transitioningActive: false };
        }

        return null;
      }

      public frame: number | null;

      constructor(props: ComponentProps & IMountingTransitionProps) {
        super(props);

        this.frame = null;
        this.state = {
          rendered: props.visible,
          transitioning: false,
          transitioningActive: false,
        };
      }

      public componentDidUpdate(prevProps: ComponentProps & IMountingTransitionProps, prevState: IMountingTransitionState) {
        if (this.state.transitioning && !prevState.transitioning) {
          this.frame = window.requestAnimationFrame(() => {
            this.frame = null;
            this.setState({ transitioningActive: true });
          });
        }
      }

      public componentWillUnmount() {
        this.clear();
      }

      public render() {
        const { rendered, transitioning, transitioningActive } = this.state;
        if (!rendered) {
          return null;
        }

        const { className, visible, ...props } = this.props as IMountingTransitionProps;
        return (
          <Component
            {...props}
            className={cn({
              [`${transitionName}--enter`]: visible && transitioning,
              [`${transitionName}--enter-active`]: visible && transitioning && transitioningActive,
              [`${transitionName}--leave`]: !visible && transitioning,
              [`${transitionName}--leave-active`]: !visible && transitioning && transitioningActive,
            }, className)}
            transitioning={transitioning}
            onTransitionEnd={this.handleTransitionEnd}
          />
        );
      }

      public clear = () => {
        if (this.frame) {
          window.cancelAnimationFrame(this.frame);
          this.frame = null;
        }
      }

      public handleTransitionEnd = (e: TransitionEvent) => {
        if (this.props.onTransitionEnd) {
          this.props.onTransitionEnd(e);
        }

        if (this.state.transitioning || this.state.transitioningActive) {
          this.setState({
            rendered: this.props.visible,
            transitioning: false,
            transitioningActive: false,
          });
        }
      }
    }
  }
}
