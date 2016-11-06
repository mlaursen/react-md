import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';
import Button from 'react-md/lib/Buttons/Button';
import PhoneSizeDemo from 'containers/PhoneSizeDemo';

const suffixes = [
  'That is quite disappointing.',
  'Getting interesting.',
  'Go you!',
  'Holy smokes!',
  'Golly gee willikers!',
  'Click! Click! Click!',
  'You get nothing else.',
  'K.',
];

const steps = [10, 30, 50, 100, 300, 500, 1000];

export default class FixedFloatingButtonExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      suffix: suffixes[0],
      shake: false,
      id: 0,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.id !== this.state.id && !this._timeout) {
      this._timeout = setTimeout(() => {
        this._timeout = null;
        this.setState({ shake: false });
      }, nextState.id > 2 ? 2000 : 1300);

      this.setState({ shake: true });
    }
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _updateCount = () => {
    const count = this.state.count + 1;
    let id = 0;
    steps.some(amt => {
      const gte = count >= amt;
      if (gte) {
        id += 1;
      }

      return !gte;
    });

    const suffix = suffixes[id];

    this.setState({ count, suffix, id });
  };

  render() {
    const { count, suffix, id, shake } = this.state;
    return (
      <PhoneSizeDemo
        contentClassName={cn('md-grid', { [`shake${id > 2 ? '-2' : ''}`]: shake })}
      >
        <CSSTransitionGroup
          transitionName="md-cross-fade"
          transitionLeave={false}
          transitionEnterTimeout={300}
          className="md-text-container md-cell md-cell--12"
        >
          <h6>{`Wow! You have clicked the FAB ${count} time${count === 1 ? '' : 's'}!`}</h6>
          <h6 key={suffix}>{suffix}</h6>
        </CSSTransitionGroup>
        <Button
          onClick={this._updateCount}
          floating
          secondary
          fixed
        >
          add
        </Button>
      </PhoneSizeDemo>
    );
  }
}
