import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class ExampleCode extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    marked: PropTypes.func.isRequired,
    markdown: PropTypes.string.isRequired,
    maxHeight: PropTypes.number.isRequired,
    isExpanded: PropTypes.bool.isRequired,
  };

  render() {
    const { isExpanded, maxHeight, markdown, marked } = this.props;
    return (
      <section
        className={classnames('markdown', { 'expanded': isExpanded })}
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        style={{ maxHeight }}
      />
    );
  }
}
