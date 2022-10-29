import { Avatar } from "@react-md/avatar";
import Image from "next/image";
import {
  Box,
  SkeletonPlaceholder,
  TextContainer,
  Typography,
} from "@react-md/core";
import { List, ListItem, ListSubheader } from "@react-md/list";
import AdjustIcon from "@react-md/material-icons/AdjustIcon";
import AppsIcon from "@react-md/material-icons/AppsIcon";
import ArchiveIcon from "@react-md/material-icons/ArchiveIcon";
import ArrowBackIcon from "@react-md/material-icons/ArrowBackIcon";
import DeleteIcon from "@react-md/material-icons/DeleteIcon";
import FolderIcon from "@react-md/material-icons/FolderIcon";
import StarIcon from "@react-md/material-icons/StarIcon";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

import largeGraphic from "src/pexels/pexels-lumn-167699-100x56.jpg";
import { loremIpsum } from "src/utils/loremIpsum";
import styles from "./list.module.scss";

export default function ListPage(): ReactElement {
  const [loaded, setLoaded] = useState<
    { image: string; primaryText: string; secondaryText: string } | undefined
  >();

  useEffect(() => {
    let timeout: number;
    if (loaded) {
      timeout = window.setTimeout(() => {
        setLoaded(undefined);
      }, 8000);
    } else {
      timeout = window.setTimeout(() => {
        setLoaded({
          image: "https://i.pravatar.cc/56?img=68",
          primaryText: loremIpsum({ minWords: 4, maxWords: 10 }),
          secondaryText: loremIpsum({ minWords: 1, maxWords: 5 }),
        });
      }, 3000);
    }

    return () => {
      window.clearTimeout(timeout);
    };
  }, [loaded]);
  return (
    <TextContainer>
      <Box stacked align="stretch">
        <List>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
          <ListItem
            leftAddon={
              loaded ? (
                <img src={loaded.image} alt="" />
              ) : (
                <SkeletonPlaceholder height="3.5rem" width="3.5rem" />
              )
            }
            leftAddonType="media"
            primaryText={
              <SkeletonPlaceholder>{loaded?.primaryText}</SkeletonPlaceholder>
            }
            secondaryText={
              <SkeletonPlaceholder minPercentage={10} maxPercentage={30}>
                {loaded?.secondaryText}
              </SkeletonPlaceholder>
            }
            textClassName={cnb(!loaded && styles.placeholderText)}
            secondaryTextClassName={cnb(
              !loaded && styles.placeholderSecondaryText
            )}
          />
          <ListItem primaryText="Item 5" secondaryText="Sub text" />
        </List>
        <List>
          <ListItem leftAddon={<AppsIcon />}>Apps</ListItem>
          <ListItem rightAddon={<ArchiveIcon />}>Archive</ListItem>
          <ListItem leftAddon={<ArrowBackIcon />} rightAddon={<ArchiveIcon />}>
            Go Back and Archive
          </ListItem>
        </List>
        <List>
          <ListItem
            leftAddon={<Avatar src="https://i.pravatar.cc/40?img=58" />}
            leftAddonType="avatar"
            rightAddon={<DeleteIcon />}
          >
            Preston Phillips
          </ListItem>
          <ListItem
            leftAddon={<AdjustIcon />}
            rightAddon={<Avatar src="https://i.pravatar.cc/40?img=55" />}
            rightAddonType="avatar"
          >
            Marco Sherman
          </ListItem>
        </List>
        <List>
          <ListItem
            leftAddon={<img src="https://i.pravatar.cc/56?img=44" alt="" />}
            leftAddonType="media"
          >
            With a graphic
          </ListItem>
          <ListItem
            leftAddon={<Image src={largeGraphic} alt="" />}
            leftAddonType="large-media"
          >
            With a large graphic
          </ListItem>
          <ListItem
            rightAddon={<img src="https://i.pravatar.cc/56?img=44" alt="" />}
            rightAddonType="media"
          >
            With a graphic
          </ListItem>
          <ListItem
            id="media-item-3"
            rightAddon={<Image src={largeGraphic} alt="" />}
            rightAddonType="large-media"
          >
            With a large graphic
          </ListItem>
        </List>
        <List>
          <ListItem
            leftAddon={<AppsIcon />}
            disabled
            rightAddon={<Avatar src="https://i.pravatar.cc/56?img=20" />}
            rightAddonType="avatar"
          >
            Disabled
          </ListItem>
          <ListItem
            leftAddon={<AppsIcon />}
            disabled
            disabledOpacity
            rightAddon={<Avatar src="https://i.pravatar.cc/56?img=20" />}
            rightAddonType="avatar"
          >
            Disabled with opacity
          </ListItem>
          <ListItem
            leftAddon={<AppsIcon />}
            disabled
            rightAddon={<img src="https://i.pravatar.cc/56?img=20" alt="" />}
            rightAddonType="media"
          >
            Disabled
          </ListItem>
          <ListItem
            leftAddon={<AppsIcon />}
            disabled
            disabledOpacity
            rightAddon={<img src="https://i.pravatar.cc/56?img=20" alt="" />}
            rightAddonType="media"
          >
            Disabled with opacity
          </ListItem>
        </List>
        <Typography type="headline-4" margin="top">
          Two Line
        </Typography>
        <List>
          <ListSubheader>Folders</ListSubheader>
          <ListItem
            leftAddon={
              <Avatar color="blue">
                <FolderIcon />
              </Avatar>
            }
            leftAddonType="avatar"
            secondaryText="Jan 04, 2019"
          >
            Photos
          </ListItem>
          <ListItem
            leftAddon={
              <Avatar color="green">
                <FolderIcon />
              </Avatar>
            }
            leftAddonType="avatar"
            secondaryText="Jun 17, 2022"
          >
            Recipes
          </ListItem>
          <ListItem
            leftAddon={
              <Avatar color="red">
                <FolderIcon />
              </Avatar>
            }
            leftAddonType="avatar"
            secondaryText="Jun 17, 2022"
          >
            Work
          </ListItem>
        </List>
        <Typography type="headline-4" margin="top">
          Three Line
        </Typography>
        <List style={{ maxWidth: "30rem" }}>
          <ListItem
            leftAddon={<img src="https://i.pravatar.cc/56?img=54" alt="" />}
            leftAddonType="media"
            rightAddon={<StarIcon />}
            rightAddonPosition="top"
            secondaryText="I'll be in your neighborhood sometimes this week. Would you like to try brunch this weekend?"
            threeLines
          >
            Brunch this weekend?
          </ListItem>
          <ListItem
            leftAddon={<img src="https://i.pravatar.cc/56?img=1" alt="" />}
            leftAddonType="media"
            rightAddon={<StarIcon />}
            rightAddonPosition="top"
            secondaryText="Wish I could come, but I'm out of town this weekend"
            threeLines
          >
            Summer BBQ
          </ListItem>
          <ListItem
            leftAddon={<img src="https://i.pravatar.cc/56?img=8" alt="" />}
            leftAddonType="media"
            rightAddon={<StarIcon />}
            rightAddonPosition="top"
            secondaryText="Scott Stirling. The Man. The Myth. The Legend."
            threeLines
          >
            {"See your video? You're a legend!"}
          </ListItem>
        </List>
      </Box>
    </TextContainer>
  );
}
