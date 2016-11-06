import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Media from 'react-md/lib/Media';

export default class NewsItem extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    titleClassName: PropTypes.string,
    subtitleClassName: PropTypes.string,
  };

  render() {
    const { title, subtitle, time, img, titleClassName, subtitleClassName } = this.props;
    return (
      <li className="md-cell md-cell--12 news-item md-divider-border md-divider-border--bottom">
        <div className="news-left">
          <h4 className={cn(titleClassName)}>{title}</h4>
          <h5 className={cn('md-color--secondary-text', subtitleClassName)}>{subtitle}</h5>
          <span className="md-color--secondary-text">{time}</span>
        </div>
        <div>
          <Media aspectRatio="1-1" style={{ width: 140 }}>
            <img src={img} role="presentation" />
          </Media>
        </div>
      </li>
    );
  }
}
