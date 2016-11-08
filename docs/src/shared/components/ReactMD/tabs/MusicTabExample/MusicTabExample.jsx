import React, { PureComponent } from 'react';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import CardTitle from 'react-md/lib/Cards/CardTitle';

import './_styles.scss';

import fetchSpotify from 'actions/fetchSpotify';
import sort from 'utils/ListUtils/sort';
import PhoneSizeDemo from 'containers/PhoneSizeDemo';

import More from './More';
import MusicToolbar from './MusicToolbar';
import HomeReleaseCard from './HomeReleaseCard';
import HomeTopTrackCard from './HomeTopTrackCard';
import TopArtists from './TopArtists';
import TopAlbums from './TopAlbums';
import NewReleases from './NewReleases';
import TopSongs from './TopSongs';

export default class MusicTabExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: 0,
      newReleases: [],
      topTracks: [],
      artists: [],
    };

    this._handleTabChange = this._handleTabChange.bind(this);
    this._showTopSongs = this._showTopSongs.bind(this);
    this._showNewReleases = this._showNewReleases.bind(this);
    this._fetchTopAlbumTopTracksFromTop3 = this._fetchTopAlbumTopTracksFromTop3.bind(this);
  }

  componentWillMount() {
    this._fetchBTAMRelated().then(this._fetchTopAlbumTopTracksFromTop3).then(({ albums, tracks, artists }) => {
      this.setState({ newReleases: albums, topTracks: tracks, artists });
    });
  }

  _handleTabChange(activeTabIndex) {
    this.setState({ activeTabIndex });
  }

  _showNewReleases() {
    this.setState({ activeTabIndex: 3 });
  }

  _showTopSongs() {
    this.setState({ activeTabIndex: 4 });
  }

  _fetchBTAMRelated() {
    return fetchSpotify.search('between the buried and me', 1)
      .then(btbam => fetchSpotify.getRelatedArtists(btbam.id)
        .then(artists => sort([btbam].concat(artists), 'popularity'))
      );
  }

  _fetchTopAlbumTopTracksFromTop3(artists) {
    return Promise.all([this._fetchAlbumFromTop3(artists), this._fetchTrackFromTop3(artists)])
      .then(([albums, tracks]) => ({ albums, tracks, artists }));
  }

  _fetchAlbumFromTop3(artists) {
    const prices = ['$9.99', '$5.99', '$9.49'];

    return Promise.all(artists.slice(0, 3).map(({ id }) => fetchSpotify.getArtistAlbums(id, 1)))
      .then(albums => albums.map((album, i) => ({
        artistId: artists[i].id,
        artistName: artists[i].name,
        albumId: album.id,
        albumName: album.name,
        albumPrice: prices[i],
        images: album.images,
      })));
  }

  _fetchTrackFromTop3(artists) {
    return Promise.all(artists.slice(0, 3).map(({ id }) => fetchSpotify.getArtistTopTracks(id, 1)))
      .then(tracks => tracks.map((track, i) => ({
        artistId: artists[i].id,
        trackId: track.id,
        trackName: track.name,
        trackNumber: track.track_number,
        images: track.album.images,
      })));
  }

  render() {
    const { activeTabIndex, newReleases, topTracks, artists } = this.state;

    return (
      <PhoneSizeDemo toolbar={false} mobileOnly>
        <TabsContainer
          colored
          toolbar={<MusicToolbar />}
          activeTabIndex={activeTabIndex}
          onTabChange={this._handleTabChange}
          panelStyle={{ overflowY: 'auto', maxHeight: 400 }}
        >
          <Tabs tabId="music">
            <Tab label="Home">
              <CardTitle
                title="New Releases"
                subtitle="Best-selling albums"
                style={{ padding: 16 }}
              >
                <More onClick={this._showNewReleases} />
              </CardTitle>
              <div className="md-grid">
                {newReleases.map(release => <HomeReleaseCard key={release.artistId} release={release} />)}
              </div>
              <CardTitle title="Top Metal Songs" style={{ padding: 16 }}>
                <More onClick={this._showTopSongs} />
              </CardTitle>
              <div className="md-grid">
                {topTracks.map(track => <HomeTopTrackCard key={track.trackId} track={track} />)}
              </div>
            </Tab>
            <Tab label="Top Artists">
              <TopArtists artists={artists} />
            </Tab>
            <Tab label="Top Albums">
              <TopAlbums active={activeTabIndex === 2} artists={artists} />
            </Tab>
            <Tab label="New Releases">
              <NewReleases active={activeTabIndex === 3} artists={artists} />
            </Tab>
            <Tab label="Top Songs">
              <TopSongs active={activeTabIndex === 4} artists={artists} />
            </Tab>
          </Tabs>
        </TabsContainer>
      </PhoneSizeDemo>
    );
  }
}
