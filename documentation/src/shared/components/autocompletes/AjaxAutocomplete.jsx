import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Avatar from 'react-md/lib/Avatars';
import Autocomplete from 'react-md/lib/Autocompletes';

import fetchSpotify from 'actions/fetchSpotify';
import randomInt from 'utils/RandomUtils/randomInt';
import AlbumCard from 'components/Spotify/AlbumCard';

export default class AjaxAutocomplete extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { artists: [], fetching: false, albums: [] };
    this._searchForArtists = this._searchForArtists.bind(this);
    this._fetchAlbums = this._fetchAlbums.bind(this);
  }

  _searchForArtists(value) {
    if (!value) {
      this.setState({ artists: [], fetching: false });
      return;
    }

    fetchSpotify.search(value)
      .then(results => {
        const { limit, total, offset, items } = results;

        const artists = items.map(artist => {
          let leftAvatar;
          if (artist.images.length) {
            leftAvatar = <Avatar key={artist.id} src={artist.images[artist.images.length - 1].url} role="presentation" />
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

        this.setState({ fetching: false, artists });
      });

    this.setState({ fetching: true });
  }

  _fetchAlbums(artist, index) {
    fetchSpotify.getArtistAlbums(this.state.artists[index])
      .then(albums => Promise.all(albums.map(fetchSpotify.getAlbum)))
      .then(albums => this.setState({ albums }));
    this.setState({ artist })
  }

  render() {
    const { artists, albums, artist } = this.state;

    let helpText;
    let artistText;
    if (albums.length) {
      helpText = (
        <h5 key="help" className="md-text-container md-cell md-cell--12">
          Click on an album to play a random 30 second song preview from that album.
        </h5>
      );

      artistText = <h3 className="md-cell md-cell--12">Artist: {artist}</h3>;
    }

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
          placeholder="Artist"
          data={artists}
          dataLabel="name"
          dataValue="id"
          filter={null}
          onChange={this._searchForArtists}
          clearOnAutocomplete
          onAutocomplete={this._fetchAlbums}
        />
        {helpText}
        {artistText}
        {albums.map(album => <AlbumCard key={album.id} album={album} />)}
      </CSSTransitionGroup>
    );
  }
}
