import React, { FC, Fragment, useState } from "react";
import { Button } from "@react-md/button";
import { Collapse } from "@react-md/transition";
import Page1 from "./Page1";

const SimpleCollapseExample: FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Fragment>
      <Button onClick={() => setCollapsed(!collapsed)}>Toggle</Button>
      <Collapse collapsed={collapsed}>
        <Page1 />
      </Collapse>
    </Fragment>
  );
};

export default SimpleCollapseExample;
