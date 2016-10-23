import React, { PureComponent, PropTypes } from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import Subheader from 'react-md/lib/Subheaders';

import AlbumArtwork from './AlbumArtwork';

const artistList = PropTypes.arrayOf(PropTypes.shape({
  href: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['artist']).isRequired,
  uri: PropTypes.string.isRequired,
  external_urls: PropTypes.object.isRequired,
})).isRequired;

const marketList = PropTypes.arrayOf(PropTypes.string).isRequired;

export default class AlbumCard extends PureComponent {
  static propTypes = {
    album: PropTypes.shape({
      album_type: PropTypes.string.isRequired,
      artists: artistList,
      available_markets: marketList,
      copyrights: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })).isRequired,
      external_ids: PropTypes.object.isRequired,
      external_urls: PropTypes.object.isRequired,
      genres: PropTypes.arrayOf(PropTypes.string).isRequired,
      href: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
      })).isRequired,
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      popularity: PropTypes.number.isRequired,
      release_date: PropTypes.string.isRequired,
      release_date_precision: PropTypes.string.isRequired,
      tracks: PropTypes.shape({
        href: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
          artists: artistList,
          available_markets: marketList,
          disc_number: PropTypes.number.isRequired,
          duration_ms: PropTypes.number.isRequired,
          explicit: PropTypes.bool.isRequired,
          external_urls: PropTypes.object.isRequired,
          href: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          preview_url: PropTypes.string.isRequired,
          track_number: PropTypes.number.isRequired,
          type: PropTypes.oneOf(['track']).isRequired,
          uri: PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
      type: PropTypes.oneOf(['album']).isRequired,
      uri: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const {
      album: {
        name,
        release_date: releaseDate,
        artists,
        images,
        tracks: { items: tracks },
        label,
      },
    } = this.props;
    return (
      <Card className="md-cell md-cell--12 md-cell--top">
        <CardTitle title={name} subtitle={`Released: ${releaseDate}`} />
        <CardText className="md-grid md-grid--no-padding">
          <div className="md-cell">
            <AlbumArtwork images={images} />
            <List>
              <Subheader primaryText="Artists" primary />
              {artists.map(artist => (
                <ListItem key={artist.id} primaryText={artist.name} />
              ))}
              <Subheader primaryText="Label" primary />
              <ListItem primaryText={label} />
            </List>
          </div>
          <List className="md-cell">
            <Subheader primaryText="Tracks" />
            {tracks.map(track => (
              <ListItem
                key={track.id}
                primaryText={`${track.track_number}. ${track.name}`}
                secondaryText="Click to preview"
                onClick={function preview() {
                  window.open(track.preview_url);
                }}
              />
            ))}
          </List>
        </CardText>
      </Card>
    );
  }
}
