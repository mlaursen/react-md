import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Media from 'react-md/lib/Media';
import injectInk from 'react-md/lib/Inks';
import Paper from 'react-md/lib/Papers';

import InlineSVG from 'components/InlineSVG';

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
        <Media aspectRatio="1-1" component={InlineSVG} src={src} alt={alt} />
      </Paper>
    );
  }
}
