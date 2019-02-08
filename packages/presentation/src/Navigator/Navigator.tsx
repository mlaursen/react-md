import React, { FunctionComponent, Fragment, useState, useRef } from "react";
import { withRouter } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  KeyboardArrowLeftSVGIcon,
  KeyboardArrowRightSVGIcon,
} from "@react-md/material-icons";

import SlideNavigator from "./SlideNavigator";
import { useCurrentContext } from "../CurrentIndex";
import { slides } from "../constants";

function getIndex(pathname: string) {
  const v = parseInt(pathname.replace(/.*\-/, ""), 10);
  return isNaN(v) ? -1 : v;
}

const Navigator: FunctionComponent<any> = ({ children }) => {
  const current = useCurrentContext();
  const previous = current - 1;
  const next = current + 1;
  return (
    <Fragment>
      <SlideNavigator
        rendered={previous >= -1}
        id="previous-slide"
        to={previous === -1 ? "/" : `/slide-${previous}`}
        left
      >
        <KeyboardArrowLeftSVGIcon />
      </SlideNavigator>
      <TransitionGroup>
        <CSSTransition
          key={current}
          timeout={{ enter: 300 }}
          classNames="cross-fade"
          unmountOnExit
          exit={false}
        >
          {children}
        </CSSTransition>
      </TransitionGroup>
      <SlideNavigator
        rendered={next < slides.length}
        id="next-slide"
        to={`/slide-${next}`}
        left={false}
      >
        <KeyboardArrowRightSVGIcon />
      </SlideNavigator>
    </Fragment>
  );
};

export default withRouter(Navigator);
