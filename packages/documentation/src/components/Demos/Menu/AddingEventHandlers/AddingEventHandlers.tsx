import React, { FC } from "react";
import { Divider } from "@react-md/divider";

import AddingOnClick from "./AddingOnClick";
import CustomMenuItems from "./CustomMenuItems";

const AddingEventHandlers: FC = () => (
  <>
    <AddingOnClick />
    <Divider />
    <CustomMenuItems />
  </>
);

export default AddingEventHandlers;
