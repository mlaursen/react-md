import React, { Fragment, FunctionComponent } from "react";
import { Divider } from "@react-md/divider";

import CustomMenuItems from "./CustomMenuItems";
import AddingOnClick from "./AddingOnClick";

const AddingEventHandlers: FunctionComponent = () => (
  <Fragment>
    <AddingOnClick />
    <Divider />
    <CustomMenuItems />
  </Fragment>
);

export default AddingEventHandlers;
