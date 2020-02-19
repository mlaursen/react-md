import React, { FC, useState, Fragment } from "react";

import "./UseCSSTransition.scss";
import { useCSSTransition } from "@react-md/transition";
import { Button } from "@react-md/button";
import Page1 from "./Page1";

const UseCSSTransition: FC = () => {
  const [transitionIn, setTransitionIn] = useState(false);
  const [rendered, transitionProps] = useCSSTransition({
    // changing this value causes the transition behavior to change
    transitionIn,

    // 5 seconds just for demo purposes... can also be an object
    timeout: 5000,

    // gets BEM-ified -- can also be a custom object
    classNames: "use-css-transition",

    // can also trigger the css transition on initial mount
    // appear: false,

    // changes the `rendered` value to be false while not transitioning and
    // `transitionIn` is false
    temporary: true,

    // an optional className to merge with the transition classNames
    // className: "",
  });

  return (
    <Fragment>
      <Button onClick={() => setTransitionIn(!transitionIn)}>Toggle</Button>
      {rendered && <Page1 {...transitionProps} />}
    </Fragment>
  );
};

export default UseCSSTransition;
