import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import { isBetween } from '../utils';

/**
 * The `Paper` component is a simple wrappper that adds box-shadow.
 *
 * You can use the sass mixin instead to get the same functionality
 * without an additional div.
 *
 * ```scss
 * @include md-box-shadow(5);
 * ```
 */
export default class Paper extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * The depth of the paper. This should be a number between 0 - 5. If
     * the depth is 0, it will raise to a depth of 3 on hover.
     */
    zDepth: (props, propName, component, ...others) => {
      let err = PropTypes.number.isRequired(props, propName, component, ...others);
      if(err) {
        return err;
      }

      if(!isBetween(props[propName], 0, 5)) {
        return new Error(`The zDepth of 'Paper' must be a number between 0 and 5 but '${props[propName]}' was given.`);
      }
    },

    /**
     * Any children to display in the paper.
     */
    children: PropTypes.node,
  };

  static defaultProps = {
    zDepth: 1,
  };

  render() {
    const { children, zDepth, ...props } = this.props;
    const className = classnames(`paper-${zDepth}`, props.className);
    return <div {...props} className={className}>{children}</div>;
  }
}
