/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Collapse,
} from 'react-md';
import loremIpsum from 'lorem-ipsum';

import { randomInt } from 'utils/random';
import PhoneEmulator from 'components/PhoneEmulator';
import './_fake-feed.scss';

/**
 * Creates a "random" content item with 1-3 paragraphs of text.
 */
function makeContent(i) {
  return {
    title: `Content ${i + 1}`,
    content: Array.from(Array(randomInt({ min: 1, max: 3 })))
      .map(() => loremIpsum({ count: 1, units: 'paragraphs' })),
  };
}

const ACCESSIBILITY_PROPS = {
  'aria-busy': true,
  'aria-describedby': 'fake-feed-loading-progress',
};

const REFRESH_TIME = 3000;
const UPDATE_INTERVAL = 15;
const UPDATE_INCREMENT = 100 / (REFRESH_TIME / UPDATE_INTERVAL);

export default class FakeFeed extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    determinate: PropTypes.bool,
  };

  constructor(props) {
    super();

    this.state = {
      progress: props.determinate ? 0 : undefined,
      collapsed: true,
      contents: [makeContent(0)],
    };
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  refreshTimeout = null;

  clearTimeout = () => {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }

    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    this.refreshTimeout = null;
    this.refreshInterval = null;
  };

  refreshContent = () => {
    this.clearTimeout();

    if (this.props.determinate) {
      this.createDeterminateProgress();
    } else {
      this.createIndeterminateProgress();
    }

    this.setState({ collapsed: false });
  };

  /**
   * Pretend like we are reloading or fetching content from an API Create a timeout
   * between 2.2 and 5.3 seconds to fake latency and then add the new item
   */
  createIndeterminateProgress = () => {
    this.refreshTimeout = setTimeout(() => {
      this.refreshTimeout = null;
      const contents = this.state.contents.slice();
      contents.unshift(makeContent(contents.length));
      this.setState({ contents, collapsed: true });
    }, randomInt({ min: 2200, max: 5320 }));
  };

  /**
   * This one is a bit more complicated. This will create an interval to update the progress
   * ever 15ms. Once the progress has reached 100%, it will wait 100ms, add the new content,
   * and hide the progress bar.
   */
  createDeterminateProgress = () => {
    this.refreshInterval = setInterval(() => {
      const progress = Math.min(100, this.state.progress + UPDATE_INCREMENT);
      if (progress === 100) {
        clearInterval(this.refreshInterval);

        // Now that it has been fully "loaded" wait 100ms then add the contents and hide
        // the progress bar.
        this.refreshTimeout = setTimeout(() => {
          this.refreshTimeout = null;

          const contents = this.state.contents.slice();
          contents.unshift(makeContent(contents.length));
          this.setState({ collapsed: true, progress: 0, contents });
        }, 100);
      }

      this.setState({ progress });
    }, UPDATE_INTERVAL);
  };

  render() {
    const { collapsed, contents, progress } = this.state;
    const { component: Progress } = this.props;

    let accessibilityProps;
    if (!collapsed) {
      accessibilityProps = ACCESSIBILITY_PROPS;
    }

    const cards = contents.map(({ title, content }) => (
      <Card className="md-cell md-cell--12" key={title}>
        <CardTitle title={title} expander />
        <CardText expandable>
          {content.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </CardText>
      </Card>
    ));

    const refresh = <Button flat onClick={this.refreshContent} disabled={!collapsed}>Refresh</Button>;
    return (
      <PhoneEmulator toolbarActions={refresh}>
        <Collapse collapsed={collapsed}>
          <div className="progress__fake-feed__progress">
            <Progress id={ACCESSIBILITY_PROPS['aria-describedby']} value={progress} />
          </div>
        </Collapse>
        <section className="md-grid" {...accessibilityProps}>
          {cards}
        </section>
      </PhoneEmulator>
    );
  }
}
