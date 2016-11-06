import React, { PureComponent, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import injectInk from 'react-md/lib/Inks';
import Media from 'react-md/lib/Media';
import Paper from 'react-md/lib/Papers';

import InlineSVG from 'components/InlineSVG';

@injectInk
export default class ImgCard extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    // Injected from injectInk
    ink: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { src, alt, title, to, ink, ...props } = this.props;

    return (
      <Paper
        {...props}
        zDepth={1}
        component={Link}
        to={`/${to}`}
        className="md-cell img-card"
      >
        {ink}
        <CardTitle title={title} />
        <Media aspectRatio="1-1" src={src} alt={alt} component={InlineSVG} />
      </Paper>
    );
  }
}
