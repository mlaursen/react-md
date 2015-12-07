import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class CodeComment extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    comment: PropTypes.string.isRequired,
  }

  render() {
    return (
      <span className="react-md-code-block code-comment-block">
        <pre className="code-comment">{this.props.comment}</pre>
      </span>
    );
  }
}
