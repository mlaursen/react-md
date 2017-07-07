/* eslint-disable jsx-a11y/img-has-alt */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Media from 'react-md/lib/Media';

const styles = {
  media: { width: 140 },
};

const NewsItem = ({ title, subtitle, time, img, titleClassName, subtitleClassName }) => (
  <li className="md-cell md-cell--12 md-divider-border md-divider-border--bottom bottom-navigations__dynamic__news-item">
    <div className="news-left">
      <h4 className={titleClassName}>{title}</h4>
      <h5 className={cn('md-color--secondary-text', subtitleClassName)}>{subtitle}</h5>
      <span className="md-color--secondary-text">{time}</span>
    </div>
    <div>
      <Media aspectRatio="1-1" style={styles.media}>
        <img src={img} role="presentation" />
      </Media>
    </div>
  </li>
);

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  titleClassName: PropTypes.string,
  subtitleClassName: PropTypes.string,
};

export default NewsItem;
