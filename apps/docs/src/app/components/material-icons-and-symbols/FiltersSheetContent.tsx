import {
  Form,
  Typography,
  useAppSize,
  useColorScheme,
  useExpansionPanels,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import { useId, type ReactElement } from "react";
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
  const { colorScheme } = useColorScheme();

  return (
    <Form
      className={cnb(!isDesktop && colorScheme === "dark" && styles.darker)}
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