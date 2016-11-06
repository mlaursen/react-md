import React, { PropTypes } from 'react';

import ArtistCard from './ArtistCard';
import CardGrid from './CardGrid';

const TopArtists = ({ artists }) => (
  <CardGrid>
    {artists.map(artist => <ArtistCard key={artist.id} artist={artist} />)}
  </CardGrid>
);

TopArtists.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    followers: PropTypes.shape({
      href: PropTypes.string,
      total: PropTypes.number.isRequired,
    }).isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })).isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default TopArtists;
