import React, { PureComponent, PropTypes } from 'react';

import fetchSpotify from 'actions/fetchSpotify';
import sort from 'utils/ListUtils/sort';
import flatten from 'utils/ListUtils/flatten';

import AlbumCard from 'components/Spotify/AlbumCard';
import CardGrid from './CardGrid';

const today = new Date();
const twoMonthsAgo = new Date(new Date().setMonth(today.getMonth() - 2)).getTime();

export default class NewReleases extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    artists: PropTypes.arrayOf(PropTypes.object).isRequired,
    onLoad: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { releases: [] };
    this._fetching = false;
    this._getNewReleases = this._getNewReleases.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this._fetching && nextProps.active && !this.state.releases.length) {
      this._getNewReleases();
    }
  }

  _getArtistAlbums(artist) {
    return fetchSpotify.getArtistAlbums(artist.id)
      .then(albums => Promise.all(albums.slice(0, 5).map(album => fetchSpotify.getAlbum(album.id))));
  }

  _getNewReleases() {
    this._fetching = true;
    Promise.all(this.props.artists.slice(0, 5).map(this._getArtistAlbums))
      .then(albums => {
        const releases = sort(
          flatten(albums).filter(({ release_date: releaseDate }) => new Date(releaseDate).getTime() > twoMonthsAgo),
          'release_date'
        );
        this.setState({ releases }, this.props.onLoad);
      });
  }

  render() {
    return (
      <CardGrid>
        {this.state.releases.map(release => <AlbumCard key={release.id} album={release} />)}
      </CardGrid>
    );
  }
}
