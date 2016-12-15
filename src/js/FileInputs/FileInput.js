import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import { TAB, SPACE, ENTER } from '../constants/keyCodes';
import captureNextEvent from '../utils/EventUtils/captureNextEvent';
import FontIcon from '../FontIcons/FontIcon';
import IconSeparator from '../Helpers/IconSeparator';
import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';

/**
 * The `FileInput` component is used as simple styling for the `<input type="file" />`.
 * It will style the input as a raised button by default.
 */
export default class FileInput extends PureComponent {
  static propTypes = {
    /**
     * The id for the text field. This is required for a11y and to get the `input type="file"` to
     * open.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),

    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * Boolean if the `FileInput` should be styled with the primary color.
     */
    primary: PropTypes.bool,

    /**
     * Boolean if the `FileInput` should be styled with the secondary color.
     */
    secondary: PropTypes.bool,

    /**
     * Boolean if the `FileInput` should be styled as a flat button instead of a
     * raised button.
     */
    flat: PropTypes.bool,

    /**
     * This should be a comma separated list of Media Types that the `FileInput` can
     * accept. If this prop is left blank, any file will be accepted.
     *
     * The values can either be:
     * - A file extension
     * - audio/*
     * - video/*
     * - image/*
     * - any valid [IANA Media Type](http://www.iana.org/assignments/media-types/media-types.xhtml)
     *
     * > NOTE: IE does not enforce this.
     */
    accept: PropTypes.string,

    /**
     * Boolean if multiple files will be accepted.
     */
    multiple: PropTypes.bool,

    /**
     * A label to display on the `FileInput`. This will be used with the `AccessibleFakeInkedButton` component to
     * create a `<label>` for the `<input type="file">`.
     */
    label: PropTypes.node.isRequired,

    /**
     * Boolean if the icons hould appear before the label.
     */
    iconBefore: PropTypes.bool,

    /**
     * The icon children to use for the upload icon.
     */
    iconChildren: PropTypes.node,

    /**
     * The icon className to use for the upload icon.
     */
    iconClassName: PropTypes.string,

    /**
     * A function to call when the value of the input changes. This will
     * be triggered when the user selects a new file or cancels the new file selection.
     *
     * This function will be given the new [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList)
     * as an array and the change event. If this is not a multiple file input, only the
     * newly selected File will be given instead of a list of one file. Since this is an
     * `input` tag, the user will not be able to select the same file multiple times unless
     * you manually clear the input's value.
     *
     * > NOTE: If the user hits cancel, null will be given for a single file input.
     *
     * ```js
     * onChange(files, e);
     * ```
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Boolean if the `FileInput` is currently disabled.
     */
    disabled: PropTypes.bool,

    /**
     * An optional function to call when they keyup event is triggerred on the file input's label.
     */
    onKeyUp: PropTypes.func,

    /**
     * An optional function to call when they keydown event is triggerred on the file input's label.
     */
    onKeyDown: PropTypes.func,

    /**
     * An optional function to call when they mouseup event is triggerred on the file input's label.
     */
    onMouseUp: PropTypes.func,

    /**
     * An optional function to call when they mousedown event is triggerred on the file input's label.
     */
    onMouseDown: PropTypes.func,

    /**
     * An optional function to call when they mouseover event is triggerred on the file input's label.
     */
    onMouseOver: PropTypes.func,

    /**
     * An optional function to call when they mouseleave event is triggerred on the file input's label.
     */
    onMouseLeave: PropTypes.func,

    /**
     * An optional function to call when they touchend event is triggerred on the file input's label.
     */
    onTouchEnd: PropTypes.func,

    /**
     * An optional function to call when they touchstart event is triggerred on the file input's label.
     */
    onTouchStart: PropTypes.func,
  };

  static defaultProps = {
    label: 'Select a file',
    iconChildren: 'file_upload',
  };

  constructor(props) {
    super(props);

    this.state = { hover: false, pressed: false };

    this._blur = this._blur.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.disabled && !nextProps.disabled && this.state.hover) {
      this.setState({ hover: false });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // I honestly don't remember why this was implemented, but it was copied from the Button
    // component
    if (!this.state.pressed && nextState.pressed) {
      this._timeout = setTimeout(() => {
        this._timeout = null;
        if (this._attemptedBlur) {
          this._attemptedBlur = false;

          this.setState({ pressed: false });
        }
      }, 450);
    }
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    window.removeEventListener('click', this._blur);
  }

