import React, { FC } from "react";
import { bem } from "@react-md/theme";

import "./Container.scss";

interface Props {
  centered?: boolean;
}

const block = bem("card-container");

const Container: FC<Props> = ({ children, centered }) => (
  <div className={block({ centered })}>{children}</div>
);

export default Container;
