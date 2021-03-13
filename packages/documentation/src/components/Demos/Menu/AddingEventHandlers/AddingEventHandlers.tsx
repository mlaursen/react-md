import React, { ReactElement } from "react";
import { Divider } from "@react-md/divider";

import AddingOnClick from "./AddingOnClick";
import CustomMenuItems from "./CustomMenuItems";

export default function AddingEventHandlers(): ReactElement {
  return (
    <>
      <AddingOnClick />
      <Divider />
      <CustomMenuItems />
    </>
  );
}
