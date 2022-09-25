import { Box } from "@react-md/core";
import { Dialog } from "@react-md/dialog";
import type { HTMLAttributes, ReactElement } from "react";
import { forwardRef, useId, useState } from "react";
import { FixedSizeList } from "react-window";
import { MatchedIcon } from "./MatchedIcon";
import { MatchedIconContent } from "./MatchedIconContent";
import styles from "./MatchedIcons.module.scss";
import type { IconReferences } from "./useMaterialIcons";

const CONTAINER_HEIGHT = 448;
const ITEM_HEIGHT = 96 + 32;

export interface MatchedIconsProps {
  loading: boolean;
  containerWidth: number;
  matches: IconReferences;
  columns: number;
}

export function MatchedIcons(props: MatchedIconsProps): ReactElement {
  const { columns, containerWidth, matches, loading } = props;
  const total = matches.length;
  const itemCount = Math.ceil(total / columns);
  const lastRowIndex = itemCount - 1;
  const lastRowColumns = Math.min(total, columns, total % columns);
  const [{ visible, match }, setState] = useState({
    visible: false,
    match: matches[0],
  });

  const titleId = useId();
  const onRequestClose = (): void => {
    setState((prevState) => ({ ...prevState, visible: false }));
  };

  return (
    <>
      <FixedSizeList
        className={styles.container}
        height={CONTAINER_HEIGHT}
        width={containerWidth}
        itemCount={itemCount}
        itemSize={ITEM_HEIGHT}
        innerElementType={HideNaNStyle}
      >
        {({ index, style }) => (
          <Box grid gridName="half-padding" gridColumns={columns} style={style}>
            {Array.from(
              { length: index === lastRowIndex ? lastRowColumns : columns },
              (_, column) => {
                const currentIndex = index * columns + column;
                const match = matches[currentIndex];
                const { name, icon } = match;

                return (
                  <MatchedIcon
                    key={name}
                    name={name}
                    icon={icon}
                    loading={loading}
                    onClick={() => {
                      setState({ visible: true, match });
                    }}
                  />
                );
              }
            )}
          </Box>
        )}
      </FixedSizeList>
      <Dialog
        aria-labelledby={titleId}
        visible={visible}
        onRequestClose={onRequestClose}
        className={styles.dialog}
      >
        <MatchedIconContent
          {...match}
          titleId={titleId}
          onRequestClose={onRequestClose}
        />
      </Dialog>
    </>
  );
}

const HideNaNStyle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function HideNaNStyle(props, ref) {
    const { style: propStyle, ...remaining } = props;
    let style = propStyle;
    if (propStyle && Number.isNaN(propStyle.height)) {
      const { height: _height, ...fixed } = propStyle;
      style = fixed;
    }

    return <div {...remaining} style={style} ref={ref} />;
  }
);
