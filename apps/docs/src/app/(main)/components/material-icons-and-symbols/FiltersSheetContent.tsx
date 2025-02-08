import { useExpansionPanels } from "@react-md/core/expansion-panel/useExpansionPanels";
import { Form } from "@react-md/core/form/Form";
import { useAppSize } from "@react-md/core/media-queries/AppSizeProvider";
import { useColorScheme } from "@react-md/core/theme/useColorScheme";
import { Typography } from "@react-md/core/typography/Typography";
import { cnb } from "cnbuilder";
import { type ReactElement, useId } from "react";

import { FilterCategoryPanel } from "./FilterCategoryPanel.jsx";
import { FilterStylePanel } from "./FilterStylePanel.jsx";
import { FilterSymbolCustomization } from "./FilterSymbolCustomization.jsx";
import styles from "./FiltersSheetContent.module.scss";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";

export function FiltersSheetContent(): ReactElement {
  const { iconType } = useMaterialIconsAndSymbols();
  const baseId = useId();
  const styleId = `${baseId}-style`;
  const categoriesId = `${baseId}-categories`;
  const { getPanelProps } = useExpansionPanels({
    baseId,
    multiple: true,
    defaultExpandedIds: [styleId, categoriesId],
  });
  const { isDesktop } = useAppSize();
  const { currentColor } = useColorScheme();

  return (
    <Form
      className={cnb(!isDesktop && currentColor === "dark" && styles.darker)}
    >
      {iconType === "symbol" && (
        <>
          <Typography type="subtitle-2" className={styles.title}>
            Customization
          </Typography>
          <FilterSymbolCustomization />
        </>
      )}
      <Typography type="subtitle-2" className={styles.title}>
        Filter
      </Typography>
      <FilterStylePanel {...getPanelProps(styleId)} />
      <FilterCategoryPanel {...getPanelProps(categoriesId)} />
    </Form>
  );
}
