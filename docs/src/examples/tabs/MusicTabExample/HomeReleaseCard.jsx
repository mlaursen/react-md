import React, { PropTypes } from 'react';
import Card from 'react-md/lib/Cards/Card';
import KebabMenu from './KebabMenu';

import AlbumArtwork from './AlbumArtwork';

const HomeReleaseCard = ({ release }) => {
  const { artistName, images, albumId, albumName, albumPrice } = release;

  return (
    <Card className="md-cell md-cell--2-phone">
      <AlbumArtwork images={images} />
      <section className="artist-grid">
        <h5 className="artist-name">{artistName}</h5>
        <KebabMenu className="md-cell--right" menuId={`${albumId}Menu`} />
      </section>
      <footer className="album-price-grid">
        <h6 className="text-ellipsis">{albumName}</h6>
        <span className="album-price md-text-right md-color--primary">{albumPrice}</span>
      </footer>
    </Card>
  );
};

HomeReleaseCard.propTypes = {
  release: PropTypes.shape({
    artistId: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    albumId: PropTypes.string.isRequired,
    albumName: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })).isRequired,
    albumPrice: PropTypes.string.isRequired,
  }).isRequired,
};

export default HomeReleaseCard;
