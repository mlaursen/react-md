import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FileInput from './FileInput';

/**
 * The `FileUpload` component is used to upload files locally. If you want
 * to upload files to a server, use [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
 * by attaching the `File`.
 *
 * Quick example:
 *
 * ```js
 * function upload(file) {
 *   fetch('/api/images', {
 *     method: 'POST',
 *     body: new FormData().append('file', file),
 *   });
 * }
 * ```
 *
 * An upload can be aborted by calling the `abort(file || fileName)` function. If
 * the file or fileName are ommitted, it will *attempt* to abort the current
 * file that is uploading. Unreliable for multiselect.
 *
 * ```js
 * <FileUpload ref="upload" />
 * <RaisedButton onClick={() => this.refs.upload.abort()} label="Abort! Abort!" />
 * ```
 */
export default class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {};
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
     * A label to display on the `FileInput`.
     */
    label: PropTypes.string,

    /**
     * The icon children to use for the upload icon.
     */
    iconChildren: PropTypes.node,

    /**
     * The icon className to use for the upload icon.
     */
    iconClassName: PropTypes.string,

    /**
     * An optional max size for the file. If the file is greater than
     * this limit, the file will not be uploaded.
     */
    maxSize: PropTypes.number,

    /**
     * A required function to call when the `maxSize` prop is set. It will
     * be given a list of files that were too big.
     */
    onSizeError: (props, propName, component) => {
      if(typeof props.maxSize === 'number') {
        return PropTypes.func.isRequired(props, propName, component);
      }
    },

    /**
     * You can force the `FileReader` to read the file as a specific type
     * if you do not trust the *amazing* regex I have for choosing the correct
     * one.
     *
     * ```js
     * if(type.match(/image|video|audio/)) {
     *   fr.readAsDataURL(file);
     * } else if(type.match(/application|model|multipart/)) {
     *   fr.readAsArrayBuffer(file);
     * } else {
     *   fr.readAsText(file);
     * }
     * ```
     *
     * > `.yml` and `.js` both are considered `application`, so it definitely fails there.
     *
     * If this prop is a function, you will be given the file's type, the file object, and
     * the file reader. You will then need to call `fileReader.readAsYOUR_CORRECT_TYPE(file)`.
     */
    readAs: PropTypes.oneOfType([
      PropTypes.oneOf(['DataURL', 'ArrayBuffer', 'Text']),
      PropTypes.func,
    ]),

    /**
     * An optional function to call when the `FileUpload` aborts. The current
     * file and the abort event are given. This might not be the most useful
     * function to use since you will need to manually call abort yourself anyways.
     */
    onAbort: PropTypes.func,

    /**
     * An optional function to call when the `FileUpload` errors. The current
     * file, the error, and the error event are given.
     *
     * ```js
     * onError(file, event.target.error, event);
     * ```
     */
    onError: PropTypes.func,

    /**
     * An optional function to call when the `FileUpload` loads. The current
     * file, the load result, and the load event are given.
     *
     * ```js
     * onLoad(file, event.target.result, event);
     * ```
     *
     * The load result will either be:
     * - a data url
     * - a plain text string
     * - an array buffer
     *
     * depending on what type the file is.
     */
    onLoad: PropTypes.func,

    /**
     * An optional function to call when the `FileUpload` starts loading. The current
     * file and the load start event are given.
     */
    onLoadStart: PropTypes.func,

    /**
     * An optional function to call when the `FileUpload` finishes loading. The
     * current file and the load end event are given.
     */
    onLoadEnd: PropTypes.func,

    /**
     * An optional function to call when the `FileUpload` progress. The current
     * file, upload progress, and the progress event are given. The progress
     * will be a number between 0 and 100 that has not been rounded.
     *
     * ```js
     * onProgress(file, progress, event);
     * ```
     */
    onProgress: PropTypes.func,

    /**
     * An optional function to call when a file selects or unselects a file.
     * This will be called before any local uploading occurs.
     */
    onChange: PropTypes.func,
  };

  /**
   * Aborts the upload of a file. This either takes a file or a fileName and calls the
   * `abort` function for that file's `FileReader`.
   *
   * @param {Object|String} file? The file or the file name to use to find the correct `FileReader`.
   */
  abort = (file) => {
    let fileName = file;
    if(!file) {
      // Attempt to remove first file added...
      fileName = Object.keys(this.state)[0];
    } else if(typeof file.name === 'string') {
      fileName = file.name;
    }

    const reader = this.state[fileName];
    if(reader) {
      reader.abort();
      const state = this.state;
      delete state[fileName];

      findDOMNode(this).querySelector('.md-file-input').value = '';

      this.setState(state);
    }
  };

  _uploadFile = (file) => {
    const {
      onAbort,
      onError,
      onLoad,
      onLoadStart,
      onLoadEnd,
      onProgress,
      readAs,
    } = this.props;

    const { name, type } = file;

    const fr = new FileReader();
    if(onError) {
      fr.onerror = e => {
        onError(file, e.target.error, e);
      };
    }

    if(onAbort) {
      fr.onabort = e => {
        onAbort(file, e);
      };
    }

    if(onLoadStart) {
      fr.onloadstart = e => {
        onLoadStart(file, e);
      };
    }

    if(onLoadEnd) {
      fr.onloadend = e => {
        onLoadEnd(file, e);
      };
    }

    fr.onload = e => {
      if(onLoad) {
        onLoad(file, e.target.result, e);
      }

      const state = Object.assign({}, this.state);
      delete state[name];
      this.setState(state);
    };

    if(onProgress) {
      fr.onprogress = e => {
        if(e.lengthComputable) {
          onProgress(file, (e.loaded / e.total) * 100, e);
        }
      };
    }

    if(readAs) {
      if(typeof readAs === 'function') {
        readAs(file.type, file, fr);
      } else {
        fr['readAs' + readAs](file);
      }
    } else if(type.match(/image|video|audio/)) {
      fr.readAsDataURL(file);
    } else if(type.match(/application|model|multipart/)) {
      fr.readAsArrayBuffer(file);
    } else {
      fr.readAsText(file);
    }

    return fr;
  };

  _handleUpload = (files, e) => {
    this.props.onChange && this.props.onChange(files, e);

    if(!files) { return; }
    const { maxSize, onSizeError } = this.props;
    files = Array.isArray(files) ? files : [files];

    let errorFiles = [];
    if(maxSize) {
      errorFiles = files.filter(file => file.size > maxSize);
      files = files.filter(file => file.size <= maxSize);
    }

    if(errorFiles.length) {
      onSizeError(errorFiles);
    }

    if(!files.length) {
      return;
    }

    const nextState = {};
    files.forEach(file => {
      const fileReader = this._uploadFile(file);
      nextState[file.name] = fileReader;
    });

    this.setState(nextState);
  };

  render() {
    const { ...props } = this.props;

    // Remove invalid input props
    delete props.maxSize;
    delete props.onLoad;
    delete props.onLoadStart;
    delete props.onLoadEnd;
    delete props.onProgress;
    delete props.onAbort;
    delete props.onError;
    delete props.maxSize;
    delete props.onSizeError;
    delete props.readAs;

    return (
      <FileInput {...props} onChange={this._handleUpload} />
    );
  }
}
