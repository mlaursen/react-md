import React, { PureComponent, PropTypes } from 'react';

import { sort, flatten } from 'utils/ListUtils';
import spotifyApi from 'utils/spotifyApi';

import CardGrid from './CardGrid';
import AlbumCard from './AlbumCard';

export default class TopAlbums extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    artists: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { albums: [] };

    this._getTopAlbums = this._getTopAlbums.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active && !this.state.albums.length) {
      this._getTopAlbums();
    }
  }

  _getArtistAlbums(artist) {
    return spotifyApi.getArtistAlbums(artist.id)
      .then(albums => Promise.all(albums.slice(0, 3).map(album => spotifyApi.getAlbum(album.id))));
  }

  _getTopAlbums() {
    Promise.all(this.props.artists.slice(0, 5).map(this._getArtistAlbums))
      .then(albums => {
        this.setState({ albums: sort(flatten(albums), 'popularity') });
      });
  }

  render() {
    return (
      <CardGrid>
        {this.state.albums.map(album => <AlbumCard key={album.id} album={album} />)}
      </CardGrid>
    );
  }
}
