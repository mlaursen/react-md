import React, { PureComponent, PropTypes } from 'react';
import loremIpsum from 'lorem-ipsum';

/* eslint-disable react/no-danger */

export default class LoremIpsum extends PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired,
    units: PropTypes.oneOf(['sentences', 'words', 'paragraphs']),
  };

  static defaultProps = {
    count: 1,
    units: 'paragraphs',
  };

  render() {
    const { count, units, ...props } = this.props;
    return (
      <div
        {...props}
        dangerouslySetInnerHTML={{
          __html: loremIpsum({ count, units, format: 'html' }),
        }}
      />
    );
  }
}
