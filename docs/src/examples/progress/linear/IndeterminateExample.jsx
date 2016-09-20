import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { LinearProgress } from 'react-md/lib/Progress';
import Button from 'react-md/lib/Buttons';

import LoremIpsum from 'components/LoremIpsum';
const progressId = 'contentLoadingProgress';

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
    const { refreshing, key } = this.state;

    let accessibilityProps;
    if (refreshing) {
      accessibilityProps = {
        'aria-busy': true,
        'aria-describedby': progressId,
      };
    }

    return (
      <div>
        <Button raised label="Refresh Lorem Ipsum" onClick={this.refreshLoremIpsum} />
        <h3 className="md-title" style={{ marginTop: '2em' }}>Some Amazing Content</h3>
        <CSSTransitionGroup
          component="div"
          className="text-container"
          transitionName="opacity"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
          {...accessibilityProps}
        >
          {refreshing && <LinearProgress key="progress" id={progressId} />}
          <LoremIpsum key={key} units="paragraphs" count={2} />
        </CSSTransitionGroup>
      </div>
    );
  }
}
