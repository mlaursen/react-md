/* eslint-disable react/sort-comp */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Paper, Portal } from 'react-md';
import { find } from 'lodash/collection';

// This is a generated file by running `yarn colors` in the docs directory of react-md.
// It parses the react-md/src/scss/_colors.scss file for all valid colors and creates
// a list of { $name, #value } pairs.
import scssColors from 'constants/scssColors';
import { hexToRgb } from 'utils/colors';

const PREVIEW_SIZE = '3em'; // set in _styles.scss
const CARET_SIZE = '.5em'; // same as above
const HALFED_PREVIEW_SIZE = '1.5em'; // just manually figure out half.
const TICK = 17;
const TRANSITION_TIME = 300;
const HIDE_DELAY = 300;

/**
 * The ColorPreviewer is a component that should be used alongside the Markdown
 * component. Whenever the markdown has been parsed and rendered into the page,
 * this component will check all the code block instances for css or scss and
 * add event listeners so that when a user mouses over a hex color (#eof || #eeooff)
 * it will show a preview of that color above the element.
 *
 * This component currently relies on classnames that Prismjs provides as well
 * as my custom markdown formatting logic that is built on top of the Github flavored
 * markdown.
 */
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

  /**
   * A list of pre code block elements within the current markdown container.
   * This gets update once the component mounts or each time the markdown is
   * updated.
   */
  pres = [];

  /**
   * A timeout used for animating the color previewer into view.
   */
  inTimeout = null;

  /**
   * A timeout used for animating the color previewer out of view.
   */
  outTimeout = null;

  /**
   * A timeout used for animating the color previewer out of view whenever
   * the user stops hovering over a valid color.
   */
  hideTimeout = null;

  /**
   * This is the current hover target so that the work can be done "lazily" for
   * figuring out which color to use.
   */
  target = null;

  /**
   * This is the current pre code block that is being used as the variable "overrider".
   * This is really just used so that moving the mouse in and out of the same code block
   * repeatedly and quickly won't keep trying to find new variables.
   */
  variableTarget = null;

  /**
   * This is the current list of variables "in scope". Whenever the user mouses over a
   * new code block, the base scss colors will be updated with any new defined color
   * variables.
   */
  variables = [...scssColors];

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
      // reset target so variables can be updated again
      this.target = null;
      this.variableTarget = null;
      this.checkPageForColors();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.inTimeout);
    clearTimeout(this.outTimeout);
    clearTimeout(this.hideTimeout);

    // This is really only for hot-reloading since it doesn't always remove the pres.
    this.pres.forEach((pre) => {
      pre.removeEventListener('mouseenter', this.handleMouseEnter);
      pre.removeEventListener('mouseleave', this.handleMouseLeave);
      pre.removeEventListener('mousemove', this.handleMouseMove);
      pre.removeEventListener('scroll', this.handleScroll);
    });
  }

  checkPageForColors = () => {
    if (__TEST__ || !this.props.container) {
      return;
    }

    // Find all the css and scss code blocks within the markdown container and handle adding/removing
    // event listeners.
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

  /**
   * Attempts to find an existing color value for a variable or color. The provided
   * color can be a hex code, but it will just be returned.
   *
   * If the variable does not exist within the scope, or the variable is not actually
   * a color within the scope, null will be returned.
   *
   * @param {String} variable - Either a Sass variable to get a value for or a color
   *    hex code that should be returned.
   * @return {String} the color value or null.
   */
  findExistingValue = (variable) => {
    if (variable.match(/^#[A-Fa-f\d]{3,6}/)) {
      return variable;
    }

    const value = find(this.variables, ({ name }) => name === variable);
    return value ? value.value : null;
  };

  /**
   * This will update the list of variables related to the current code block
   * scope. Only variables that have not already been defined will be added.
   *
   * @param {HTMLElement} target - The current code block element target.
   */
  updateVariables = (target) => {
    if (this.variableTarget === target) {
      return;
    }

    this.variableTarget = target;
    this.variables = [...scssColors];
    const lines = target.textContent.split(/\r?\n/g);
    lines.forEach((line) => {
      if (!line.match(/^\$/) || line.match(/false|true/)) {
        // ignore lines that don't start with defining a variable
        // or any lines that define a variable that is a boolean.
        return;
      }

      const [name, predicate] = line.split(': ');
      if (this.findExistingValue(name)) {
        return;
      }

      // remove everything from the predicate from the semi-color and onward. I don't
      // want anything except for a variable or a hex value for a color.
      let value = predicate.replace(/(!default)?;.*/, '').trim();

      // get a list of all the hex values or variables to be evaluated/updated
      const predicateVariables = (value.match(/(\$|#)(\w+-?)+/g) || []);
      predicateVariables.forEach((variable) => {
        const replacementValue = this.findExistingValue(variable);
        if (!replacementValue) {
          return;
        }

        // create a regex to replace the variable with the found value for all occurrences within the line
        // and escape any '$' in the string
        const regex = new RegExp(variable.replace('$', '\\$'), 'g');
        value = value.replace(regex, replacementValue);

        // After the value possibly got updated with a new value, check if it is an rgba function.
        // If it is rgba, convert the hex code to an rgb value and set all ocurrences to be
        // rgba(r,g,b,opacity)
        if (value.match(/rgba/)) {
          value = value.replace(/rgba\(.+,(.+)\)/, `rgba(${hexToRgb(replacementValue)},$1)`);
        }
      });

      // if the value is a correctly formatted rgba function or a 6 digit hex code,
      // add it to the list of available variables in the scope
      if (value.match(/^(rgba\(([0-9]{1,3},){3}|#[A-Fa-f\d]{6})/)) {
        this.variables.push({ name, value });
      }
    });
  };

  /**
   * Handles the ColorPreviewer animating in. This will handle creating and clearing
   * any timeouts to apply animation class names as well as updating and resetting
   * state as needed.
   *
   * The basic logic is that the animating in will have higher precedence over any
   * out animations or mouse leave hide animations.
   */
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

  /**
   * Handles the ColorPreviewer animating in. This will handle creating and clearing
   * any timeouts to apply animation class names as well as updating and resetting
   * state as needed.
   *
   * The basic logic is that the animating in will have higher precedence over any
   * out animations or mouse leave hide animations.
   */
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

  /**
   * This will position the ColorPreviewer related to the current element under the mouse.
   * It will clear any leaving animation or hiding timeouts as well.
   *
   * To not have to render lots and lots of previewers, the preview will just move and update
   * the background related to the current element under the mouse without doing any animation.
   * If this is the first time the ColorPreviewer is being positioned on the page, it will
   * start the enter opacity animation.
   *
   * @param {HTMLElement} el - the current event target element
   * @param {String} color - The color to apply to the previewer.
   */
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

    // position the previewier to be in the center horizontally and above the current variable
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

  addScrollListener = () => {
    window.addEventListener('scroll', this.handleScroll);
  };

  removeScrollListener = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleMouseEnter = (e) => {
    e.target.onmousemove = this.handleMouseMove;
    this.updateVariables(e.target);
  };

  handleMouseMove = (e) => {
    // there are rare cases (or maybe just hot-reloading) where the variableTarget
    // will be nulled by the time the mousemove event happens, only update the variables
    // and wait for the next mousemove to trigger any previews
    if (!this.variableTarget) {
      let el = e.target;
      while (el.parentElement) {
        if (el.tagName === 'PRE') {
          this.updateVariables(el);
          return;
        }

        el = el.parentElement;
      }
    }

    const isRgba = e.target.textContent === 'rgba';
    if (isRgba || e.target.className.match(/token (variable|hexcode)/)) {
      if (this.target === e.target && this.state.style) {
        // do nothing if the previewer is already visible and the last color target
        // is equal to the current color target
        return;
      }

      let searchValue;
      let rgbaAmount;
      if (isRgba) {
        // pretty bad stuff here. If Prismjs changes how they parse tokens in the future,
        // this is broke. Anyways, the value is the second sibling of the rgba token and
        // the opacity value is the third sibling.
        const valueSpan = e.target.nextElementSibling.nextElementSibling;
        rgbaAmount = valueSpan.nextElementSibling.textContent;
        searchValue = valueSpan.textContent;
      } else {
        searchValue = e.target.textContent;
      }

      let colorValue = this.findExistingValue(searchValue);
      if (colorValue === null) {
        // if the variable is not a color or the color couldn't be found, hide the preview
        this.animateOut();
        return;
      } else if (isRgba) {
        colorValue = `rgba(${hexToRgb(colorValue)},${rgbaAmount})`;
      }

      this.position(e.target, colorValue);
    } else if (this.state.style && !this.hideTimeout && !this.outTimeout) {
      // if the previewer is visible and it is not currently animating out, create a timeout
      // to automatically hide the previewer, or else if the user mouses away to some white
      // space, the previewer won't hide until the mouse leaves the code block.
      this.hideTimeout = setTimeout(() => {
        this.hideTimeout = null;
        this.animateOut();
      }, HIDE_DELAY);
    }
  };

  handleMouseLeave = (e) => {
    e.target.onmousemove = null;
    this.animateOut();
  };

  handleScroll = () => {
    if (this.state.style && !this.state.leave) {
      this.animateOut();
    }
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
