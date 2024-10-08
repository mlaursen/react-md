"use client";
import { desserts } from "@/constants/desserts.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { Avatar } from "@react-md/core/avatar/Avatar";
import { cssUtils } from "@react-md/core/cssUtils";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

export default function GetOptionPropsExample(): ReactElement {
  return (
    <Autocomplete
      label="Dessert"
      options={desserts}
      getOptionProps={({ index, option }) => ({
        className: cnb(
          index % 3 === 0 && cssUtils({ textDecoration: "line-through" })
        ),
        leftAddon: <Avatar size="icon">{option.type.charAt(0)}</Avatar>,
      })}
      getOptionLabel={(dessert) => dessert.name}
      listboxLabel="Desserts"
    />
  );
}
