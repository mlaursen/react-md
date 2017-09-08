import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardTitle from 'react-md/lib/Cards/CardTitle';

import { QuickLinkTitle } from 'components/QuickLink';

@connect(({ media: { desktop } }) => ({ desktop }))
export default class Title extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desktop: PropTypes.bool,

    // This is only required because of how the Card reads the prop types for this to work.
    expander: PropTypes.bool,
  };

  static defaultProps = {
    expander: true,
  };

  render() {
    const { id, expander, title, desktop } = this.props;

    return (
      <CardTitle
        title={<QuickLinkTitle id={id} title={title} desktop={desktop} />}
        expander={expander}
        className="quick-link"
      />
    );
  }
}
