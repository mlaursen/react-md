import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Dialog from 'react-md/lib/Dialogs';

import './_styles.scss';

import fetchSpotify from 'actions/fetchSpotify';
import sort from 'utils/ListUtils/sort';

import More from './More';
import MusicToolbar from './MusicToolbar';
import HomeReleaseCard from './HomeReleaseCard';
import HomeTopTrackCard from './HomeTopTrackCard';
import TopArtists from './TopArtists';
import TopAlbums from './TopAlbums';
import NewReleases from './NewReleases';
import TopSongs from './TopSongs';

export default class MusicTabExample extends PureComponent {
  state = {
    activeTabIndex: 0,
    newReleases: [],
    topTracks: [],
    artists: [],
    visible: false,
  };

  componentWillMount() {
    this._fetchBTBAMRelated().then(this._fetchTopAlbumTopTracksFromTop3).then(({ albums, tracks, artists }) => {
      this.setState({ newReleases: albums, topTracks: tracks, artists });
    });
  }

  _openStore = () => {
    this.setState({ visible: true });
  };

  _closeStore = () => {
    this.setState({ visible: false });
  };

  _handleTabChange = (activeTabIndex) => {
    this.setState({ activeTabIndex });
  };

  _showNewReleases = () => {
    this.setState({ activeTabIndex: 3 });
  };

  _showTopSongs = () => {
    this.setState({ activeTabIndex: 4 });
  };

  _fetchBTBAMRelated() {
    return fetchSpotify.search('between the buried and me', 1)
      .then(btbam => fetchSpotify.getRelatedArtists(btbam.id)
        .then(artists => sort([btbam].concat(artists), 'popularity'))
      );
  }

  _fetchTopAlbumTopTracksFromTop3 = (artists) => Promise.all([this._fetchAlbumFromTop3(artists), this._fetchTrackFromTop3(artists)])
    .then(([albums, tracks]) => ({ albums, tracks, artists }));

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

  _setTabsContainer = (tabsContainer) => {
    this._tabsContainer = tabsContainer;
  };

  _forceHeightCalculation = () => {
    if (this._tabsContainer) {
      this._tabsContainer.forceUpdate();
    }
  };

  render() {
    const { activeTabIndex, newReleases, topTracks, artists } = this.state;

    return (
      <div>
        <Button raised secondary onClick={this._openStore}>
          Open Music Store
        </Button>
        <Dialog
          id="music-store"
          aria-label="Fake Music Store"
          visible={this.state.visible}
          fullPage
        >
          <TabsContainer
            colored
            fixed
            toolbar={<MusicToolbar onCloseClick={this._closeStore} />}
            activeTabIndex={activeTabIndex}
            onTabChange={this._handleTabChange}
            ref={this._setTabsContainer}
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
                <TopAlbums active={activeTabIndex === 2} artists={artists} onLoad={this._forceHeightCalculation} />
              </Tab>
              <Tab label="New Releases">
                <NewReleases active={activeTabIndex === 3} artists={artists} onLoad={this._forceHeightCalculation} />
              </Tab>
              <Tab label="Top Songs">
                <TopSongs active={activeTabIndex === 4} artists={artists} onLoad={this._forceHeightCalculation} />
              </Tab>
            </Tabs>
          </TabsContainer>
        </Dialog>
      </div>
    );
  }
}
