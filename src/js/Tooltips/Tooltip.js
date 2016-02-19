import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { TAB } from '../constants/keyCodes';
import { getFirstFocusable } from '../utils';

const DESKTOP_FONT_SIZE = 10;
const MOBILE_FONT_SIZE = 14;

export default class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {};
  }

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.checkParent();
    this.hackChromeMinimumFontSize();
    window.addEventListener('resize', this.hackChromeMinimumFontSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.hackChromeMinimumFontSize);
  }

  checkParent = () => {
    const { tooltip } = this.refs;
    let parent = tooltip.parentNode;
    if(window.getComputedStyle(parent).getPropertyValue('position') === 'relative') {
      const el = getFirstFocusable(parent);
      if(!el) { return; }
      el.addEventListener('keyup', this.handleFocusableKeydown);
      el.addEventListener('blur', this.handleFocusableBlur);

      this.setState({ focusableEl: el });
    }
  };

  handleFocusableKeydown = (e) => {
    if((e.which || e.keyCode) !== TAB) { return; }
    this.setState({ active: true });
  };

  handleFocusableBlur = () => {
    this.setState({ active: false });
  };

  /**
   * Chrome doesn't allow a font-size below 12px.
   * You used to be able to use -webkit-text-size-adjust: none
   * but they have dropped support for that.
   *
   * So now the solution is to scale the text if chrome only..
   */
  hackChromeMinimumFontSize = () => {
    const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    const fontSize = parseInt(window.getComputedStyle(this.refs.text).getPropertyValue('font-size'));
    if(!isChrome || fontSize === MOBILE_FONT_SIZE) { return; }

    const transform = `scale(${DESKTOP_FONT_SIZE / fontSize})`;
    this.setState({
      style: {
        transform,
        WebkitTransform: transform,
        transformOrigin: '51% 50%', // hack for non blurred text
      },
    });
  };

  render() {
    const { text, className, ...props } = this.props;
    const { active } = this.state;
    return (
      <div
        ref="tooltip"
        className={classnames('md-tooltip', className, { active })}
        {...props}
      >
        <span ref="text" className="md-tooltip-text" style={this.state.style}>{text}</span>
      </div>
    );
  }
}
