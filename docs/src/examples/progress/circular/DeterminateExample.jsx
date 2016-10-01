import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { CircularProgress } from 'react-md/lib/Progress';

import FileInput from 'react-md/lib/FileInputs';

import { addToast } from 'actions/ui';

const progressId = 'fileUploadProgress';

@connect(() => ({}), {
  addToast,
})
export default class DeterminateExample extends PureComponent {
  static propTypes = {
    addToast: PropTypes.func.isRequired,
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
        this.props.addToast({ text: `You have fakely uploaded '${file.name}'` });

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
        {typeof progress === 'number' && <CircularProgress key="progress" id={progressId} value={progress} />}
        <FileInput id="upload" onChange={this._startFakeProgress} label="Select a file to upload" />
      </CSSTransitionGroup>
    );
  }
}
