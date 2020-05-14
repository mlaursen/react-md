import React, { FC, useCallback, useState } from "react";
import { AutoComplete, AutoCompleteHandler } from "@react-md/autocomplete";
import {
  AppBarNav,
  AppBar,
  AppBarAction,
  AppBarTitle,
} from "@react-md/app-bar";
import { SearchSVGIcon, KeyboardVoiceSVGIcon } from "@react-md/material-icons";
import { Text } from "@react-md/typography";
import { PhoneOnly, useAppSize } from "@react-md/utils";

import dessertList, { Dessert } from "constants/desserts";
import Phone, { PhoneAppBar, ClosePhone } from "components/Phone";

import DessertTable from "./DessertTable";
import styles from "./HighlightMatches.module.scss";

const desserts = dessertList.map(({ name }) => name);

const HighlightMatches: FC = () => {
  const [dessert, setDessert] = useState<Dessert | null>(null);
  const onAutoComplete = useCallback<AutoCompleteHandler>(({ dataIndex }) => {
    setDessert(dessertList[dataIndex]);
  }, []);

  const { isPhone } = useAppSize();

  return (
    <Phone
      id="highlight-example"
      onPhoneClose={() => setDessert(null)}
      disableAppBar
      disableContent={isPhone}
      contentClassName={styles.container}
      appBar={
        <PhoneAppBar>
          <AppBar>
            <AppBarNav id="phone-nav">
              <SearchSVGIcon />
            </AppBarNav>
            <AppBarTitle>
              <AutoComplete
                id="phone-search"
                placeholder="Search"
                data={desserts}
                onAutoComplete={onAutoComplete}
                highlight
                theme="none"
                listboxWidth="auto"
                listboxClassName={styles.listbox}
                vhMargin={0}
                vwMargin={0}
                clearOnAutoComplete
              />
            </AppBarTitle>
            <AppBarAction id="phone-action" first last>
              <KeyboardVoiceSVGIcon />
            </AppBarAction>
          </AppBar>
        </PhoneAppBar>
      }
    >
      <Text type="headline-6" style={{ margin: "1rem" }}>
        {dessert ? "Nutrition" : "No Dessert Chosen"}
      </Text>
      <DessertTable dessert={dessert} />
      <PhoneOnly>
        <ClosePhone id="phone-close" floating />
      </PhoneOnly>
    </Phone>
  );
};

export default HighlightMatches;
