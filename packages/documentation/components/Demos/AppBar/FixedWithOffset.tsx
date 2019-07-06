import React, { FC, Fragment } from "react";
import cn from "classnames";
import {
  AppBar,
  AppBarNav,
  AppBarTitle,
  AppBarAction,
  APP_BAR_OFFSET_CLASSNAME,
  APP_BAR_OFFSET_DENSE_CLASSNAME,
  APP_BAR_OFFSET_PROMINENT_CLASSNAME,
  APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME,
} from "@react-md/app-bar";
import {
  MenuSVGIcon,
  SearchSVGIcon,
  MoreVertSVGIcon,
} from "@react-md/material-icons";
import { Text, TextContainer } from "@react-md/typography";

import "./FixedWithOffset.scss";

interface ExampleProps {
  dense?: boolean;
  prominent?: boolean;
}

const Example: FC<ExampleProps> = ({ dense, prominent }) => {
  const id = `fixed-with-offset${dense ? "-dense" : ""}${
    prominent ? "-prominent" : ""
  }`;

  let title = !dense && !prominent ? "Normal" : "";
  if (dense) {
    title = "Dense";
  }

  if (prominent) {
    title = `${title ? `${title} and ` : ""} Prominent`;
  }
  return (
    <div id={id} className="fixed-with-offset">
      <AppBar id={`${id}-bar`} fixed dense={dense} prominent={prominent}>
        <AppBarNav id={`${id}-nav`} aria-label="Navigation">
          <MenuSVGIcon />
        </AppBarNav>
        <AppBarTitle className="fixed-with-offset__title">{title}</AppBarTitle>
        <AppBarAction id={`${id}-search`} first aria-label="Search">
          <SearchSVGIcon />
        </AppBarAction>
        <AppBarAction id={`${id}-action`} last aria-label="Actions">
          <MoreVertSVGIcon />
        </AppBarAction>
      </AppBar>
      <div
        className={cn("fixed-with-offset__content", {
          [APP_BAR_OFFSET_CLASSNAME]: !dense && !prominent,
          [APP_BAR_OFFSET_DENSE_CLASSNAME]: dense && !prominent,
          [APP_BAR_OFFSET_PROMINENT_CLASSNAME]: !dense && prominent,
          [APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME]: dense && prominent,
        })}
      >
        <TextContainer size="mobile">
          <Text type="headline-4">Content!</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            accumsan, mi eget rutrum ornare, turpis lacus congue dolor, vitae
            rhoncus orci augue vitae mauris. Curabitur consequat dui nisi.
            Vestibulum at arcu at leo rhoncus commodo. Sed vel quam non ligula
            blandit maximus id a nisi. In convallis nulla vitae tincidunt
            vestibulum. Sed tincidunt vestibulum elit, eu dapibus velit interdum
            eu. Nullam scelerisque velit in velit commodo, id eleifend urna
            mollis. Orci varius natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus.
          </Text>
          <Text>
            Duis hendrerit felis ut ante varius, eu faucibus neque maximus.
            Suspendisse nunc nibh, suscipit non molestie vulputate, vestibulum
            non lectus. Proin eget purus sollicitudin nunc tristique semper.
            Mauris sit amet tempus turpis, nec blandit augue. Vestibulum rhoncus
            dolor vel ex laoreet vulputate. In consequat metus id velit
            ullamcorper, eget tempor nisi vestibulum. Curabitur egestas
            ultricies tincidunt.
          </Text>
          <Text>
            Phasellus et mauris tristique, dictum sapien vel, consectetur enim.
            Maecenas volutpat mi eros, ultrices ultrices est placerat sit amet.
            Nullam rutrum ipsum a nisi maximus ullamcorper ac eu massa. In
            finibus mauris at leo porttitor consectetur. Phasellus quam ex,
            egestas eu diam non, ullamcorper dignissim lorem. Ut cursus nunc nec
            massa eleifend dignissim. Nullam lorem turpis, dapibus sit amet
            scelerisque id, volutpat et ipsum. Nulla tristique, lectus vehicula
            bibendum auctor, sapien ipsum rutrum diam, a tempor quam ligula ac
            nisi. Nam scelerisque venenatis facilisis. Donec congue porttitor
            felis vel finibus. Donec eget est metus. Donec vehicula sem elit,
            sed pharetra nisl eleifend ac. Vestibulum eget dolor in est
            condimentum consequat.
          </Text>
        </TextContainer>
      </div>
    </div>
  );
};

const FixedWithOffset: FC = () => (
  <Fragment>
    <Example />
    <Example dense />
    <Example prominent />
    <Example dense prominent />
  </Fragment>
);

export default FixedWithOffset;
