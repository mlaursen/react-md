import {
  AppBar,
  AppBarTitle,
  Button,
  Card,
  List,
  ListItem,
  type AppBarTitleKeyline,
} from "react-md";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import MenuIcon from "@react-md/material-icons/MenuIcon";
import MoreVertOutlinedIcon from "@react-md/material-icons/MoreVertOutlinedIcon";
import { type ReactElement, type ReactNode } from "react";

export default function AppBarTitleKeylineExample(): ReactElement {
  return (
    <>
      <Layout keyline="small">
        <AppBarTitle keyline="small">Small keyline</AppBarTitle>
      </Layout>
      <Layout keyline="nav">
        <AppBarTitle keyline="nav">Nav keyline</AppBarTitle>
      </Layout>
      <Layout keyline="list">
        <AppBarTitle keyline="list">List keyline</AppBarTitle>
      </Layout>
    </>
  );
}

export interface LayoutProps {
  keyline: AppBarTitleKeyline;
  children: ReactNode;
}

function Layout(props: LayoutProps): ReactElement {
  const { keyline, children } = props;

  const leftAddon = keyline !== "small" && <FavoriteIcon />;
  return (
    <Card fullWidth>
      <AppBar>
        {keyline === "nav" && (
          <Button aria-label="Menu" buttonType="icon">
            <MenuIcon />
          </Button>
        )}
        {children}
        <Button aria-label="Options" buttonType="icon">
          <MoreVertOutlinedIcon />
        </Button>
      </AppBar>
      <List>
        <ListItem leftAddon={leftAddon}>Item 1</ListItem>
        <ListItem leftAddon={leftAddon}>Item 2</ListItem>
        <ListItem leftAddon={leftAddon}>Item 3</ListItem>
      </List>
    </Card>
  );
}
