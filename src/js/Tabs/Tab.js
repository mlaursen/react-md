import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import injectInk from '../Inks';

/**
 * The `Tab` component should be rendered inside the `Tabs` component.
 * It is used for generating a tab and holding some sort of content
 * to be displayed when active.
 */
class Tab extends Component {
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
     * The content to display when the tab is active.
     */
    children: PropTypes.node,

    /**
     * An optional icon to display in the tab.
     */
    icon: PropTypes.node,

    /**
     * An optional label to display in the tab.
     */
    label: PropTypes.string,

    /**
     * An optional second line label to display in the tab.
     */
    label2: PropTypes.string,

    /**
     * Boolean if the Tab is currently active. This is managed by the
     * `Tabs` component.
     */
    checked: PropTypes.bool,

    /**
     * A function to call when the tab is clicked. This is managed by the
     * `Tabs` component.
     */
    onChange: PropTypes.func,

    /**
     * Ink that has been injected from the `injectInk` HOC. Do not use.
     */
    ink: PropTypes.node.isRequired,
  };

  render() {
    const { className, icon, label, label2, checked, ink, onChange, ...props } = this.props;

    return (
      <div
        className={classnames('md-tab', className, { 'active': checked })}
        {...props}
      >
        {ink}
        <label
          className={classnames('md-tab-label', {
            'multiline': !!label && !!label2,
            'with-icon': !!label && !!icon,
          })}
        >
          {icon}
          {label && <div>{label}</div>}
          {label2 && <div>{label2}</div>}
          <input
            type="radio"
            className="md-tab-control"
            checked={checked}
            onChange={onChange}
          />
        </label>
      </div>
    );
  }
}

export default injectInk(Tab);
