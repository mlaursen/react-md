import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';

import FileInput from 'react-md/lib/FileInputs';

import { addNotification } from 'actions/notifications';

@connect(() => ({}), { addNotification })
export default class DeterminateExample extends PureComponent {
  static propTypes = {
    addNotification: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
    this._interval = null;
    this._timeout = null;
  }

  componentWillUnmount() {
    if (this._interval) { clearInterval(this._interval); }
    if (this._timeout) { clearTimeout(this._timeout); }
  }

  _startFakeProgress = (file) => {
    if (!file || typeof this.state.progress === 'number') { return; }

    // pretend it always takes 6 seconds to upload a file
    const update = 20;
    const increment = 100 / (6000 / update);
    this._interval = setInterval(() => {
      const progress = Math.min(this.state.progress + increment, 100);
      if (progress >= 100) {
        clearInterval(this._interval);
        this._interval = null;
        this.props.addNotification({ text: `You have fakely uploaded '${file.name}'` });

        this._timeout = setTimeout(() => {
          this._timeout = null;
          this.setState({ progress: null });
        }, 2000);
      }

      this.setState({ progress });
    }, update);

    this.setState({ progress: 0 });
  };

  render() {
    const { progress } = this.state;
    return (
      <CSSTransitionGroup
        component="div"
        transitionName="opacity"
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}
      >
        {typeof progress === 'number' && <LinearProgress value={progress} />}
        <FileInput id="fileUpload" onChange={this._startFakeProgress} label="Select a file to upload" />
      </CSSTransitionGroup>
    );
  }
}
