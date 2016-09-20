import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { LinearProgress } from 'react-md/lib/Progress';
import Button from 'react-md/lib/Buttons';

import LoremIpsum from 'components/LoremIpsum';
const progressId = 'queryContentProgress';

// Since this isn't the best example since it isn't real world... Here
// is basically what is happening..
//
// Step 1: Display component with query={true} and value={null || undefined}
// Step 2: Once you can start the determinate part, set the value to a number
//         and keep incrementing until 100


export default class QueryIndeterminateExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      key: Math.random(),
    };
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  componentWillUnmount() {
    if (this._interval) { clearInterval(this._interval); }
    if (this._timeout) { clearTimeout(this._timeout); }
  }

  _startFakeProgress = () => {
    if (this._timeout || this._interval) { return; }

    // pretend it always takes 3 seconds to load a new page
    const update = 20;
    const increment = 100 / (3000 / update);

    this._timeout = setTimeout(() => {
      this._timeout = null;

      this._interval = setInterval(() => {
        this.updateProgress(increment);
      }, update),

      this.setState({ progress: 0 });
    }, 3000),

    this.setState({ active: true });
  };

  updateProgress = (increment) => {
    const progress = Math.min(this.state.progress + increment, 100);
    if (progress >= 100) {
      clearInterval(this._interval);
      this._interval = null;

      this._timeout = setTimeout(() => {
        this._timeout = null;

        this.setState({
          progress: null,
          active: false,
          key: Math.random(),
        });
      }, 2000);
    }

    this.setState({ progress });
  };

  render() {
    const { progress, active, key } = this.state;
    let accessibilityProps;
    if (active) {
      accessibilityProps = {
        'aria-busy': true,
        'aria-describedby': progressId,
      };
    }

    return (
      <div>
        <Button raised label="Fake load a new page" onClick={this._startFakeProgress} />
        <h3 className="md-title" style={{ marginTop: '2em' }}>Some Amazing Content</h3>
        <CSSTransitionGroup
          component="article"
          className="text-container"
          transitionName="opacity"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
          {...accessibilityProps}
        >
          {active && <LinearProgress id={progressId} value={progress} query />}
          <LoremIpsum key={key} units="paragraphs" count={2} />
        </CSSTransitionGroup>
      </div>
    );
  }
}
