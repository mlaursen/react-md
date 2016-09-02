import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Autocomplete from 'react-md/lib/Autocompletes';
import Avatar from 'react-md/lib/Avatars';
import { SPACE, ENTER } from 'react-md/lib/constants/keyCodes';
import { uniqBy } from 'lodash/array';

import { getRandomInt } from 'utils/RandomUtils';
import './_spotify.scss';
import SpotifyAlbum from './SpotifyAlbum';

const SPOTIFY_API = 'https://api.spotify.com/v1';

if (__CLIENT__ && !global.fetch) {
  require.ensure([], require => {
    require('whatwg-fetch');
  });
}

export default class SpotifySearch extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { artists: [], albums: [], playingId: null, value: '' };
  }

  componentWillUnmount() {
    this._timeout && clearTimeout(this._timeout);
    this._audioPlayer && this._audioPlayer.removeEventListener('ended', this._stopPlayer);
  }

  _handleChange = (value) => {
    if (!value) {
      return this.setState({ value, limit: null, offset: null, total: null });
    }

    this._fetchArtists(value);
  };

  _startLazyLoad = () => {
    this.timeout = setTimeout(() => {
      findDOMNode(this).querySelector('.md-list').addEventListener('scroll', e => {
        if (this.state.fetchng) { return; }

        const { scrollHeight, offsetHeight, scrollTop } = e.target;
        if (scrollHeight - offsetHeight - 8 <= scrollTop) {
          this._fetchArtists(this.state.value, this.state.offset + this.state.limit);
        }
      });

      this._timeout = null;
    }, 300);
  };

  _fetchArtists = (artist, searchOffset = 0) => {
    fetch(`${SPOTIFY_API}/search?type=artist&q=${encodeURI(artist)}&offset=${searchOffset}`)
      .then(response => response.json())
      .then(json => {
        const { limit, total, offset, items } = json.artists;
        let artists = items.map(artist => {
          let leftAvatar;
          if (artist.images.length) {
            leftAvatar = <Avatar key={artist.id} src={artist.images[artist.images.length - 1].url} />;
          } else {
            let letter = artist.name.replace(' ', '').toUpperCase();
            letter = letter.charAt(getRandomInt({ min: 0, max: letter.length - 1 }));
            leftAvatar = <Avatar key={artist.id} random>{letter}</Avatar>;
          }

          return {
            id: artist.id,
            key: artist.id,
            name: artist.name,
            leftAvatar,
          };
        });

        if (searchOffset > 0) {
          artists = uniqBy(this.state.artists.concat(artists), 'key');
        }

        this.setState({
          limit,
          total,
          offset,
          artists,
          fetching: false,
        });
      })
      .catch(err => console.log(err));

    this.setState({ value: artist, fetching: true });
  };

  _fetchArtistAlbums = (artist, index) => {
    fetch(`${SPOTIFY_API}/artists/${this.state.artists[index].id}/albums`)
      .then(response => response.json())
      .then(json => {
        this.setState({ albums: json.items, fetching: false });
      })
      .catch(err => console.log(err));

    this.setState({ fetching: true, value: '', artists: [], artist });
  };

  _handleListClick = (e) => {
    let target = e.target;
    while (target && target.parentNode) {
      if (target.dataset.albumId) {
        this._toggleAudioPreview(target.dataset.albumId);
      }

      target = target.parentNode;
    }
  };

  _handleListKeyDown = (e) => {
    const { albumId } = e.target.dataset;
    if (albumId && [SPACE, ENTER].indexOf((e.which || e.keyCode)) !== -1) {
      this._toggleAudioPreview(albumId);
    }
  };

  _stopPlayer = () => {
    this.setState({ playingId: null });
  };

  _toggleAudioPreview = (albumId) => {
    if (this._audioPlayer && albumId !== this.state.playingId) {
      this._audioPlayer.pause();
      this._audioPlayer = null;
    }

    if (!this._audioPlayer) {
      fetch(`${SPOTIFY_API}/albums/${albumId}`)
        .then(response => response.json())
        .then(({ tracks: { items } }) => {
          /* eslint-disable camelcase */
          const { preview_url, name, duration_ms } = items[getRandomInt({ min: 0, max: items.length - 1 })];

          this._audioPlayer = new Audio(preview_url);
          this._audioPlayer.play();
          this._audioPlayer.addEventListener('ended', this._stopPlayer);

          this._audioPlayer.addEventListener('canplay', () => {
            this.setState({ playingId: albumId, songName: name, songDuration: duration_ms, paused: false });
          });

          this.setState({ fetching: false });
        })
        .catch(err => console.log(err));

      this.setState({ fetching: true });
    } else if (this._audioPlayer.paused) {
      this._audioPlayer.play();
      this.setState({ paused: false });
    } else {
      this._audioPlayer.pause();
      this.setState({ paused: true });
    }
  };

  render() {
    const { artists, albums, playingId, songName, songDuration, artist, paused, value } = this.state;

    let helpText, artistText;
    if (artist) {
      helpText = (
        <h5 className="md-subheading-1" key="help">
          Click on an album to play a random 30 second song preview from that album.
        </h5>
      );

      artistText = <h6 className="md-title">Artist: {artist}</h6>;
    }
    return (
      <div className="spotify-example">
        <Autocomplete
          id="searchSpotify"
          type="search"
          label="Type an artist name"
          data={artists}
          dataLabel="name"
          dataValue="id"
          filter={null}
          onChange={this._handleChange}
          value={value}
          fullWidth
          onMenuOpen={this._startLazyLoad}
          onAutocomplete={this._fetchArtistAlbums}
        />
        {helpText}
        {artistText}
        <CSSTransitionGroup
          component="output"
          className="md-card-list around"
          transitionName="upload"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
          onClick={this._handleListClick}
          onKeyDown={this._handleListKeyDown}
        >
          {albums.map(album => {
            const props = {
              key: album.id,
              playing: album.id === playingId,
              paused,
              ...album,
            };

            if (props.playing) {
              props.songName = songName;
              props.songDuration = songDuration;
            }

            return <SpotifyAlbum {...props} />;
          })}
        </CSSTransitionGroup>
      </div>
    );
  }
}
