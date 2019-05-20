import React, { FunctionComponent } from "react";

import "./container.scss";
import { bem } from "@react-md/theme";

interface Props {
  centered?: boolean;
}

const block = bem("card-container");

const Container: FunctionComponent<Props> = ({ children, centered }) => (
  <div className={block({ centered })}>{children}</div>
);

export default Container;
