/* eslint-disable camelcase */
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { MediaContainer, MediaOverlay } from "@react-md/media";
import { CircularProgress } from "@react-md/progress";
import { Typography } from "@react-md/typography";
import { GridList, GridListCell } from "@react-md/utils";

import { randomInt } from "utils/random";

interface Item {
  name: string;
  url: string;
}

interface State {
  loading: boolean;
  data: Item[];
}

interface PicsumPhotoItem {
  format: string;
  height: number;
  width: number;
  filename: string;
  id: number;
  author: string;
  author_url: string;
  post_url: string;
}

export default function Content2(): ReactElement {
  const [{ loading, data }, setState] = useState<State>({
    loading: false,
    data: [],
  });

  useEffect(() => {
    let cancelled = false;

    setState({ loading: true, data: [] });
    (async function load() {
      const response = await fetch("https://picsum.photos/list");
      const result = await response.json();
      const list = result as PicsumPhotoItem[];
      const start = randomInt({ min: 0, max: 20 });
      const total = randomInt({ min: 6, max: 14 });
      const data = list.slice(start, start + total).map(({ author, id }) => ({
        name: author,
        url: `https://picsum.photos/250?image=${id}`,
      }));
      if (!cancelled) {
        setState({
          data,
          loading: false,
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Typography type="headline-4">Tab 2 Content</Typography>
      <GridList maxCellSize={250}>
        {loading && <CircularProgress id="loading-tab-2" />}
        {data.map(({ name, url }) => (
          <GridListCell key={url} square clone>
            <MediaContainer>
              <img src={url} alt="" />
              <MediaOverlay>
                <Typography margin="none">{name}</Typography>
              </MediaOverlay>
            </MediaContainer>
          </GridListCell>
        ))}
      </GridList>
    </>
  );
}
