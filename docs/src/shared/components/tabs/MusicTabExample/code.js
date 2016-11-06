import MusicTabExample from '!!raw!./MusicTabExample';
import HomeReleaseCard from '!!raw!./HomeReleaseCard';
import HomeTopTrackCard from '!!raw!./HomeTopTrackCard';
import TopArtists from '!!raw!./TopArtists';
import ArtistCard from '!!raw!./ArtistCard';
import TopAlbums from '!!raw!./TopAlbums';
import NewReleases from '!!raw!./NewReleases';
import TopSongs from '!!raw!./TopSongs';
import CardGrid from '!!raw!./CardGrid';
import AlbumCard from '!!raw!components/Spotify/AlbumCard';
import styles from '!!raw!./_styles.scss';

export default `
/* MusicTabExample.jsx */
${MusicTabExample}
\`\`\`

\`\`\`js
/* HomeReleaseCard.jsx */
${HomeReleaseCard}
\`\`\`

\`\`\`js
/* HomeTopTrackCard.jsx */
${HomeTopTrackCard}
\`\`\`

\`\`\`js
/* TopArtists.jsx */
${TopArtists}
\`\`\`

\`\`\`js
/* ArtistCard.jsx */
${ArtistCard}
\`\`\`

\`\`\`js
/* TopAlbums.jsx */
${TopAlbums}
\`\`\`

\`\`\`js
/* NewReleases.jsx */
${NewReleases}
\`\`\`

\`\`\`js
/* TopSongs.jsx */
${TopSongs}
\`\`\`

\`\`\`js
/* CardGrid.jsx */
${CardGrid}
\`\`\`

\`\`\`js
/* AlbumCard.jsx */
${AlbumCard}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
`;
