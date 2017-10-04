import React, { PureComponent } from 'react';
import { Button, LinearProgress } from 'react-md';

const REFRESH_TIME = 3000;
const UPDATE_INTERVAL = 15;
const UPDATE_INCREMENT = 100 / (REFRESH_TIME / UPDATE_INTERVAL);

export default class QueryIndeterminate extends PureComponent {
  state = { progress: null, demoing: false };

  componentWillUnmount() {
    this.clearTimeout();
  }

  timeout = null;
  interval = null;

  clearTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.timeout = null;
    this.interval = null;
  };

  start = () => {
    this.clearTimeout();

    this.timeout = setTimeout(() => {
      this.timeout = null;

      this.interval = setInterval(() => {
        const progress = Math.min(100, this.state.progress + UPDATE_INCREMENT);
        if (progress === 100) {
          clearInterval(this.refreshInterval);

          this.timeout = setTimeout(() => {
            this.timeout = null;
            this.setState({ progress: 0, demoing: false });
          }, 100);
        }

        this.setState({ progress });
      }, UPDATE_INTERVAL);

      this.setState({ progress: 0 });
    }, 8000);

    this.setState({ demoing: true });
  };

  render() {
    const { progress, demoing } = this.state;
    return (
      <div>
        <Button onClick={this.start} raised disabled={demoing}>
          Show Progress
        </Button>
        {demoing && <LinearProgress id="query-indeterminate-progress" query value={progress} />}
      </div>
    );
  }
}
