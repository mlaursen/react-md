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
import {
  MobileOnly,
  useIsUserInteractionMode,
  useAppSize,
} from "@react-md/utils";

import dessertList, { Dessert } from "constants/desserts";
import Phone, { PhoneAppBar, ClosePhone } from "components/Phone";

import "./HighlightMatches.scss";
import DessertTable from "./DessertTable";

const desserts = dessertList.map(({ name }) => name);

const HighlightMatches: FC = () => {
  const [dessert, setDessert] = useState<Dessert | null>(null);
  const onAutoComplete = useCallback<AutoCompleteHandler>(({ dataIndex }) => {
    setDessert(dessertList[dataIndex]);
  }, []);

  const isTouch = useIsUserInteractionMode("touch");
  const { isPhone } = useAppSize();

  return (
    <Phone
      id="highlight-example"
      onPhoneClose={() => setDessert(null)}
      disableAppBar
      disableContent={isPhone}
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
                listboxClassName="autocomplete-listbox-highlight"
                vhMargin={0}
                vwMargin={0}
                disableSwapping
                disableHideOnScroll={isTouch}
                disableHideOnResize={isTouch}
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
      {dessert && (
        <Text type="headline-6" style={{ margin: "1rem" }}>
          Nutrition
        </Text>
      )}
      <DessertTable dessert={dessert} />
      <MobileOnly>
        <ClosePhone id="phone-close" floating />
      </MobileOnly>
    </Phone>
  );
};

export default HighlightMatches;
