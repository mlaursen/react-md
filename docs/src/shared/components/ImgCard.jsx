import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';
import { CardTitle, CardMedia } from 'react-md/lib/Cards';
import injectInk from 'react-md/lib/Inks';

@injectInk
export default class ImgCard extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  };

  render() {
    const { src, alt, title, to, ...props } = this.props;
    return (
      <Link to={`/${to}`} className="md-card raise ink-item img-card" {...props}>
        <CardTitle title={title} />
        <CardMedia aspectRatio={CardMedia.aspect.equal}>
          <img src={src} alt={alt} />
        </CardMedia>
      </Link>
    );
  }
}
