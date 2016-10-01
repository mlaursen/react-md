import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import { Card, CardTitle, CardMedia } from 'react-md/lib/Cards';
import { LinearProgress } from 'react-md/lib/Progress';
import FontIcon from 'react-md/lib/FontIcons';

const PROGRESS_INTERVAL = 15;
const PROGRESS_INCREMENT = 100 / (30000 / PROGRESS_INTERVAL);

@connect(({ ui }) => ({ ...ui.media }))
export default class SpotifyAlbum extends PureComponent {
  static propTypes = {
    // Spotify album props
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    })).isRequired,
    uri: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    album_type: PropTypes.string.isRequired,
    available_markets: PropTypes.arrayOf(PropTypes.string).isRequired,
    external_urls: PropTypes.object.isRequired,
    href: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,

    // From react-redux
    mobile: PropTypes.bool.isRequired,
    tablet: PropTypes.bool.isRequired,

    // Normal props
    paused: PropTypes.bool,
    playing: PropTypes.bool.isRequired,
    songName: PropTypes.string,
    songDuration: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = { progress: 0, hover: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playing && !this.props.playing) {
      this._interval && clearInterval(this._interval);

      this._interval = setInterval(this._updateProgress, PROGRESS_INTERVAL);
    } else if (!nextProps.playing && this.props.playing) {
      this._interval && clearInterval(this._interval);
      this._interval = null;
      this.setState({ progress: 0 });
    } else if (nextProps.paused && !this.props.paused) {
      clearInterval(this._interval);
      this._interval = null;
    } else if (!nextProps.paused && this.props.paused) {
      this._interval = setInterval(this._updateProgress, PROGRESS_INTERVAL);
    }
  }

  componentWillUnmount() {
    this._interval && clearInterval(this._interval);
  }

  formatTime(ms) {
    let seconds = Math.round(ms / 1000);
    const minutes = Math.floor(seconds / 60);

    seconds -= (minutes * 60);
    if (seconds.toString().length === 1) {
      seconds *= 10;
    }

    return `${minutes}:${seconds}`;
  }

  _updateProgress = () => {
    const progress = Math.min(100, this.state.progress + PROGRESS_INCREMENT);
    this.setState({ progress });
  };

  _handleMouseOver = () => this.setState({ hover: true });
  _handleMouseLeave = () => this.setState({ hover: false });

  render() {
    const { progress, hover } = this.state;
    const { id, images, mobile, playing, paused, songName, songDuration } = this.props;

    const img = images[(mobile && !playing ? 2 : 1)];
    let player;
    if (playing) {
      player = (
        <div key={`player-${songName}`}>
          <CardTitle title={songName} subtitle={this.formatTime(songDuration)} />
          <LinearProgress value={progress} key="progress" />
        </div>
      );
    }

    const style = {
      height: img.width,
      width: img.width,
    };

    let hoverIcon;
    if (hover || playing) {
      let icon;
      if (paused || (hover && !playing)) {
        icon = 'play_arrow';
      } else {
        icon = 'pause';
      }

      hoverIcon = <FontIcon key={icon} className="play-state">{icon}</FontIcon>;
    }

    return (
      <Card
        tabIndex={0}
        className="spotify-album"
        data-album-id={id}
        onMouseOver={this._handleMouseOver}
        onMouseLeave={this._handleMouseLeave}
      >
        <CardMedia forceAspect={false} overlay={player} style={style}>
          <img src={img.url} alt={`${name}'s album artwork'`} />
          <CSSTransitionGroup transitionName="play" transitionEnterTimeout={150} transitionLeaveTimeout={150}>
            {hoverIcon}
          </CSSTransitionGroup>
        </CardMedia>
      </Card>
    );
  }
}
