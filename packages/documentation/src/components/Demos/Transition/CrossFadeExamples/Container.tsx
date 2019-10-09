import React, { FC } from "react";

import "./Container.scss";

const Container: FC = ({ children }) => (
  <div className="cross-fade-example">{children}</div>
);

export default Container;
