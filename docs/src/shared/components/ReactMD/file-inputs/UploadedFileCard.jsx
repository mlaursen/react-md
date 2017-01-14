import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';

import Button from 'react-md/lib/Buttons';
import { Card, CardTitle } from 'react-md/lib/Cards';
import FontIcon from 'react-md/lib/FontIcons';
import Media, { MediaOverlay } from 'react-md/lib/Media';

import Markdown from 'components/Markdown';

export default class UploadedFileCard extends PureComponent {
  static propTypes = {
    file: PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      lastModified: PropTypes.instanceOf(Date).isRequired,
      type: PropTypes.string,
      uploadResult: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(ArrayBuffer),
      ]).isRequired,
    }).isRequired,
  };

  _extractLang = () => {
    const { type, uploadResult } = this.props.file;
    let lang = '';
    if (type) {
      lang = type.replace('text/x-', '');
    } else {
      const [firstLine] = uploadResult.split('\n');
      if (firstLine.substring(0, 2) === '#!') {
        lang = firstLine.replace(/#!(\/usr)?\/bin(\/env)?\//, '');
      }
    }

    return lang;
  };

  render() {
    const { name, size, lastModified, type, uploadResult } = this.props.file;
    let content;
    let application;
    if (type.match(/image/)) {
      content = <img src={uploadResult} alt={name} />;
    } else if (type.match(/text/) || !type) {
      const lang = this._extractLang();
      const markdown = `\`\`\`${lang}\n${uploadResult}\n\`\`\``;

      content = <Markdown markdown={markdown} className="text-source" />;
    } else {
      application = true;
      content = <FontIcon className="dummy-file">file_download</FontIcon>;
    }

    return (
      <Card className={classnames('md-cell uploaded', { application })}>
        <Media>
          <MediaOverlay>
            <CardTitle
              key="title"
              title={`${name} (${type})`}
              subtitle={`Last Modified: ${Intl.DateTimeFormat('en-US').format(lastModified)}. Size: (${size} b)`}
            />
          </MediaOverlay>
          <Button icon data-name={name} className="close-btn">close</Button>
          {content}
        </Media>
      </Card>
    );
  }
}
