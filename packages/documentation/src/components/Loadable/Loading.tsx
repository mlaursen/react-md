import * as React from "react";
import * as Loadable from "react-loadable";
import { connect } from "react-redux";
import { Text } from "@react-md/typography";

import { FORCE_SMOOTH_SCROLL } from "state/actionTypes";

export interface ILoadingProps extends Loadable.LoadingComponentProps {
  forceSmoothScroll: () => void;
}

class Loading extends React.Component<ILoadingProps> {
  public componentWillUnmount() {
    this.props.forceSmoothScroll();
  }

  public render() {
    const { pastDelay } = this.props;
    if (pastDelay) {
      return <Text type="headline-1">Loading...</Text>;
    }

    return null;
  }
}

const forceSmoothScroll = () => ({ type: FORCE_SMOOTH_SCROLL });

export default connect(
  null,
  { forceSmoothScroll }
)(Loading);
