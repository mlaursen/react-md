import React, { FC } from "react";
import { Text } from "@react-md/typography";

import { ItemReferenceLink } from "utils/sassdoc";

import ReferenceLinkList from "./ReferenceLinkList";

export interface UsedByProps {
  usedBy: ItemReferenceLink[] | undefined;
}

const UsedBy: FC<UsedByProps> = ({ usedBy }) => {
  if (!usedBy || !usedBy.length) {
    return null;
  }

  return (
    <>
      <Text type="headline-6" margin="top">
        Used By
      </Text>
      <ul>
        <ReferenceLinkList links={usedBy} />
      </ul>
    </>
  );
};

export default UsedBy;
