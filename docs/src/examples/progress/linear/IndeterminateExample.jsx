import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { LinearProgress } from 'react-md/lib/Progress';
import { RaisedButton } from 'react-md/lib/Buttons';

import LoremIpsum from 'components/LoremIpsum';

export default class IndeterminateExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // awh
      refreshing: false,
      key: Math.random(),
    };
  }

  componentWillUnmount() {
    this.state.timeout && clearTimeout(this.state.timeout);
  }

  refreshLoremIpsum = () => {
    this.setState({
      refreshing: true,
      timeout: setTimeout(() => {
        this.setState({
          timeout: null,
          refreshing: false,
          key: Math.random(),
        });
      }, 6000),
    });
  };

  render() {
    return (
      <div>
        <RaisedButton label="Refresh Lorem Ipsum" onClick={this.refreshLoremIpsum} />
        <h3 className="md-title" style={{ marginTop: '2em' }}>Some Amazing Content</h3>
        <CSSTransitionGroup
          component="div"
          className="text-container"
          transitionName="opacity"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {this.state.refreshing && <LinearProgress key="progress" />}
          <LoremIpsum key={this.state.key} units="paragraphs" count={2} />
        </CSSTransitionGroup>
      </div>
    );
  }
}
