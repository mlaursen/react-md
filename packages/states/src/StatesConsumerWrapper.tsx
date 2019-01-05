import * as React from "react";

import { Consumer } from "./StatesContext";
import { default as StatesConsumer, IStatesConsumerBaseProps } from "./StatesConsumer";

/**
 * @props IStatesConsumerBaseProps
 */
const StatesConsumerWrapper: React.FunctionComponent<IStatesConsumerBaseProps> = props => (
  <Consumer>{context => <StatesConsumer {...context} {...props} />}</Consumer>
);

StatesConsumerWrapper.displayName = "StatesConsumer";

export default StatesConsumerWrapper;
