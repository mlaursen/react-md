import React, { FC } from "react";

import "./Container.scss";

const Container: FC = ({ children }) => (
  <div className="form-container">{children}</div>
);

export default Container;
