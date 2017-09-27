import React, { PureComponent } from 'react';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';

import './_progress-style.scss';

export default class ProgressStyle extends PureComponent {
  state = { progress: 0 };

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  timeout = null;

  clearTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  start = () => {
    this.clearTimeout();

    this.timeout = setInterval(() => {
      const progress = this.state.progress + 10;
      this.setState({ progress: progress <= 100 ? progress : 0 });
    }, 1000);
  };

  render() {
    return (
      <section>
        <LinearProgress
          id="progressStyleExample"
          value={this.state.progress}
          className="vertical-progress"
          style={{ height: '100px', width: '20px' }}
          progressClassName="vertical-progress-bar"
          progressStyle={value => ({ top: `${100 - value}%`, width: '100%' })}
        />
      </section>
    );
  }
}

