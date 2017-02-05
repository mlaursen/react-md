import React, { PureComponent, PropTypes } from 'react';
import loremIpsum from 'lorem-ipsum';

/* eslint-disable react/no-danger */

function makeLorem({ count, units, paragraphClassName }) {
  const ipsum = loremIpsum({ count, units, format: 'html' });
  if (!paragraphClassName) {
    return ipsum;
  }

  return ipsum.replace(/<p/g, `<p class="${paragraphClassName}"`);
}

export default class LoremIpsum extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    paragraphClassName: PropTypes.string,
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

  constructor(props) {
    super(props);

    this.state = { lorem: makeLorem(props) };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.count !== nextProps.count || this.props.units !== nextProps.units) {
      this.setState({ lorem: makeLorem(nextProps) });
    }
  }

  render() {
    const { lorem } = this.state;
    const {
      component: Component,
      count, // eslint-disable-line no-unused-vars
      units, // eslint-disable-line no-unused-vars
      paragraphClassName, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    return <Component {...props} dangerouslySetInnerHTML={{ __html: lorem }} />;
  }
}
