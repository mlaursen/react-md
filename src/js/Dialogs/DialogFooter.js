import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import FlatButton from '../Buttons/FlatButton';

/**
 * A simple component for converting action objects into `FlatButton`
 * or just rendering the actions that are valid elements.
 */
export default class DialogFooter extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * The optional className to apply.
     */
    className: PropTypes.string,

    /**
     * The list of actions or a single action to display in the footer.
     */
    actions: PropTypes.oneOfType([
      PropTypes.shape({
        onClick: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
      }),
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.shape({
          onClick: PropTypes.func.isRequired,
          label: PropTypes.string.isRequired,
        }),
      ])),
    ]).isRequired,
  };

  actionToElement = (action, key) => {
    if(!React.isValidElement(action)) {
      return <FlatButton key={key} {...action} />;
    } else {
      return action;
    }
  };

  render() {
    const { className, actions } = this.props;

    let children;
    if(Array.isArray(actions)) {
      children = actions.map(this.actionToElement);
    } else {
      children = this.actionToElement(actions);
    }

    return (
      <footer className={classnames('md-dialog-footer', className)}>
        {children}
      </footer>
    );
  }
}
