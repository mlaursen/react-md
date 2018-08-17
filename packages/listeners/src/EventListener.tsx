import * as React from "react";
import * as PropTypes from "prop-types";
import { throttleEvent, IThrottledEventHandler, ThrottleTarget } from "@react-md/utils";

export interface IEventListenerProps {
  /**
   * The event type to create.
   */
  type: "click" | "scroll";

  /**
   * The event target. This is `undefined` by default to have "easier" node support where `window`
   * and `document` are `undefined` and causes errors.
   *
   * The default behavior is that if this value is defined, it will be used. Otherwise if it is a
   * `click` event, the `window` will be used, otherwise the `document` will be used for scroll events.
   */
  target?: Window | Document | HTMLElement;

  /**
   * Boolean if the click event should be captured.
   */
  capture?: boolean;

  /**
   * An optional children callback function. This will be provided the last event or `null` if there
   * hasn't been an event yet. Either the `onTriggered` or `children` prop is required.
   */
  children?: (event: Event | null) => React.ReactNode;

  /**
   * An optional callback function that will include the event. Either the `onTriggered` or `children`
   * prop is required.
   */
  onTriggered?: (event: Event) => void;
}

export interface IEventListenerState {
  event: Event | null;
}

export interface IEventListenerChildrenDefined extends IEventListenerProps {
  children: (event: Event | null) => React.ReactNode;
}

export interface IEventListenerTriggeredDefined extends IEventListenerProps {
  onTriggered: (event: Event) => void;
}

export type EventListenerWithRequiredProps = IEventListenerChildrenDefined | IEventListenerTriggeredDefined;

/**
 * This is a simple component that uses the lifecyle methods within React to attach and remove
 * the event type that is provided. Once mounted, the **props should not change**. If you want
 * to change events, this component should be unmounted and a new component should be mounted
 * instead.
 */
export default class EventListener extends React.Component<EventListenerWithRequiredProps, IEventListenerState> {
  public static propTypes = {
    type: PropTypes.oneOf(["click", "scroll"]).isRequired,
    target: PropTypes.oneOfType([PropTypes.instanceOf(Element), PropTypes.instanceOf(Document)]),
    onTriggered: PropTypes.func,
    children: (props: IEventListenerProps, propName: "children", component: "EventListener", ...args: any[]) => {
      let error = PropTypes.func(props, propName, component, ...args);
      if (!error && typeof props[propName] === "undefined" && typeof props.onTriggered === "undefined") {
        error = new Error(
          `The \`${component}\` component requires either the \`onTriggered\` or \`children\` callback ` +
            "callback functions to be defined to work, but both were undefined."
        );
      }
    },
    capture: PropTypes.bool,
  };

  private scrollHandler: IThrottledEventHandler | null;
  constructor(props: EventListenerWithRequiredProps) {
    super(props);

    this.state = { event: null };
    this.scrollHandler = null;
  }

  public componentDidMount() {
    const target = this.getTarget();
    const { type } = this.props;
    if (type === "scroll") {
      this.scrollHandler = throttleEvent(type, target, this.props.capture);
      this.scrollHandler.add(this.handleEvent);
    } else {
      target.addEventListener(type, this.handleEvent, this.props.capture);
    }
  }

  public componentWillUnmount() {
    if (this.scrollHandler) {
      this.scrollHandler.remove(this.handleEvent);
    } else {
      this.getTarget().removeEventListener(this.props.type, this.handleEvent, this.props.capture);
    }
  }

  public render() {
    const { event } = this.state;
    const { children } = this.props;
    return children ? children(event) : null;
  }

  private getTarget = () => {
    if (this.props.target) {
      return this.props.target;
    }

    return this.props.type === "scroll" ? document : window;
  };

  private handleEvent = (event: Event) => {
    if (this.props.onTriggered) {
      this.props.onTriggered(event);
    } else {
      this.setState({ event });
    }
  };
}
