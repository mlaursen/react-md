import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import injectInk from '../Inks';
import FontIcon from '../FontIcons';

/**
 * The `FileInput` component is used as simple styling for the `<input type="file" />`.
 * It will style the input as a raised button by default.
 */
class FileInput extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

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
     * as an array and the change event. If this is not a multiple file input, only the newly selected File
     * will be given instead of a list of one file. Since this is an `input` tag,
     * the user will not be able to select the same file multiple times unless
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
     * Injected from `injectInk`
     */
    ink: PropTypes.node,
  };

  static defaultProps = {
    label: 'Select a file from your computer',
    iconChildren: 'file_upload',
  };

  _handleChange = (e) => {
    const { multiple, onChange } = this.props;
    const { files } = e.target;
    if(!multiple) {
      onChange(files[0] || null, e);
    } else {
      onChange(Array.prototype.slice.call(files), e);
    }
  };

  render() {
    const {
      style,
      className,
      label,
      iconChildren,
      iconClassName,
      primary,
      secondary,
      flat,
      ink,
      ...props,
    } = this.props;
    delete props.onChange;

    return (
      <label
        style={style}
        className={classnames(`md-btn md-${flat ? 'flat' : 'raised'}-btn`, className, {
          'md-primary': primary,
          'md-secondary': secondary,
        })}
        disabled={props.disabled}
      >
        {ink}
        <input
          {...props}
          aria-hidden="true"
          type="file"
          className="md-file-input"
          onChange={this._handleChange}
        />
        <div className="icon-separator">
          <FontIcon iconClassName={iconClassName} children={iconChildren} />
          <span className="text">{label}</span>
        </div>
      </label>
    );
  }
}

export default injectInk(FileInput);
