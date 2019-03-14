import React, { FunctionComponent } from "react";
import { Link } from "@react-md/link";
import { TextIconSpacing } from "@react-md/icon";

import TwitterIcon from "icons/TwitterIcon";

import "./with-icons.scss";

const WithIcons: FunctionComponent = () => (
  <div className="link-container">
    <Link href="https://twitter.com" flexCentered>
      <TextIconSpacing icon={<TwitterIcon role="presentation" />}>
        Twitter
      </TextIconSpacing>
    </Link>
    <Link href="https://twitter.com" flexCentered>
      <TwitterIcon title="Twitter" />
    </Link>
  </div>
);

export default WithIcons;
