import React, { FC } from "react";
import { AppBar } from "@react-md/app-bar";

import AppBarTitle from "components/AppBarTitle";

import ClosePhone from "./ClosePhone";
import { usePhoneContext } from "./context";
import OptionsAction from "./OptionsAction";
import PhoneAppBar from "./PhoneAppBar";
import SearchAction from "./SearchAction";

const DefaultPhoneAppBar: FC = () => {
  const { title } = usePhoneContext();
  return (
    <PhoneAppBar>
      <AppBar component="div" theme="clear">
        <ClosePhone />
        <AppBarTitle>{title}</AppBarTitle>
        <SearchAction />
        <OptionsAction />
      </AppBar>
    </PhoneAppBar>
  );
};

export default DefaultPhoneAppBar;
