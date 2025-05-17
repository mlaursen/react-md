import { MaterialIcon } from "@react-md/core/icon/MaterialIcon";
import { type ReactElement } from "react";

export default function MaterialIconComponentExample(): ReactElement {
  return (
    <>
      <MaterialIcon name="play_circle" />
      <MaterialIcon name="play_circle" family="filled" />
      <MaterialIcon name="play_circle" family="rounded" />
      <MaterialIcon name="play_circle" family="sharp" theme="primary" />
      <MaterialIcon name="add_a_photo" family="rounded" theme="warning" />
      <MaterialIcon name="add_a_photo" family="filled" theme="success" />
    </>
  );
}
