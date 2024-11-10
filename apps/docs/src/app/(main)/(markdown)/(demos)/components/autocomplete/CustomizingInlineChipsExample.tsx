"use client";
import { type Dessert, desserts } from "@/constants/desserts.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import FavoriteIcon from "node_modules/@react-md/material-icons/src/FavoriteIcon.jsx";
import { type ReactElement } from "react";

export default function CustomizingInlineChipsExample(): ReactElement {
  const isDisabled = (option: Dessert): boolean =>
    option === desserts[0] || option === desserts[1] || option === desserts[4];

  return (
    <>
      <Autocomplete
        label="Dessert"
        placeholder="Ice cream"
        defaultValue={[desserts[0], desserts[1], desserts[4]]}
        listboxLabel="Desserts"
        options={desserts}
        getOptionLabel={(dessert) => dessert.name}
        getOptionProps={({ option }) => {
          return {
            disabled: isDisabled(option),
          };
        }}
        getChipProps={({ option, index }) => {
          return {
            theme: "outline",
            leftAddon: <FavoriteIcon />,
            disabled: isDisabled(option),
            children: `${option.name} ${index + 1}`,
          };
        }}
      />
    </>
  );
}
