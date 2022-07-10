import type { HTMLAttributes, ReactElement } from "react";
import { forwardRef } from "react";
import { FixedSizeList } from "react-window";
import { MatchedIcon } from "./MatchedIcon";
import type { IconReferences } from "./useMaterialIcons";
import styles from "./MatchedIcons.module.scss";

const MIN_CELL_WIDTH = 160;
const CONTAINER_HEIGHT = 448;
const ITEM_HEIGHT = 91;

export interface MatchedIconsProps {
  loading: boolean;
  rowWidth: number;
  containerWidth: number;
  matches: IconReferences;
}

export function MatchedIcons(props: MatchedIconsProps): ReactElement {
  const { rowWidth, containerWidth, matches, loading } = props;
  const total = matches.length;
  const columns = Math.floor(rowWidth / MIN_CELL_WIDTH);
  const itemCount = Math.ceil(total / columns);
  const lastRowIndex = itemCount - 1;
  const lastRowColumns = Math.min(total, columns, total % columns);

  return (
    <FixedSizeList
      className={styles.container}
      height={CONTAINER_HEIGHT}
      width={containerWidth}
      itemCount={itemCount}
      itemSize={ITEM_HEIGHT}
      innerElementType={HideNaNStyle}
    >
      {({ index, style }) => (
        <div
          style={{
            ...style,
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gridGap: "1rem",
            padding: "0.5rem",
          }}
        >
          {Array.from(
            { length: index === lastRowIndex ? lastRowColumns : columns },
            (_, column) => {
              const currentIndex = index * columns + column;
              const { name, icon } = matches[currentIndex];

              return (
                <MatchedIcon
                  key={name}
                  name={name}
                  icon={icon}
                  loading={loading}
                />
              );
            }
          )}
        </div>
      )}
    </FixedSizeList>
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
