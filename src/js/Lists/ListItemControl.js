import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import ListItemText from './ListItemText';

export default class ListItemControl extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.node,
    primaryAction: PropTypes.element,
    secondaryAction: PropTypes.element,
    threeLines: PropTypes.bool,
    validation: (props, propName, componentName) => {
      if(!props.primaryAction && !props.secondaryAction) {
        return new Error(`Missing required prop 'primaryAction' or 'secondaryAction' for the component '${componentName}'.`);
      }

      if(props.primaryAction && props.secondaryAction) {
        return new Error(`You can not have a 'primaryAction' and a 'secondaryAction' prop for the component '${componentName}'.`);
      }
    },
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
