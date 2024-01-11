"use client";
import {
  Box,
  Button,
  CircularProgressSuspense,
  Typography,
  useToggle,
  wait,
} from "@react-md/core";
import { use, type ReactElement } from "react";

// Note: This is a copy of the suspense codesandbox provided by react:
// https://codesandbox.io/p/sandbox/restless-waterfall-7hzg5z
// Check out the codesandbox for more information around suspense

export default function CircularProgressSuspenseExample(): ReactElement {
  const { toggled, enable } = useToggle();

  if (toggled) {
    return <ArtistPage artist={{ id: "the-beatles", name: "The Beatles" }} />;
  }

  return <Button onClick={enable}>Load</Button>;
}

interface Artist {
  id: string;
  name: string;
}

interface ArtistPageProps {
  artist: Artist;
}

interface AlbumsProps {
  artistId: string;
}

interface ArtistAlbum {
  id: number;
  title: string;
  year: number;
}

type ArtistAlbums = readonly ArtistAlbum[];

function ArtistPage(props: ArtistPageProps): ReactElement {
  const { artist } = props;
  const { id, name } = artist;

  return (
    <Box stacked disablePadding align="start">
      <Typography type="headline-4" margin="none">
        {name}
      </Typography>
      <CircularProgressSuspense>
        <Albums artistId={id} />
      </CircularProgressSuspense>
    </Box>
  );
}

function Albums(props: AlbumsProps): ReactElement {
  const { artistId } = props;
  const albums = use(fetchData(`/${artistId}/albums`));

  return (
    <Typography type="subtitle-1" as="ul" margin="none">
      {albums.map((album) => {
        const { id, title, year } = album;
        return (
          <li key={id}>
            {title} ({year})
          </li>
        );
      })}
    </Typography>
  );
}

const cache = new Map<string, Promise<ArtistAlbums>>();

async function getAlbums(): Promise<ArtistAlbums> {
  // Add a fake delay to make waiting noticeable.
  await wait(3000);

  return [
    {
      id: 13,
      title: "Let It Be",
      year: 1970,
    },
    {
      id: 12,
      title: "Abbey Road",
      year: 1969,
    },
    {
      id: 11,
      title: "Yellow Submarine",
      year: 1969,
    },
    {
      id: 10,
      title: "The Beatles",
      year: 1968,
    },
    {
      id: 9,
      title: "Magical Mystery Tour",
      year: 1967,
    },
    {
      id: 8,
      title: "Sgt. Pepper's Lonely Hearts Club Band",
      year: 1967,
    },
    {
      id: 7,
      title: "Revolver",
      year: 1966,
    },
    {
      id: 6,
      title: "Rubber Soul",
      year: 1965,
    },
    {
      id: 5,
      title: "Help!",
      year: 1965,
    },
    {
      id: 4,
      title: "Beatles For Sale",
      year: 1964,
    },
    {
      id: 3,
      title: "A Hard Day's Night",
      year: 1964,
    },
    {
      id: 2,
      title: "With The Beatles",
      year: 1963,
    },
    {
      id: 1,
      title: "Please Please Me",
      year: 1963,
    },
  ];
}

async function getData(url: string): Promise<ArtistAlbums> {
  if (url === "/the-beatles/albums") {
    return getAlbums();
  }

  throw new Error("Not implemented");
}

async function fetchData(url: string): Promise<ArtistAlbums> {
  let found = cache.get(url);
  if (!found) {
    found = getData(url);
    cache.set(url, found);
  }

  return found;
}
