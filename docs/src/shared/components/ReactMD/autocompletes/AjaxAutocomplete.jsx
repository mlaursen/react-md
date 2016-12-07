import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons/Button';
import Autocomplete from 'react-md/lib/Autocompletes';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import throttle from 'lodash.throttle';

import fetchSpotify from 'actions/fetchSpotify';
import randomInt from 'utils/RandomUtils/randomInt';
import AlbumCard from 'components/Spotify/AlbumCard';

export default class AjaxAutocomplete extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { artists: [], fetching: false, albums: [] };
    this._searchForArtists = this._searchForArtists.bind(this);
    this._fetchAlbums = this._fetchAlbums.bind(this);
    this._hideAlbums = this._hideAlbums.bind(this);
  }

  _searchForArtists(value) {
    if (!value) {
      this.setState({ artists: [], fetching: false });
      return;
    }

    fetchSpotify.search(value)
      .then(results => {
        const { items } = results;

        const artists = items.map(artist => {
          let leftAvatar;
          if (artist.images.length) {
            leftAvatar = <Avatar key={artist.id} src={artist.images[artist.images.length - 1].url} role="presentation" />;
          } else {
            let letter = artist.name.replace(/ /g, '').toUpperCase();
            letter = letter.charAt(randomInt({ min: 0, max: letter.length - 1 }));
            leftAvatar = <Avatar key={artist.id} random>{letter}</Avatar>;
          }

          return {
            id: artist.id,
            key: artist.id,
            name: artist.name,
            leftAvatar,
          };
        });

        this.setState({ artists });
      });
  }

  _fetchAlbums(artist, index) {
    fetchSpotify.getArtistAlbums(this.state.artists[index])
      .then(albums => Promise.all(albums.map(fetchSpotify.getAlbum)))
      .then(albums => this.setState({ albums, fetching: false }));
    this.setState({ artist, fetching: true });
  }

  _hideAlbums() {
    this.setState({ albums: [] });
  }

  render() {
    const { artists, albums, artist, fetching } = this.state;

    let artistText;
    if (albums.length) {
      artistText = <h3 className="md-cell md-cell--12">Artist: {artist}</h3>;
    }

    const progress = (
      <div className="md-cell md-cell--12" key="prorgress">
        <CircularProgress id="fetching-artist" />
      </div>
    );

    const fab = (
      <Button
        key="fab"
        fixed
        floating
        secondary
        onClick={this._hideAlbums}
        tooltipLabel="Hide all albums"
        tooltipPosition="left"
      >
        delete
      </Button>
    );

    return (
      <CSSTransitionGroup
        component="div"
        className="md-grid"
        transitionName="md-cross-fade"
        transitionEnterTimeout={300}
        transitionLeave={false}
      >
        <Autocomplete
          id="spotify-search"
          type="search"
          label="Type an artist name"
          className="md-cell"
          placeholder="Artist"
          data={artists}
          dataLabel="name"
          dataValue="id"
          filter={null}
          onChange={throttle(this._searchForArtists, 250)}
          clearOnAutocomplete
          onAutocomplete={this._fetchAlbums}
        />
        {fetching ? progress : null}
        {artistText}
        {albums.map(album => <AlbumCard key={album.id} album={album} />)}
        {albums.length ? fab : null}
      </CSSTransitionGroup>
    );
  }
}
