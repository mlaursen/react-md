import React, { PureComponent, PropTypes } from 'react';
import loremIpsum from 'lorem-ipsum';

/* eslint-disable react/no-danger */

export default class LoremIpsum extends PureComponent {
  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
    count: PropTypes.number.isRequired,
    units: PropTypes.oneOf(['sentences', 'words', 'paragraphs']),
  };

  static defaultProps = {
    component: 'section',
    count: 1,
    units: 'paragraphs',
  };

  render() {
    const { component: Component, count, units, ...props } = this.props;
    return (
      <Component
        {...props}
        dangerouslySetInnerHTML={{
          __html: loremIpsum({ count, units, format: 'html' }),
        }}
      />
    );
  }
}
