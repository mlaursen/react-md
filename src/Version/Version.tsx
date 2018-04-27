import * as React from "react";
import { default as Text, ITextProps } from "../Typography";

import version from "./version";

const Version: React.SFC<ITextProps> = (props) => <Text {...props}>{version}</Text>;

export default Version;
