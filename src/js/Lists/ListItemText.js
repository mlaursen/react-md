import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class ListItemText extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    primaryText: PropTypes.node.isRequired,
    secondaryText: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { primaryText, secondaryText, ...props } = this.props;
    const className = classnames('md-tile-content', props.className);

    return (
      <div {...props} className={className}>
        <div className="md-tile-primary-text">{primaryText}</div>
        {secondaryText && <div className="md-tile-secondary-text">{secondaryText}</div>}
      </div>
    );
  }
}
