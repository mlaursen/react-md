import {
  Card,
  CardContent,
  CardTitle,
  ResponsiveItemContainer,
  ResponsiveItemOverlay,
  Typography,
} from "@react-md/core";
import { type ReactElement } from "react";

export default function CardWithMediaExample(): ReactElement {
  return (
    <Card>
      <ResponsiveItemContainer fullWidth>
        <img src="https://picsum.photos/600/337?image=402" alt="" />
        <ResponsiveItemOverlay>
          <CardTitle>Wow</CardTitle>
        </ResponsiveItemOverlay>
      </ResponsiveItemContainer>
      <CardContent>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
          eleifend odio. Vivamus quis quam eget augue facilisis laoreet. Aliquam
          egestas turpis pellentesque cursus porta. Vivamus nisl odio, maximus
          vel lacinia non, suscipit quis nibh. Sed et lacus tempor, interdum
          nisl ornare, feugiat arcu. Suspendisse aliquam malesuada dui, in
          dignissim velit maximus vitae. Cras ac mattis libero. Proin feugiat
          justo nec nisi sodales, et gravida augue faucibus. Maecenas quis
          porttitor nunc. Suspendisse congue ipsum arcu, id aliquam ante
          dignissim non. Donec maximus, sapien in faucibus molestie, eros nisi
          ornare neque, et vulputate augue velit vel ante. Phasellus rhoncus,
          elit cursus accumsan viverra, mi lectus dictum elit, non vehicula diam
          nunc non lectus. Sed elementum, risus eget fermentum accumsan, nunc
          ante commodo diam, eget pulvinar risus velit eu sapien. Nunc vitae
          pellentesque nisl.
        </Typography>
        <Typography>
          Maecenas lacinia enim ut risus pellentesque euismod. Vestibulum
          gravida, risus non condimentum volutpat, orci elit laoreet elit, in
          auctor eros orci non quam. Proin ut tellus et est dignissim efficitur.
          Aliquam erat volutpat. Proin pellentesque metus sit amet libero auctor
          aliquet. Donec scelerisque erat in magna sagittis hendrerit. Sed
          pulvinar enim mattis mauris sodales semper. Mauris eu urna at arcu
          dapibus pretium et in ligula. Sed vel vestibulum nunc.
        </Typography>
      </CardContent>
    </Card>
  );
}
