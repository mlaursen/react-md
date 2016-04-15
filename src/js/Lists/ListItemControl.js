import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import ListItemText from './ListItemText';

/**
 * A `ListItemControl` component has either a `primaryAction` or a `secondaryAction`.
 * The `primaryAction` can **only** be a `Checkbox`. A `secondaryAction` can either be
 * a `Checkbox`, `Switch`, or a `Reorder` icon.
 */
export default class ListItemControl extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * An optional className to apply to the list item.
     */
    className: PropTypes.string,

    /**
     * The primary text to display in the item.
     */
    primaryText: PropTypes.string.isRequired,

    /**
     * An optional secondary text to display below the `primaryText`. This can
     * be an additional 1 or 2 lines. The text will automatically be ellipsed
     * if it spans more than one line. If the prop `threeLines` is set to true,
     * then the text will automatically be ellipsed if it spans more than two lines.
     */
    secondaryText: PropTypes.node,

    /**
     * Boolean if the `ListItem` should allow three lines of text including
     * the `primaryText`.
     */
    threeLines: PropTypes.bool,

    /**
     * The primary action element for the `ListItemControl`. This should be a `Checkbox`
     * component.
     *
     * The custom validation will warn you about missing both a `primaryAction` and
     * a `secondaryAction` or if you have both a `primaryAction` and a `secondaryAction`.
     */
    primaryAction: (props, propName, component) => {
      const primaryAction = props[propName];
      const secondaryAction = props.secondaryAction;
      if(primaryAction && !secondaryAction) {
        return PropTypes.element(props, propName, component);
      } else if(!primaryAction && !secondaryAction) {
        return new Error(`Missing required prop 'primaryAction' or 'secondaryAction' for the component '${component}'.`);
      } else if(primaryAction && secondaryAction) {
        return new Error(`You can not have a 'primaryAction' and a 'secondaryAction' prop for the component '${component}'.`);
      }
    },

    /**
     * A secondary action element. This should be either a `Checkbox`, `Switch`, or a
     * `Reorder` icon.
     */
    secondaryAction: PropTypes.element,
  };

  static defaultProps = {
    threeLines: false,
  };

  render() {
    const { primaryAction, secondaryAction, primaryText, secondaryText, threeLines, ...props } = this.props;

    const label = (
      <ListItemText
        primaryText={primaryText}
        secondaryText={secondaryText}
        leftIcon={!!primaryAction}
        rightIcon={!!secondaryAction}
      />
    );

    const control = React.cloneElement(primaryAction || secondaryAction, { label, labelBefore: !!secondaryAction });
    const className = classnames('md-list-item', props.className, {
      'primary-action': !!primaryAction,
      'secondary-action': !!secondaryAction,
      'two-lines': secondaryText && !threeLines,
      'three-lines': threeLines,
    });

    return (
      <li {...props} className={className}>
        {control}
      </li>
    );
  }
}
