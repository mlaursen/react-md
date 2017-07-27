import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import FontIcon from 'react-md/lib/FontIcons';
import Media from 'react-md/lib/Media';

import Markdown from 'components/Markdown';

const THREE_MB = 3 * 1024 * 1024;

class UploadedFileCard extends PureComponent {
  static propTypes = {
    file: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      lastModified: PropTypes.instanceOf(Date).isRequired,
      data: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(ArrayBuffer),
      ]).isRequired,
    }).isRequired,
    onRemoveClick: PropTypes.func.isRequired,
    locale: PropTypes.string,
  };

  state = {
    image: false,
    video: false,
    language: null,
    aspectRatio: undefined,
  };

  componentWillMount() {
    this.determineFileType();
    this.formatter = Intl.DateTimeFormat(this.props.locale);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.formatter = Intl.DateTimeFormat(nextProps.locale);
    }

    if (this.props.file !== nextProps.file) {
      this.determineFileType(nextProps);
    }
  }

  gcd = (a, b) => {
    if (b === 0) {
      return a;
    }

    return this.gcd(b, a % b);
  };

  findClosestAspectRatio = (e) => {
    const { naturalHeight: h, naturalWidth: w } = e.target;
    const denominator = this.gcd(w, h);
    const x = w / denominator;
    const y = h / denominator;

    if (x < y) {
      this.setState({ aspectRatio: '1-1' });
    }
  };

  determineFileType = (props = this.props) => {
    const { type, name } = props.file;
    let image = false;
    let video = false;
    let language = null;
    if (type.match(/image/)) {
      image = true;
    } else if (type.match(/video/) || name.match(/\.mkv$/)) {
      video = true;
    } else if (name.match(/\.jsx$/)) {
      language = 'jsx';
    } else if (name.match(/\.ts$/)) {
      language = 'typescript';
    } else if (type.match(/text|application\/json/) || !type) {
      language = type.replace(/text\/(x-)?/, '') || 'markdown';
    }

    this.setState({ image, video, language });
  };

  removeCard = () => {
    this.props.onRemoveClick(this.props.file);
  };

  render() {
    const { image, video, language, aspectRatio } = this.state;
    const { name, size, lastModified, data, type } = this.props.file;

    let content;
    if (image) {
      content = <img src={data} alt={name} onLoad={this.findClosestAspectRatio} />;
    } else if (video) {
      const large = size >= THREE_MB;
      content = (
        <video
          muted
          controls
          autoPlay={!large}
          loop={!large}
          preload={large ? 'none' : 'auto'}
        >
          <source src={data} type={type || 'video/webm'} />
          Your browser does not support this video type.
        </video>
      );
    } else if (language !== null) {
      content = <Markdown markdown={`\`\`\`${language}\n${data}\n\`\`\``} />;
    } else if (typeof data === 'string') {
      content = <embed src={data} />;
    } else {
      content = <FontIcon className="file-inputs__upload-card__dummy-file" forceSize={48} forceFontSize>file_download</FontIcon>;
    }

    if (language === null) {
      content = (
        <Media aspectRatio={aspectRatio}>
          {content}
        </Media>
      );
    }

    return (
      <Card className={cn('file-inputs__upload-card')}>
        <Button icon onClick={this.removeCard} className="file-inputs__upload-card__remove">close</Button>
        {content}
        <CardTitle
          title={`${name} ${type ? `(${type})` : ''}`}
          subtitle={`Last Modified: ${this.formatter.format(lastModified)}. Size: (${size} b)`}
        />
      </Card>
    );
  }
}

export default connect(({ locale }) => ({ locale }))(UploadedFileCard);
