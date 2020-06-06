import React, { FC } from "react";
import { Text } from "@react-md/typography";

import { ItemReferenceLink } from "utils/sassdoc";

import ReferenceLinkList from "./ReferenceLinkList";

export interface ReferenceLinkSectionProps {
  links: ItemReferenceLink[] | undefined;
}

const ReferenceLinkSection: FC<ReferenceLinkSectionProps> = ({
  children,
  links,
}) => {
  if (!links || !links.length) {
    return null;
  }

  return (
    <>
      <Text type="headline-6" margin="top">
        {children}
      </Text>
      <ul>
        <ReferenceLinkList links={links} />
      </ul>
    </>
  );
};

export default ReferenceLinkSection;
