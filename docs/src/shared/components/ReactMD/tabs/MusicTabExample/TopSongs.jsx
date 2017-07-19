import React, { PureComponent, PropTypes } from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardText from 'react-md/lib/Cards/CardText';

import fetchSpotify from 'actions/fetchSpotify';
import sort from 'utils/ListUtils/sort';

import AlbumArtwork from 'components/Spotify/AlbumArtwork';
import CardGrid from './CardGrid';
import KebabMenu from './KebabMenu';

export default class TopSongs extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    artists: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    onLoad: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { songs: [] };
    this._fetching = false;
    this._fetchSongs = this._fetchSongs.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this._fetching && nextProps.active && !this.state.songs.length) {
      this._fetchSongs(nextProps.artists);
    }
  }

  _fetchSongs(artists) {
    this._fetching = true;
    Promise.all(artists.map(({ id: artistId, name: artistName }) => fetchSpotify.getArtistTopTracks(artistId, 1)
      .then(song => ({
        artistId,
        artistName,
        songId: song.id,
        songName: song.name,
        images: song.album.images,
        popularity: song.popularity,
      })))).then(songs => this.setState({ songs: sort(songs, 'popularity') }, this.props.onLoad));
  }

  render() {
    const songs = this.state.songs.map(({ images, songName, artistName, songId }, i) => (
      <Card key={songId} className="md-cell md-cell--6 md-cell--8-tablet song-card md-grid md-grid--no-spacing">
        <div className="md-cell md-cell--4 md-cell--1-phone">
          <AlbumArtwork images={images} />
        </div>
        <CardText className="md-cell md-cell--8 md-cell--3-phone song-text">
          <div style={{ width: 'calc(100% - 48px)' }}>
            <h4 className="text-ellipsis no-margin md-font-medium">{i + 1}. {songName}</h4>
            <h6 className="text-ellipsis no-margin md-color--secondary-text">{artistName}</h6>
          </div>
          <KebabMenu id={songId} menuClassName="md-cell--right song-kebab" />
          <h5 className="md-text-right md-color--primary no-margin song-price md-font-medium">$1.29</h5>
        </CardText>
      </Card>
    ));

    return (
      <CardGrid>
        {songs}
      </CardGrid>
    );
  }
}
