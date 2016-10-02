import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';
import { CardTitle, CardMedia } from 'react-md/lib/Cards';
import injectInk from 'react-md/lib/Inks';
import Paper from 'react-md/lib/Papers';

@injectInk
export default class ImgCard extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    ink: PropTypes.node,
  };

  render() {
    const { src, alt, title, to, ink, ...props } = this.props;
    return (
      <Paper
        {...props}
        zDepth={1}
        component={Link}
        to={`/${to}`}
        className="img-card md-cell"
      >
        {ink}
        <CardTitle title={title} />
        <CardMedia aspectRatio={CardMedia.aspect.equal}>
          <img src={src} alt={alt} />
        </CardMedia>
      </Paper>
    );
  }
}
