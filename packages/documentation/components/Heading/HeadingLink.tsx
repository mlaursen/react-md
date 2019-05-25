import React, { FC, useCallback } from "react";
import LinkUnstyled from "components/LinkUnstyled";

export interface HeadingLinkProps {
  idRef: string;
}

const HeadingLink: FC<HeadingLinkProps> = ({ idRef }) => {
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
    <LinkUnstyled
      id={`${idRef}-link`}
      href={`#${idRef}`}
      className="heading__link"
      onClick={handleClick}
      aria-label="Quick Link"
      aria-describedby={idRef}
    >
      #
    </LinkUnstyled>
  );
};

export default HeadingLink;
