import React, { PropTypes } from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import MediaOverlay from 'react-md/lib/Media/MediaOverlay';

import AlbumArtwork from 'components/Spotify/AlbumArtwork';

const HomeTopTrackCard = ({ track }) => {
  const { trackName, images } = track;

  return (
    <Card className="md-cell md-cell--2-phone">
      <AlbumArtwork images={images}>
        <MediaOverlay>
          <CardTitle title={trackName} subtitle="$0.99" />
        </MediaOverlay>
      </AlbumArtwork>
    </Card>
  );
};

HomeTopTrackCard.propTypes = {
  track: PropTypes.shape({
    artistId: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default HomeTopTrackCard;
