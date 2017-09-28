import React, { PureComponent } from 'react';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';

export default class ProgressStyle extends PureComponent {
  state = { progress: 0 };

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  interval = null;

  clearInterval = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  start = () => {
    this.clearInterval();

    this.interval = setInterval(() => {
      const progress = this.state.progress + 10;
      this.setState({ progress: progress <= 100 ? progress : 0 });
    }, 1000);
  };

  render() {
    return (
      <section>
        <LinearProgress
          id="progress-style-example"
          value={this.state.progress}
          className="vertical-progress"
          style={{ height: 100, width: 20 }}
          progressStyle={value => ({ top: `${100 - value}%`, width: '100%' })}
        />
      </section>
    );
  }
}

