import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';

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
      <div className="news-item">
        <div className="news-left">
          <h4 className={classnames('md-headline', titleClassName)}>{title}</h4>
          <h6 className={classnames('md-subheader', subtitleClassName)}>{subtitle}</h6>
          <span className="secondary-text">{time}</span>
        </div>
        <div className="news-right">
          <img src={img} role="presentation" />
        </div>
      </div>
    );
  }
}
