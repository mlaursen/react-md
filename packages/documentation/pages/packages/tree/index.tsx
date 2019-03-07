import React, { Fragment, FunctionComponent } from "react";
import PackageHome from "components/PackageHome";

const description = `
The \`@react-md/tree\` package is used to create an accessible tree component
following the accessibility specs in the [tree role](https://w3.org/TR/wai-aria-practices#TreeView).
This package can be used to create a navigation tree, a file browser tree, or any other
kind of tree view for data.
`;

const recommendations = ["icon", "transition", "theme", "wia-aria"];

const Theme: FunctionComponent = () => {
  return (
    <Fragment>
      <PackageHome
        name="tree"
        description={description}
        recommendations={recommendations}
      />
    </Fragment>
  );
};

export default Theme;
