import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";

const examples: ExampleList = [];

const Examples = () => <ExamplesPage title="Elevation" examples={examples} />;

export default Examples;
