import React, { FC } from "react";

import "./container.scss";

const Container: FC = ({ children }) => (
  <div className="form-container">{children}</div>
);

export default Container;
