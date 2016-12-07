import React, { PureComponent, PropTypes } from 'react';

import fetchSpotify from 'actions/fetchSpotify';
import sort from 'utils/ListUtils/sort';
import flatten from 'utils/ListUtils/flatten';

import AlbumCard from 'components/Spotify/AlbumCard';
import CardGrid from './CardGrid';

export default class TopAlbums extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    artists: PropTypes.arrayOf(PropTypes.object).isRequired,
    onLoad: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { albums: [] };
    this._fetching = false;

    this._getTopAlbums = this._getTopAlbums.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this._fetching && nextProps.active && !this.state.albums.length) {
      this._getTopAlbums();
    }
  }

  _getArtistAlbums(artist) {
    return fetchSpotify.getArtistAlbums(artist.id)
      .then(albums => Promise.all(albums.slice(0, 3).map(album => fetchSpotify.getAlbum(album.id))));
  }

  _getTopAlbums() {
    this._fetching = true;
    Promise.all(this.props.artists.slice(0, 5).map(this._getArtistAlbums))
      .then(albums => {
        this.setState({ albums: sort(flatten(albums), 'popularity') }, this.props.onLoad);
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
