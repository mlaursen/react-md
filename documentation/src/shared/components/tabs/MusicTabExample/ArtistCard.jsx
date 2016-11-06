import React, { PropTypes } from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';

import AlbumArtwork from 'components/Spotify/AlbumArtwork';

const ArtistCard = ({ artist }) => {
  const { images, name, followers } = artist;
  return (
    <Card className="md-cell md-cell--top">
      <AlbumArtwork images={images} />
      <CardTitle title={name} subtitle={`Followers: ${followers.total}`} />
    </Card>
  );
};

ArtistCard.propTypes = {
  artist: PropTypes.object.isRequired,
};

export default ArtistCard;
