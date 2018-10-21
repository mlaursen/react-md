import * as React from "react";

import Changelog from "components/Changelog";

const changelog = require("./CHANGELOG.md");

export default () => <Changelog changelog={changelog} />;
