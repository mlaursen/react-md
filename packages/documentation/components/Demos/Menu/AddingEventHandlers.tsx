import React, { Fragment, FC } from "react";
import { Divider } from "@react-md/divider";

import CustomMenuItems from "./CustomMenuItems";
import AddingOnClick from "./AddingOnClick";

const AddingEventHandlers: FC = () => (
  <Fragment>
    <AddingOnClick />
    <Divider />
    <CustomMenuItems />
  </Fragment>
);

export default AddingEventHandlers;
