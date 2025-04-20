import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Box } from "@react-md/core/box/Box";
import { AsyncButton } from "@react-md/core/button/AsyncButton";
import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { Checkbox } from "@react-md/core/form/Checkbox";
import { Fieldset } from "@react-md/core/form/Fieldset";
import { Legend } from "@react-md/core/form/Legend";
import { Slider } from "@react-md/core/form/Slider";
import { useSlider } from "@react-md/core/form/useSlider";
import { getIcon } from "@react-md/core/icon/config";
import { LinearProgress } from "@react-md/core/progress/LinearProgress";
import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { Typography } from "@react-md/core/typography/Typography";
import { wait } from "@react-md/core/utils/wait";
import AddIcon from "@react-md/material-icons/AddIcon";
import { type ReactElement } from "react";

import styles from "./SimplePreview.module.scss";

export function SimplePreview(): ReactElement {
  const { getTabProps, getTabListProps } = useTabs();
  const slider = useSlider();
  return (
    <Card className={styles.container}>
      <AppBar theme="primary">
        <Button aria-label="Menu" buttonType="icon">
          {getIcon("menu")}
        </Button>
        <AppBarTitle>Color</AppBarTitle>
      </AppBar>
      <Box stacked align="stretch">
        <Typography>Hello, world!</Typography>
        <LinearProgress aria-hidden aria-label="" />
        <TabList {...getTabListProps()}>
          {Array.from({ length: 2 }, (_, i) => (
            <Tab key={i} {...getTabProps(i)}>
              Tab {i + 1}
            </Tab>
          ))}
        </TabList>
        <Fieldset>
          <Slider
            aria-labelledby="slider-label"
            {...slider}
            beforeAddon={<Legend id="slider-label">Label</Legend>}
          />
        </Fieldset>
        <Checkbox label="Checkbox" defaultChecked />
      </Box>
      <AsyncButton
        floating="bottom-right"
        floatingProps={{ absolute: true }}
        onClick={() => wait(5000)}
      >
        <AddIcon />
      </AsyncButton>
    </Card>
  );
}
