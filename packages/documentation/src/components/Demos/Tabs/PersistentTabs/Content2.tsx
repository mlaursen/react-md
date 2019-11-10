import React, { FC, useState, useEffect } from "react";
import { Text } from "@react-md/typography";
import { TabPanelProps, TabPanel } from "@react-md/tabs";
import { GridList, GridListCell } from "@react-md/utils";
import { CircularProgress } from "@react-md/progress";
import { MediaContainer, MediaOverlay } from "@react-md/media";
import { randomInt } from "utils/random";
import { CrossFade } from "@react-md/transition";

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

const Content2: FC<TabPanelProps> = props => {
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
    <TabPanel {...props}>
      <Text type="headline-4">Tab 2 Content</Text>
      <GridList maxCellSize={250}>
        {loading && <CircularProgress id="loading-tab-2" />}
        {data.map(({ name, url }) => (
          <GridListCell key={url} square clone>
            <MediaContainer>
              <img src={url} alt="" />
              <MediaOverlay>
                <Text margin="none">{name}</Text>
              </MediaOverlay>
            </MediaContainer>
          </GridListCell>
        ))}
      </GridList>
    </TabPanel>
  );
};

export default Content2;
