import React, { FC } from "react";
import { Avatar } from "@react-md/avatar";
import {
  Card,
  CardContent,
  CardTitle,
  CardSubtitle,
  CardHeader,
} from "@react-md/card";
import { Text } from "@react-md/typography";
import Container from "./Container";

const SimpleExample: FC = () => (
  <Container>
    <Card>
      <CardHeader>
        <CardTitle>Main Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Text>
          Duis lacinia lectus sed enim placerat, non consequat arcu tincidunt.
          Pellentesque vel condimentum lorem. Cras et arcu nibh. Cras euismod
          lectus commodo finibus facilisis. Sed ullamcorper odio sed scelerisque
          semper. Donec sollicitudin lorem eget tincidunt efficitur. Aenean sit
          amet tempus lacus, sit amet semper justo. Sed quis suscipit ante.
          Etiam aliquam risus eu laoreet placerat.
        </Text>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Main Title</CardTitle>
        <CardSubtitle>Subtitle</CardSubtitle>
      </CardHeader>
      <CardContent>
        <Text>
          Duis pellentesque, ligula vel convallis tincidunt, arcu enim cursus
          leo, sit amet euismod eros tellus vel nisi. Quisque ultrices elementum
          nisi id pulvinar. Vivamus ac posuere mauris, vitae aliquet massa.
          Donec semper vestibulum odio sit amet aliquam. Nullam sed pellentesque
          risus, condimentum vulputate quam. Donec sed lacinia nisl. Donec
          convallis risus a placerat pellentesque.
        </Text>
      </CardContent>
    </Card>
    <Card>
      <CardHeader beforeChildren={<Avatar>A</Avatar>}>
        <CardTitle>Card Title</CardTitle>
        <CardSubtitle>Card subtitle</CardSubtitle>
      </CardHeader>
      <CardContent>
        <Text>
          Proin eget lacinia sem. Curabitur viverra, ex ac vulputate malesuada,
          risus justo pharetra lectus, id gravida metus diam et nisi. Fusce
          semper eu magna sit amet interdum. Phasellus fringilla in elit auctor
          sodales. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Sed facilisis enim ut leo euismod dapibus. Curabitur neque urna,
          ullamcorper ac nibh in, vehicula varius orci. Nunc lacinia magna eget
          dolor eleifend, eu dapibus lacus suscipit. Pellentesque sollicitudin
          mi sagittis magna fringilla luctus sit amet quis elit. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          Curae; Cras congue nunc elit, ac commodo orci laoreet at. Quisque
          libero erat, ultricies quis neque ut, blandit laoreet nibh. Phasellus
          sagittis lobortis ipsum, vitae maximus quam auctor sit amet. Quisque
          ut lobortis purus.
        </Text>
      </CardContent>
    </Card>
  </Container>
);

export default SimpleExample;
