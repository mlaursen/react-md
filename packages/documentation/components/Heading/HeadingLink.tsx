import React, { FunctionComponent, useCallback } from "react";
import Link from "next/link";
import { Tooltipped } from "@react-md/tooltip";

export interface IHeadingLinkProps {
  idRef: string;
}

const HeadingLink: FunctionComponent<IHeadingLinkProps> = ({ idRef }) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const area = document.createElement("textarea");
      area.value = event.currentTarget.href;
      document.body.appendChild(area);

      try {
        area.select();
        document.execCommand("copy");
      } catch (e) {
      } finally {
        document.body.removeChild(area);
      }
    },
    [idRef]
  );

  return (
    <Tooltipped
      id={`${idRef}-link`}
      tooltip="Create a direct link to this part of the page and copy the url into your clipboard."
      onClick={handleClick}
    >
      {({ tooltip, containerProps }) => (
        <Link href={`#${idRef}`}>
          <a className="heading__link" {...containerProps}>
            #{tooltip}
          </a>
        </Link>
      )}
    </Tooltipped>
  );
};

export default HeadingLink;
