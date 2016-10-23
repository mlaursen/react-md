import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Tabs from 'react-md/lib/Tabs/Tabs';

import LoremIpsum from 'components/LoremIpsum';
import { numberToString } from 'utils/StringUtils';

const tabs = [...new Array(3)].map((_, i) => ({
  label: `Tab ${numberToString(i + 1)}`,
  children: (
    <section key={numberToString(i + 1)} className="md-cell md-cell--12">
      <h2 className="md-text-capitalize">Item {numberToString(i + 1)}</h2>
      <LoremIpsum key={numberToString(i)} count={2} />
    </section>
  ),
}));
import './_styles.scss';

export default class SimpleTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { activeTabIndex: 0, children: tabs[0].children, direction: 'left' };
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(activeTabIndex, children) {
    this.setState({ activeTabIndex, children, direction: activeTabIndex > this.state.activeTabIndex ? 'left' : 'right' });
  }

  render() {
    const { activeTabIndex, children, direction } = this.state;
    return (
      <div>
        <Tabs tabs={tabs} onChange={this._handleChange} activeTabIndex={activeTabIndex} />
        <CSSTransitionGroup
          component="div"
          className="md-grid"
          style={{ overflowX: 'hidden', position: 'relative' }}
          transitionName={`swipe-${direction}`}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {children}
        </CSSTransitionGroup>
      </div>
    );
  }
}
