import { Avatar } from "@react-md/avatar";
import { Box, TextContainer, Typography, useColorScheme } from "@react-md/core";
import { Divider } from "@react-md/divider";
import { List, ListItem, ListSubheader } from "@react-md/list";
import { DeleteIcon } from "@react-md/material-icons/filled/action/DeleteIcon";
import { ArchiveIcon } from "@react-md/material-icons/filled/content/ArchiveIcon";
import { FolderIcon } from "@react-md/material-icons/filled/file/FolderIcon";
import { AdjustIcon } from "@react-md/material-icons/filled/image/AdjustIcon";
import { AppsIcon } from "@react-md/material-icons/filled/navigation/AppsIcon";
import { ArrowBackIcon } from "@react-md/material-icons/filled/navigation/ArrowBackIcon";
import { StarIcon } from "@react-md/material-icons/filled/toggle/StarIcon";
import type { CSSProperties, ReactElement } from "react";

const style = {
  "--rmd-ripple-background-color": "rgba(255, 255, 255, 0.3)",
  "--rmd-interaction-hover-background-color": "rgba(255, 255, 255, 0.08)",
  "--rmd-interaction-focus-background-color": "rgba(255, 255, 255, 0.24)",
} as CSSProperties;

export default function ListPage(): ReactElement {
  const { colorSchemeMode } = useColorScheme();
  return (
    <TextContainer>
      <Box
        style={colorSchemeMode === "light" ? undefined : style}
        flexDirection="column"
        alignItems="stretch"
      >
        <List>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
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
            leftAddon={<Avatar src="https://picsum.photos/40?image=844" />}
            leftAddonType="avatar"
            rightAddon={<DeleteIcon />}
          >
            Preston Phillips
          </ListItem>
          <ListItem
            leftAddon={<AdjustIcon />}
            rightAddon={<Avatar src="https://picsum.photos/40?image=553" />}
            rightAddonType="avatar"
          >
            Marco Sherman
          </ListItem>
        </List>
        <List>
          <ListItem
            leftAddon={<img src="https://picsum.photos/56?image=700" alt="" />}
            leftAddonType="media"
          >
            With a graphic
          </ListItem>
          <ListItem
            leftAddon={
              <img src="https://picsum.photos/100/56?image=800" alt="" />
            }
            leftAddonType="large-media"
          >
            With a large graphic
          </ListItem>
          <ListItem
            rightAddon={<img src="https://picsum.photos/56?image=700" alt="" />}
            rightAddonType="media"
          >
            With a graphic
          </ListItem>
          <ListItem
            id="media-item-3"
            rightAddon={
              <img src="https://picsum.photos/100/56?image=800" alt="" />
            }
            rightAddonType="large-media"
          >
            With a large graphic
          </ListItem>
        </List>
        <List>
          <ListItem
            leftAddon={<AppsIcon />}
            disabled
            rightAddon={<Avatar src="https://picsum.photos/40?image=553" />}
            rightAddonType="avatar"
          >
            Disabled
          </ListItem>
          <ListItem
            leftAddon={<AppsIcon />}
            disabled
            disabledOpacity
            rightAddon={<Avatar src="https://picsum.photos/40?image=553" />}
            rightAddonType="avatar"
          >
            Disabled with opacity
          </ListItem>
          <ListItem
            leftAddon={<AppsIcon />}
            disabled
            rightAddon={<img src="https://picsum.photos/56?image=700" alt="" />}
            rightAddonType="media"
          >
            Disabled
          </ListItem>
          <ListItem
            leftAddon={<AppsIcon />}
            disabled
            disabledOpacity
            rightAddon={<img src="https://picsum.photos/56?image=700" alt="" />}
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
            leftAddon={<img src="https://picsum.photos/40?image=1000" alt="" />}
            leftAddonType="media"
            rightAddon={<StarIcon />}
            rightAddonPosition="top"
            secondaryText="I'll be in your neighborhood sometimes this week. Would you like to try brunch this weekend?"
            threeLines
          >
            Brunch this weekend?
          </ListItem>
          <ListItem
            leftAddon={<img src="https://picsum.photos/40?image=1001" alt="" />}
            leftAddonType="media"
            rightAddon={<StarIcon />}
            rightAddonPosition="top"
            secondaryText="Wish I could come, but I'm out of town this weekend"
            threeLines
          >
            Summer BBQ
          </ListItem>
          <ListItem
            leftAddon={<img src="https://picsum.photos/40?image=1002" alt="" />}
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
