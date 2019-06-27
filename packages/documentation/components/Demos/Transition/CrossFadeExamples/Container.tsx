import React, { FC } from "react";

import "./container.scss";

const Container: FC = ({ children }) => (
  <div className="cross-fade-example">{children}</div>
);

export default Container;
