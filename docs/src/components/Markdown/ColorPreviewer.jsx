import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Paper, Portal } from 'react-md';
import { find } from 'lodash/collection';

import scssColors from 'constants/scssColors';
import { hexToRgb } from 'utils/colors';

const PREVIEW_SIZE = '3em'; // set in _styles.scss
const CARET_SIZE = '.5em'; // same as above
const HALFED_PREVIEW_SIZE = '1.5em'; // just manually figure out half.
const TICK = 17;
const TRANSITION_TIME = 300;

export default class ColorPreviewer extends PureComponent {
  static propTypes = {
    container: PropTypes.object,
  };

  state = {
    style: null,
    previewStyle: null,
    enter: false,
    enterActive: false,
    leave: false,
    leaveActive: false,
  };

  componentWillMount() {
    this.pres = [];
    this.inTimeout = null;
    this.outTimeout = null;
    this.hideTimeout = null;
    this.target = null;
    this.variableTarget = null;
    this.variables = [...scssColors];
    this.setState({
      style: null,
      previewStyle: null,
      enter: false,
      enterActive: false,
      leave: false,
      leaveActive: false,
    });
  }

  componentDidMount() {
    this.checkPageForColors();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.checkPageForColors();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.inTimeout);
    clearTimeout(this.outTimeout);
    clearTimeout(this.hideTimeout);
    this.pres.forEach((pre) => {
      pre.removeEventListener('mouseenter', this.handleMouseEnter);
      pre.removeEventListener('mouseleave', this.handleMouseLeave);
      pre.removeEventListener('mousemove', this.handleMouseMove);
      pre.removeEventListener('scroll', this.handleScroll);
    });
  }

  checkPageForColors = () => {
    if (!this.props.container) {
      return;
    }

    this.pres = [].slice.call(this.props.container.querySelectorAll('pre.language-css,pre.language-scss'));
    this.pres.forEach((pre) => {
      pre.removeEventListener('mouseenter', this.handleMouseEnter);
      pre.removeEventListener('mouseleave', this.handleMouseLeave);
      pre.removeEventListener('mousemove', this.handleMouseMove);
      pre.removeEventListener('scroll', this.handleScroll);
      pre.addEventListener('mouseenter', this.handleMouseEnter);
      pre.addEventListener('mouseleave', this.handleMouseLeave);
      pre.addEventListener('scroll', this.handleScroll);
    });
  };

  findExistingValue = (variable) => {
    if (variable.match(/^#[A-Fa-f\d]{3,6}/)) {
      return variable;
    }

    const value = find(this.variables, ({ name }) => name === variable);
    return value ? value.value : null;
  };

  updateVariables = (target) => {
    if (this.variableTarget === target) {
      return;
    }

    this.variableTarget = target;
    this.variables = [...scssColors];
    const lines = target.textContent.split(/\r?\n/g);
    lines.forEach((line) => {
      if (!line.match(/^\$/) || line.match(/false|true/)) {
        return;
      }

      const [name, value] = line.split(': ');
      if (this.findExistingValue(name)) {
        return;
      }

      let trimmedValue = value.replace(/( !default)?;.*/, '');
      const matches = trimmedValue.match(/\$(\w+-?)+/g) || [];
      matches.forEach((match) => {
        const found = this.findExistingValue(match);
        if (!found) {
          return;
        }

        const regex = new RegExp(match.replace('$', '\\$'), 'g');
        trimmedValue = trimmedValue.replace(regex, found);
        if (trimmedValue.match(/rgba/)) {
          trimmedValue = trimmedValue.replace(/rgba\(.+,(.+)\)/, `rgba(${hexToRgb(found)},$1)`);
        }
      });

      if (trimmedValue.match(/^(rgba\(([0-9]{1,3},){3}|#[A-Fa-f\d]{6})/)) {
        this.variables.push({
          name,
          value: trimmedValue,
        });
      }
    });
  };

  animateIn = () => {
    clearTimeout(this.outTimeout);
    this.outTimeout = null;
    if (this.inTimeout) {
      return;
    }

    this.inTimeout = setTimeout(() => {
      this.setState({ enterActive: true });

      this.inTimeout = setTimeout(() => {
        this.inTimeout = null;
        this.setState({ enter: false, enterActive: false });
      }, TRANSITION_TIME);
    }, TICK);
    this.setState({ enter: true, leave: false, leaveActive: false });
  };

  animateOut = () => {
    clearTimeout(this.hideTimeout);
    this.hideTimeout = null;
    if (this.inTimeout) {
      clearTimeout(this.outTimeout);
      this.outTimeout = null;
      return;
    }

    this.target = null;
    this.outTimeout = setTimeout(() => {
      this.setState({ leaveActive: true });

      this.outTimeout = setTimeout(() => {
        this.outTimeout = null;
        this.setState({
          style: null,
          previewStyle: null,
          leave: false,
          leaveActive: false,
        });
      }, TRANSITION_TIME);
    }, TICK);
  };

  position = (el, color) => {
    clearTimeout(this.hideTimeout);
    clearTimeout(this.outTimeout);
    this.hideTimeout = null;
    this.outTimeout = null;

    this.target = el;
    const { left, width, top } = el.getBoundingClientRect();
    if (!this.state.style) {
      this.animateIn();
    }

    this.setState({
      style: {
        left: `calc(${left + (width / 2)}px - ${HALFED_PREVIEW_SIZE})`,
        top: `calc(${top}px - ${CARET_SIZE} - ${PREVIEW_SIZE})`,
      },
      previewStyle: {
        background: color,
      },
      leave: false,
      leaveActive: false,
    });
  };

  handleMouseEnter = (e) => {
    e.target.onmousemove = this.handleMouseMove;
    this.updateVariables(e.target);
  };

  handleMouseMove = (e) => {
    const isRgba = e.target.textContent === 'rgba';
    if (isRgba || e.target.className.match(/token (variable|hexcode)/)) {
      if (this.target === e.target && this.state.style) {
        return;
      }

      let searchValue;
      let rgbaAmount;
      if (isRgba) {
        const valueSpan = e.target.nextElementSibling.nextElementSibling;
        rgbaAmount = valueSpan.nextElementSibling.textContent;
        searchValue = valueSpan.textContent;
      } else {
        searchValue = e.target.textContent;
      }

      let colorValue = this.findExistingValue(searchValue);
      if (colorValue === null) {
        this.animateOut();
        return;
      } else if (isRgba) {
        colorValue = `rgba(${hexToRgb(colorValue)},${rgbaAmount})`;
      }

      this.position(e.target, colorValue);
    } else if (this.state.style && !this.hideTimeout && !this.outTimeout) {
      this.hideTimeout = setTimeout(() => {
        this.hideTimeout = null;
        this.animateOut();
      }, 100);
    }
  };

  handleMouseLeave = (e) => {
    e.target.onmousemove = null;
    this.animateOut();
  };

  handleScroll = () => {
    if (!this.state.leave) {
      this.animateOut();
    }
  };

  addScrollListener = () => {
    window.addEventListener('scroll', this.handleScroll);
  };

  removeScrollListener = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };

  render() {
    const { style, previewStyle, enter, enterActive, leave, leaveActive } = this.state;

    return (
      <Portal visible={!!style} onOpen={this.addScrollListener} onClose={this.removeScrollListener}>
        <Paper
          component="span"
          style={style}
          className={cn('color-preview', {
            'color-preview--enter': enter,
            'color-preview--enter-active': enterActive,
            'color-preview--leave': leave,
            'color-preview--leave-active': leaveActive,
          })}
          zDepth={3}
        >
          <span style={previewStyle} className="color-preview__preview" />
        </Paper>
      </Portal>
    );
  }
}
