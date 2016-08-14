import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import loremIpsum from 'lorem-ipsum';

export default class LoremIpsum extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    units: PropTypes.oneOf(['sentences', 'words', 'paragraphs']),
  };

  static defaultProps = {
    count: 1,
    units: 'paragraphs',
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

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
