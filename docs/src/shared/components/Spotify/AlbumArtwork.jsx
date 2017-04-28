import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Media from 'react-md/lib/Media';

export default class AlbumArtwork extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      height: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    })).isRequired,
    children: PropTypes.node,
  };

  state = { imgSrc: null };

  _findSrc = (media) => {
    if (media === null) {
      return;
    }

    const { offsetWidth } = findDOMNode(media);
    let src;
    this.props.images.some(({ width, url }) => {
      if (width >= offsetWidth) {
        src = url;
      }


      return src;
    });

    if (!src) {
      src = this.props.images[this.props.images.length - 1].url;
    }

    this.setState({ imgSrc: src });
  };

  render() {
    return (
      <Media aspectRatio="1-1" ref={this._findSrc}>
        <img src={this.state.imgSrc} role="presentation" />
        {this.props.children}
      </Media>
    );
  }
}
