import React, { Component, forwardRef, Fragment } from "react";
import { Button } from "@react-md/button";
import { Divider } from "@react-md/divider";
import { Collapse } from "@react-md/transition";
import { Text, TextElement, TextProps } from "@react-md/typography";

import Code from "components/Code/Code";

/**
 * Need to forward the ref on since function components can't have refs
 */
const Lorem = forwardRef<TextElement, TextProps>((props, ref) => (
  <Text {...props} ref={ref}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a augue
    venenatis, vulputate elit in, imperdiet metus. Sed egestas, ex vitae
    sagittis rhoncus, lorem velit ornare neque, vitae imperdiet ligula magna
    quis leo. Cras non auctor mauris. Duis consectetur rhoncus mi, sed cursus
    lacus vestibulum ut. Ut in ligula magna. Sed auctor odio vitae leo euismod,
    ut feugiat tortor cursus. Morbi quis dui faucibus, vestibulum lorem nec,
    vulputate lacus. Quisque quis imperdiet nisl. Nullam ornare pharetra tempor.
  </Text>
));

class Broken extends Component<any> {
  public render() {
    return <Lorem ref={this.props.forwardedRef} />;
  }
}

const SomewhatBroken = forwardRef<any, any>((props, ref) => (
  <Broken {...props} forwardedRef={ref} />
));

interface State {
  collapsed1: boolean;
  collapsed2: boolean;
  collapsed3: boolean;
  collapsed4: boolean;
  error: boolean;
}

export default class CollapseExamples extends Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      collapsed1: true,
      collapsed2: true,
      collapsed3: true,
      collapsed4: true,
      error: false,
    };
  }

  public componentDidCatch() {
    this.setState({ error: true });
  }

  public render() {
    const {
      collapsed1,
      collapsed2,
      collapsed3,
      collapsed4,
      error,
    } = this.state;

    return (
      <Fragment>
        <Button id="collapse-toggle-1" onClick={this.toggle1}>
          Toggle
        </Button>
        <Collapse collapsed={collapsed1}>
          <Lorem />
        </Collapse>
        <Divider />
        <Button id="collapse-toggle-2" onClick={this.toggle2}>
          Toggle
        </Button>
        <Collapse collapsed={collapsed2}>
          {transitionProps => <Lorem {...transitionProps} />}
        </Collapse>
        <Divider />
        <Button
          id="collapse-toggle-3"
          onClick={error ? this.fix : this.toggle3}
          theme={error ? "error" : "clear"}
        >
          {error ? "Fix" : "Toggle"}
        </Button>
        <Text>
          This example will crash since the <Code>ref</Code> isn't passed on.
        </Text>
        {error ? (
          "Broken :("
        ) : (
          <Collapse collapsed={collapsed3}>
            <Broken />
          </Collapse>
        )}
        <Divider />
        <Button id="collapse-toggle-4" onClick={this.toggle4}>
          Toggle
        </Button>
        <Text>
          This example will not animate since the <Code>style</Code> and{" "}
          <Code>className</Code> props aren't passed on.
        </Text>
        <Collapse collapsed={collapsed4}>
          <SomewhatBroken />
        </Collapse>
      </Fragment>
    );
  }

  private toggle1 = () => {
    this.setState(({ collapsed1 }) => ({ collapsed1: !collapsed1 }));
  };

  private toggle2 = () => {
    this.setState(({ collapsed2 }) => ({ collapsed2: !collapsed2 }));
  };

  private toggle3 = () => {
    this.setState(({ collapsed3 }) => ({ collapsed3: !collapsed3 }));
  };

  private fix = () => {
    this.setState({ collapsed3: true, error: false });
  };

  private toggle4 = () => {
    this.setState(({ collapsed4 }) => ({ collapsed4: !collapsed4 }));
  };
}
