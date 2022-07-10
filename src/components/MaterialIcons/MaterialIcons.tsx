import type { OnResizeObserverChange } from "@react-md/core";
import {
  box,
  Box,
  getScrollbarWidth,
  getTypographyClassName,
  Typography,
  useResizeObserver,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useCallback, useState } from "react";
import { useMaterialIcons } from "./useMaterialIcons";

import { Divider } from "@react-md/divider";
import { ICON_CATEGORIES, ICON_TYPES } from "src/constants/materialIcons";
import { MatchedIcons } from "./MatchedIcons";
import { Radio } from "./Radio";

export default function MaterialIcons(): ReactElement {
  const {
    loading,
    matches,
    search,
    setSearch,
    iconType,
    setIconType,
    iconCategory,
    setIconCategory,
  } = useMaterialIcons();

  const [size, setSize] = useState({ containerWidth: 150, rowWidth: 150 });
  const [_ref, refCallback] = useResizeObserver(
    useCallback<OnResizeObserverChange>(({ height, scrollHeight, width }) => {
      setSize({
        containerWidth: width,
        rowWidth: width - (scrollHeight > height ? getScrollbarWidth() : 0),
      });
    }, [])
  );

  return (
    <>
      <Typography type="headline-6" margin="none" className={box()}>
        Icon Type
      </Typography>
      <Box>
        <Radio
          name="iconType"
          value="all"
          currentValue={iconType}
          setCurrentValue={setIconType}
        />
        {ICON_TYPES.map((value) => (
          <Radio
            key={value}
            name="iconType"
            value={value}
            currentValue={iconType}
            setCurrentValue={setIconType}
          />
        ))}
      </Box>
      <Divider />
      <Typography type="headline-6" margin="none" className={box()}>
        Icon Category
      </Typography>
      <Box>
        <Radio
          name="iconCategory"
          value="all"
          currentValue={iconCategory}
          setCurrentValue={setIconCategory}
        />
        {ICON_CATEGORIES.map((value) => (
          <Radio
            key={value}
            name="iconCategory"
            value={value}
            currentValue={iconCategory}
            setCurrentValue={setIconCategory}
          />
        ))}
      </Box>
      <Divider />
      <label
        htmlFor="search-input"
        className={box({
          className: getTypographyClassName({
            margin: "none",
            type: "headline-6",
          }),
        })}
      >
        Search...
      </label>
      <Box>
        <input
          id="search-input"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
      </Box>

      <div ref={refCallback}>
        <MatchedIcons {...size} matches={matches} loading={loading} />
      </div>
    </>
  );
}
