import { Avatar } from "@react-md/avatar";
import { Button } from "@react-md/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "@react-md/card";
import { Box, Collapse, Typography } from "@react-md/core";
import { IconRotator } from "@react-md/icon";
import { List, ListItem } from "@react-md/list";
import EmailIcon from "@react-md/material-icons/EmailIcon";
import KeyboardArrowDownIcon from "@react-md/material-icons/KeyboardArrowDownIcon";
import PhoneIcon from "@react-md/material-icons/PhoneIcon";
import {
  VisualMediaContainer,
  VisualMediaOverlay,
} from "@react-md/visual-media";
import type { ReactElement } from "react";
import { useState } from "react";
import { DemoHeadingWithDivider } from "src/components/DemoHeadingWithDivider";
import { Resettable } from "src/components/Resettable";

export default function CardPage(): ReactElement {
  const [expanded, setExpanded] = useState(false);
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider margin="none">
          Simple Example
        </DemoHeadingWithDivider>
        <Card>
          <CardHeader>
            <CardTitle>Main Title</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography margin="none">
              Duis lacinia lectus sed enim placerat, non consequat arcu
              tincidunt. Pellentesque vel condimentum lorem. Cras et arcu nibh.
              Cras euismod lectus commodo finibus facilisis. Sed ullamcorper
              odio sed scelerisque semper. Donec sollicitudin lorem eget
              tincidunt efficitur. Aenean sit amet tempus lacus, sit amet semper
              justo. Sed quis suscipit ante. Etiam aliquam risus eu laoreet
              placerat.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Main Title</CardTitle>
            <CardSubtitle>Subtitle</CardSubtitle>
          </CardHeader>
          <CardContent>
            <Typography margin="none">
              Duis pellentesque, ligula vel convallis tincidunt, arcu enim
              cursus leo, sit amet euismod eros tellus vel nisi. Quisque
              ultrices elementum nisi id pulvinar. Vivamus ac posuere mauris,
              vitae aliquet massa. Donec semper vestibulum odio sit amet
              aliquam. Nullam sed pellentesque risus, condimentum vulputate
              quam. Donec sed lacinia nisl. Donec convallis risus a placerat
              pellentesque.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader beforeAddon={<Avatar>A</Avatar>}>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardHeader beforeAddon={<Avatar>A</Avatar>}>
            <CardTitle>Card Title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
          </CardHeader>
          <CardContent>
            <Typography margin="none">
              Proin eget lacinia sem. Curabitur viverra, ex ac vulputate
              malesuada, risus justo pharetra lectus, id gravida metus diam et
              nisi. Fusce semper eu magna sit amet interdum. Phasellus fringilla
              in elit auctor sodales. Interdum et malesuada fames ac ante ipsum
              primis in faucibus. Sed facilisis enim ut leo euismod dapibus.
              Curabitur neque urna, ullamcorper ac nibh in, vehicula varius
              orci. Nunc lacinia magna eget dolor eleifend, eu dapibus lacus
              suscipit. Pellentesque sollicitudin mi sagittis magna fringilla
              luctus sit amet quis elit. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia Curae; Cras
              congue nunc elit, ac commodo orci laoreet at. Quisque libero erat,
              ultricies quis neque ut, blandit laoreet nibh. Phasellus sagittis
              lobortis ipsum, vitae maximus quam auctor sit amet. Quisque ut
              lobortis purus.
            </Typography>
          </CardContent>
        </Card>
        <Card bordered>
          <CardHeader beforeAddon={<Avatar>A</Avatar>}>
            <CardTitle>Bordered Card</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography margin="none">
              Maecenas eleifend, ligula rhoncus blandit molestie, magna nulla
              aliquet neque, non efficitur felis mi sed lorem. Suspendisse sed
              pharetra nulla, mattis cursus odio. Proin molestie augue quis
              pharetra euismod. Donec vulputate mattis velit, a pellentesque
              metus consequat in. Duis aliquam vitae magna at aliquam.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. In hac habitasse platea
              dictumst. Integer facilisis vel mauris non lobortis. Cras cursus
              semper gravida. Morbi a scelerisque ante. Aenean sed justo nec
              justo rutrum pretium. In hac habitasse platea dictumst. Proin nibh
              massa, scelerisque sed mauris vel, dictum faucibus tortor. Cras
              elit eros, scelerisque a accumsan eget, vulputate sed nisi.
            </Typography>
          </CardContent>
        </Card>
        <DemoHeadingWithDivider>With Media</DemoHeadingWithDivider>
        <Card>
          <VisualMediaContainer fullWidth>
            <img src="https://picsum.photos/600/337?image=402" alt="" />
            <VisualMediaOverlay>
              <CardTitle>Wow</CardTitle>
            </VisualMediaOverlay>
          </VisualMediaContainer>
          <CardContent>
            <Typography margin="none">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
              eleifend odio. Vivamus quis quam eget augue facilisis laoreet.
              Aliquam egestas turpis pellentesque cursus porta. Vivamus nisl
              odio, maximus vel lacinia non, suscipit quis nibh. Sed et lacus
              tempor, interdum nisl ornare, feugiat arcu. Suspendisse aliquam
              malesuada dui, in dignissim velit maximus vitae. Cras ac mattis
              libero. Proin feugiat justo nec nisi sodales, et gravida augue
              faucibus. Maecenas quis porttitor nunc. Suspendisse congue ipsum
              arcu, id aliquam ante dignissim non. Donec maximus, sapien in
              faucibus molestie, eros nisi ornare neque, et vulputate augue
              velit vel ante. Phasellus rhoncus, elit cursus accumsan viverra,
              mi lectus dictum elit, non vehicula diam nunc non lectus. Sed
              elementum, risus eget fermentum accumsan, nunc ante commodo diam,
              eget pulvinar risus velit eu sapien. Nunc vitae pellentesque nisl.
            </Typography>
            <Typography margin="top">
              Maecenas lacinia enim ut risus pellentesque euismod. Vestibulum
              gravida, risus non condimentum volutpat, orci elit laoreet elit,
              in auctor eros orci non quam. Proin ut tellus et est dignissim
              efficitur. Aliquam erat volutpat. Proin pellentesque metus sit
              amet libero auctor aliquet. Donec scelerisque erat in magna
              sagittis hendrerit. Sed pulvinar enim mattis mauris sodales
              semper. Mauris eu urna at arcu dapibus pretium et in ligula. Sed
              vel vestibulum nunc.
            </Typography>
          </CardContent>
        </Card>
        <DemoHeadingWithDivider>With Actions</DemoHeadingWithDivider>
        <Card raisable>
          <CardHeader>
            <CardTitle>This is a title</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography>
              Sed molestie finibus varius. Maecenas tincidunt eu quam eget
              sodales. Fusce ut lacus luctus, aliquam erat eu, fringilla libero.
              Nulla rhoncus mi nec orci ultricies ultricies. Aenean et hendrerit
              velit. Curabitur condimentum a tortor sit amet porttitor. Sed ut
              neque eget massa feugiat ullamcorper. Sed quis vulputate mi,
              imperdiet egestas diam. Nullam rutrum nisl sed mi posuere commodo.
              Nulla eleifend interdum euismod. Suspendisse sit amet rutrum
              lorem, nec aliquet tellus. Nam non massa imperdiet, vehicula diam
              nec, efficitur turpis. In non suscipit tellus. Vivamus ac volutpat
              velit, sit amet faucibus nisi. Pellentesque condimentum dignissim
              augue, sit amet porta ipsum feugiat nec.
            </Typography>
          </CardContent>
          <CardFooter>
            <Button>Action 1</Button>
            <Button>Action 2</Button>
          </CardFooter>
        </Card>
        <DemoHeadingWithDivider>Expandable Card</DemoHeadingWithDivider>
        <Card fullWidth style={{ maxWidth: "20rem" }}>
          <VisualMediaContainer fullWidth>
            <img src="https://picsum.photos/300/200?image=1011" alt="" />
          </VisualMediaContainer>
          <CardHeader
            beforeAddon={<Avatar src="https://picsum.photos/40?image=1011" />}
            afterAddon={
              <Button
                buttonType="icon"
                aria-label="Expand"
                theme="clear"
                style={{ gridArea: "addon-2" }}
                onClick={() => setExpanded((e) => !e)}
              >
                <IconRotator rotated={expanded}>
                  <KeyboardArrowDownIcon />
                </IconRotator>
              </Button>
            }
          >
            <CardTitle>Elizabeth Park</CardTitle>
            <CardSubtitle>Work contact</CardSubtitle>
          </CardHeader>
          <Collapse collapsed={!expanded}>
            <List>
              <ListItem leftAddon={<PhoneIcon />} secondaryText="Mobile">
                (000) 000-0000
              </ListItem>
              <ListItem leftAddon={<EmailIcon />} secondaryText="Work">
                heyfromelizabeth@gmail.com
              </ListItem>
            </List>
          </Collapse>
        </Card>
      </Box>
    </Resettable>
  );
}