  _handleChange(e) {
    const { multiple, onChange } = this.props;
    const { files } = e.target;
    if (!multiple) {
      onChange(files[0] || null, e);
    } else {
      onChange(Array.prototype.slice.call(files), e);
    }
  }

  _blur() {
    if (this.props.disabled) {
      return;
    }

    if (this._timeout) {
      this._attemptedBlur = true;
    } else {
      this.setState({ pressed: false });
    }
  }

  _handleMouseUp(e) {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }

    this._blur();
  }

  _handleMouseDown(e) {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e);
    }

    if (!this.props.disabled) {
      this.setState({ pressed: true });
    }
  }

  _handleTouchStart(e) {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    if (!this.props.disabled) {
      this.setState({ pressed: true });
    }
  }

  _handleTouchEnd(e) {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(e);
    }

    this._blur();
    captureNextEvent('mouseover');
  }

  _handleKeyUp(e) {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }


    if ((e.which || e.keyCode) === TAB) {
      window.addEventListener('click', this._blur);
      this.setState({ pressed: true });
    }
  }

  _handleKeyDown(e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    const key = e.which || e.keyCode;

    if (key === TAB) {
      window.removeEventListener('click', this._blur);
      this.setState({ pressed: false });
    } else if (key === SPACE || key === ENTER) {
      e.preventDefault();
      e.target.click();
    }
  }

  _handleMouseOver(e) {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }

    if (!this.props.disabled) {
      this.setState({ hover: true });
    }
  }

  _handleMouseLeave(e) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    if (!this.props.disabled) {
      this.setState({ hover: false });
    }
  }

  render() {
    const { hover, pressed } = this.state;
    const {
      style,
      className,
      label,
      iconChildren,
      iconClassName,
      primary,
      secondary,
      flat,
      id,
      iconBefore,
      disabled,
      accept,
      multiple,
      ...props
    } = this.props;
    delete props.onChange;
    delete props.onKeyUp;
    delete props.onKeyDown;
    delete props.onMouseUp;
    delete props.onMouseDown;
    delete props.onMouseOver;
    delete props.onMouseLeave;
    delete props.onTouchStart;
    delete props.onTouchEnd;

    const icon = !iconClassName && !iconChildren
      ? null
      : <FontIcon iconClassName={iconClassName}>{iconChildren}</FontIcon>;

    const themeClassNames = !disabled && cn({
      'md-text--theme-primary md-ink--primary': flat && primary,
      'md-text--theme-secondary md-ink--secondary': flat && secondary,
      'md-background--primary md-background--primary-hover': !flat && primary,
      'md-background--secondary md-background--secondary-hover': !flat && secondary,
      'md-btn--color-primary-active': flat && hover && primary,
      'md-btn--color-secondary-active': flat && hover && secondary,
    });

    let labelChildren = label;
    if (icon) {
      labelChildren = <IconSeparator label={label} iconBefore={iconBefore}>{icon}</IconSeparator>;
    }

    return (
      <div
        {...props}
        style={style}
        className={cn('md-inline-block md-file-input-container', className)}
      >
        <AccessibleFakeInkedButton
          component="label"
          htmlFor={id}
          disabled={disabled}
          onTouchStart={this._handleTouchStart}
          onTouchEnd={this._handleTouchEnd}
          onMouseDown={this._handleMouseDown}
          onMouseUp={this._handleMouseUp}
          onKeyDown={this._handleKeyDown}
          onKeyUp={this._handleKeyUp}
          onMouseOver={this._handleMouseOver}
          onMouseLeave={this._handleMouseLeave}
          className={cn(`md-btn md-btn--${flat || disabled ? 'flat' : 'raised'} md-btn--text`, themeClassNames, {
            'md-text': !disabled,
            'md-text--disabled': disabled,
            'md-btn--raised-disabled': disabled && !flat,
            'md-btn--raised-pressed': !disabled && !flat && pressed,
          })}
        >
          {labelChildren}
        </AccessibleFakeInkedButton>
        <input
          multiple={multiple}
          disabled={disabled}
          id={id}
          accept={accept}
          type="file"
          aria-hidden="true"
          className="md-file-input"
          onChange={this._handleChange}
        />
      </div>
    );
  }
}
