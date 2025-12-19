import { Box } from "@react-md/core/box/Box";
import {
  randomSkeletonPlaceholder,
  skeletonPlaceholder,
} from "@react-md/core/transition/skeletonPlaceholderUtils";
import { typography } from "@react-md/core/typography/typographyStyles";
import { randomInt } from "@react-md/core/utils/randomInt";
import { cnb } from "cnbuilder";
import { Fragment, type ReactElement } from "react";

import styles from "@/components/TableOfContents/RenderTableOfContentsItem.module.scss";
import { TableOfContents } from "@/components/TableOfContents/TableOfContents.js";

export function PlaceholderMarkdownPage(): ReactElement {
  const headings = randomInt({ min: 2, max: 5 });
  return (
    <>
      <TableOfContents
        toc={[]}
        loading={
          <>
            {Array.from({ length: headings + 1 }, (_, i) => (
              <li key={i}>
                <div className={styles.link}>
                  <div
                    style={randomSkeletonPlaceholder()}
                    className={skeletonPlaceholder()}
                  />
                </div>
              </li>
            ))}
          </>
        }
      />
      <Box align="stretch" stacked>
        <div
          style={{ marginTop: "1.25em" }}
          className={typography({ type: "headline-3" })}
        >
          <div
            style={randomSkeletonPlaceholder({ minPercentage: 70 })}
            className={cnb(skeletonPlaceholder())}
          />
        </div>
        {Array.from({ length: randomInt({ min: 2, max: 4 }) }, (_, i) => (
          <div
            key={i}
            style={randomSkeletonPlaceholder({
              minPercentage: i === 0 ? 100 : 60,
              maxPercentage: 100,
            })}
            className={skeletonPlaceholder()}
          />
        ))}
        {Array.from({ length: headings }, (_, i) => (
          <Fragment key={i}>
            <div
              style={{ marginTop: "1.25em" }}
              className={typography({ type: "headline-4" })}
            >
              <div
                style={randomSkeletonPlaceholder({ minPercentage: 60 })}
                className={cnb(skeletonPlaceholder())}
              />
            </div>
            {Array.from({ length: randomInt({ min: 5, max: 8 }) }, (_, i) => (
              <div
                key={i}
                style={randomSkeletonPlaceholder({
                  minPercentage: i === 0 ? 100 : 60,
                  maxPercentage: 100,
                })}
                className={skeletonPlaceholder()}
              />
            ))}
          </Fragment>
        ))}
      </Box>
    </>
  );
}
