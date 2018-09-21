import * as React from "react";
import * as PropTypes from "prop-types";
import { Portal, PortalInto } from "@react-md/portal";

import { default as Overlay, IOverlayProps } from "./Overlay";

export interface IOverlayPortalProps extends IOverlayProps {
  /**
   * Either a function that returns an HTMLElement, an HTMLElement, or a `document.querySelector` string
   * that will return the HTMLElement to render the children into. If both the `into` and `intoId` props
   * are `undefined`, the `document.body` will be chosen instead.
   *
   * @docgen
   */
  portalInto?: PortalInto;

  /**
   * The id of an element that the portal should be rendered into. This element **must** exist on the page
   * before the `visible` prop is enabled to work. If both the `into` and `intoId` props are `undefined`,
   * the `document.body` will be chosen instead.
   *
   * @docgen
   */
  portalIntoId?: string;
}

export interface IOverlayPortalState {
  portalVisible: boolean;
  overlayVisible: boolean;
}

/**
 * The `OverlayPortal` is a wrapper of the `Overlay` component to portal the overlay somehwere else within
 * your app.
 */
export default class OverlayPortal extends React.Component<
  IOverlayPortalProps,
  IOverlayPortalState
> {
  public static propTypes = {
    portalInto: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
    portalIntoId: PropTypes.string,
  };

  public static getDerivedStateFromProps(
    nextProps: IOverlayPortalProps,
    prevState: IOverlayPortalState
  ) {
    if (nextProps.visible && !prevState.portalVisible) {
      return {
        portalVisible: true,
        overlayVisible: false,
      };
    } else if (!nextProps.visible && prevState.overlayVisible) {
      return {
        portalVisible: true,
        overlayVisible: false,
      };
    }

    return null;
  }

  private frame?: number;
  constructor(props: IOverlayPortalProps) {
    super(props);

    this.state = {
      portalVisible: props.visible,
      overlayVisible: props.visible,
    };
  }

  public componentDidUpdate(prevProps: IOverlayPortalProps, prevState: IOverlayPortalState) {
    if (this.state.portalVisible && !prevState.portalVisible) {
      this.frame = window.requestAnimationFrame(() => {
        this.frame = undefined;
        this.setState({ overlayVisible: true });
      });
    }
  }

  public componentWillUnmount() {
    this.clear();
  }

  public render() {
    const { portalVisible, overlayVisible } = this.state;
    const { visible, portalInto, portalIntoId, ...props } = this.props;
    return (
      <Portal visible={portalVisible} into={portalInto} intoId={portalIntoId}>
        <Overlay visible={overlayVisible} {...props} onExited={this.hidePortal} />
      </Portal>
    );
  }

  private clear = () => {
    if (this.frame) {
      window.cancelAnimationFrame(this.frame);
      this.frame = undefined;
    }
  };

  private hidePortal = (node: HTMLElement) => {
    if (this.props.onExited) {
      this.props.onExited(node);
    }

    if (this.state.portalVisible) {
      this.setState({ portalVisible: false });
    }
  };
}
