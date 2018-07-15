import * as React from "react";

import { Consumer } from "./StatesContext";
import { default as StatesConsumer, IStatesConsumerBaseProps } from "./StatesConsumer";

const StatesConsumerWrapper: React.SFC<IStatesConsumerBaseProps> = props => (
  <Consumer>
    {context => <StatesConsumer {...context} {...props} />}
  </Consumer>
);

StatesConsumerWrapper.displayName = "StatesConsumer";

export default StatesConsumerWrapper;
