import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

import {
  default as BaseTooltip,
  ITooltipProps,
  IBaseTooltipDefaultProps,
} from "./BaseTooltip";

export type TooltipWithDefaultProps = ITooltipProps & IBaseTooltipDefaultProps;

export interface ITooltipState {
  visible: boolean;
}

export default class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
  public static propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    position: PropTypes.oneOf(["top", "right", "bottom", "left"]),
    delay: PropTypes.number,
    dense: PropTypes.bool,
    lineWrap: PropTypes.bool,
  };

  public static defaultProps: IBaseTooltipDefaultProps = {
    dense: false,
    delay: 0,
    lineWrap: false,
    position: "bottom",
  };

  constructor(props: TooltipWithDefaultProps) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  public render() {
    const { visible } = this.state;

    return <BaseTooltip {...this.props} visible={visible} onShow={this.show} onHide={this.hide} />;
  }

  private show = () => {
    if (!this.state.visible) {
      this.setState({ visible: true });
    }
  }

  private hide = () => {
    if (this.state.visible) {
      this.setState({ visible: false });
    }
  }
}
