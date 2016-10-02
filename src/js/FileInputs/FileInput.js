import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import FontIcon from '../FontIcons';
import IconSeparator from '../Helpers/IconSeparator';
import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';

/**
 * The `FileInput` component is used as simple styling for the `<input type="file" />`.
 * It will style the input as a raised button by default.
 */
export default class FileInput extends PureComponent {
  static propTypes = {
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
     */
    accept: PropTypes.string,

    /**
     * Boolean if multiple files will be accepted.
     */
    multiple: PropTypes.bool,

    /**
     * A label to display on the `FileInput` when no files have been selected.
     */
    label: PropTypes.string.isRequired,

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
     * The id for the text field. This is required for a11y and to get the `input type="file"` to
     * open.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),

    /**
     * Boolean if the `FileInput` is currently disabled.
     */
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    label: 'Select a file from your computer',
    iconChildren: 'file_upload',
  };

  constructor(props) {
    super(props);

    this.state = { hover: false, active: false };
    this._handleChange = this._handleChange.bind(this);
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

  render() {
    const { active, hover } = this.state;
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
      ...props,
    } = this.props;
    delete props.onChange;

    const icon = <FontIcon iconClassName={iconClassName} children={iconChildren} />;
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
          className={cn(`md-btn md-btn--${flat ? 'flat' : 'raised'} md-btn--text`, {
            'md-btn--color-primary': !disabled && flat && primary,
            'md-btn--color-secondary': !disabled && flat && secondary,
            'md-btn--color-primary-active': !disabled && flat && hover && primary,
            'md-btn--color-secondary-active': !disabled && flat && hover && secondary,
            'md-btn--raised-primary': !disabled && !flat && primary,
            'md-btn--raised-secondary': !disabled && !flat && secondary,
            'md-btn--raised-active': !disabled && !flat && active,
          })}
        >
          <IconSeparator
            label={label}
            iconBefore={iconBefore}
            children={icon}
          />
        </AccessibleFakeInkedButton>
        <input
          disabled={disabled}
          id={id}
          accept={accept}
          type="file"
          aria-hidden="true"
          type="file"
          className="md-file-input"
          onChange={this._handleChange}
        />
      </div>
    );
  }
}
