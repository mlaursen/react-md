import React, { PureComponent, PropTypes } from 'react';

import './_quick-nav.scss';
import QuickNavLink from './QuickNavLink';

export default class QuickNav extends PureComponent {
  static propTypes = {
    previousTo: PropTypes.string,
    previousName: PropTypes.string,
    nextTo: PropTypes.string,
    nextName: PropTypes.string,
  };

  render() {
    const { previousTo, previousName, nextTo, nextName } = this.props;
    return (
      <section className="quick-nav">
        <QuickNavLink
          to={previousTo}
          label="Previous"
          name={previousName}
          icon="arrow_back"
          align="left"
          className={!nextTo ? 'only' : null}
        />
        <QuickNavLink
          to={nextTo}
          label="Next"
          name={nextName}
          icon="arrow_forward"
          align="right"
        />
      </section>
    );
  }
}
