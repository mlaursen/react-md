import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import TextField from '../TextFields';
import { TAB } from '../constants/keyCodes';

export default class InlineAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: '',
      suggestion: '',
      left: 0,
      tabbed: false,
      focus: false,
      font: '',
    };
  }

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    floatingLabel: PropTypes.bool.isRequired,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    data: PropTypes.array.isRequired,
    label: PropTypes.string,
  };

  static defaultProps = {
    floatingLabel: true,
  };

  componentDidMount() {
    this._textField = findDOMNode(this).querySelector('.md-text-field');
    this._updateFont();
    window.addEventListener('resize', this._updateFont);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateFont);
  }

  _updateFont = () => {
    this.setState({ font: window.getComputedStyle(this._textField).getPropertyValue('font') });
  };

  _handleChange = (value) => {
    const lookup = value.toLowerCase();

    let suggestion = '', suggestionIndex = -1;
    lookup && this.props.data.some(({ name }, i) => {
      if(name.toLowerCase().indexOf(lookup) === 0) {
        suggestion = name.substring(lookup.length, name.length);
        suggestionIndex = i;
      }

      return suggestion;
    });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = this.state.font;
    const left = context.measureText(value).width + 20;

    this.setState({ value, suggestion, suggestionIndex, left, tabbed: false });
  };

  _handleKeyDown = (e) => {
    const { suggestionIndex } = this.state;
    if((e.which || e.keyCode) !== TAB || suggestionIndex === -1) { return; }

    e.preventDefault();
    this.setState({
      value: this.props.data[suggestionIndex].name,
      suggestion: '',
      suggestionIndex: -1,
      tabbed: true,
    });
  };

  _handleFocus = () => {
    this.setState({ focus: true });
  };

  _handleBlur = () => {
    this.setState({ focus: false });
  };

  render() {
    const { value, left, tabbed, focus } = this.state;
    const { floatingLabel, block, ...props } = this.props;
    delete props.onChange;
    delete props.onKeyDown;

    let suggestion;
    if(this.state.suggestion && focus) {
      suggestion = (
        <span
          key="suggestion"
          style={{ left }}
          className={classnames('md-autocomplete-suggestion', {
            'block': block,
            'single-line': !floatingLabel && !block,
            'floating': floatingLabel && !block,
          })}
        >
          {this.state.suggestion}
        </span>
      );
    }

    return (
      <CSSTransitionGroup
        component="div"
        className="md-autocomplete"
        transitionName="opacity"
        transitionEnterTimeout={150}
        transitionLeave={!tabbed}
        transitionLeaveTimeout={150}
      >
        <TextField
          {...props}
          block={block}
          floatingLabel={floatingLabel}
          value={value}
          onChange={this._handleChange}
          onKeyDown={this._handleKeyDown}
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
        />
        {suggestion}
      </CSSTransitionGroup>
    );
  }
}
