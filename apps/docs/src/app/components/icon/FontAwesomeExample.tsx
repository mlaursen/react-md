import { FontIcon } from "@react-md/core";
import { type ReactElement } from "react";

export default function FontAwesomeExample(): ReactElement {
  return (
    <>
      <FontIcon iconClassName="fas fa-arrows-spin" />
      <FontIcon iconClassName="far fa-star" theme="secondary" />
    </>
  );
}