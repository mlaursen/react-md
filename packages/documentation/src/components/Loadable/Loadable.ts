import * as React from "react";
import * as LoadableInstance from "react-loadable";

// doesn't work with normal imports right now
const ReactLoadable = require("react-loadable");

import Loading from "./Loading";

type Loader<Props> = () => Promise<
  React.ComponentType<Props> | { default: React.ComponentType<Props> }
>;

export default function Loadable<Props = { [key: string]: any }>(loader: Loader<Props>) {
  return ReactLoadable({
    loader,
    loading: Loading,
    delay: 300,
  });
}
