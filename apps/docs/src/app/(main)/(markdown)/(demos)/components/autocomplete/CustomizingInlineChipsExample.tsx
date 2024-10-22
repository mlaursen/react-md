"use client";
import { desserts } from "@/constants/desserts.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import FavoriteIcon from "node_modules/@react-md/material-icons/src/FavoriteIcon.jsx";
import { type ReactElement } from "react";

export default function CustomizingInlineChipsExample(): ReactElement {
  return (
    <>
      <Autocomplete
        label="Dessert"
        placeholder="Ice cream"
        defaultValue={[desserts[0], desserts[1], desserts[4]]}
        listboxLabel="Desserts"
        options={desserts}
        getOptionLabel={(dessert) => dessert.name}
        getChipProps={({ option, index }) => {
          return {
            theme: "outline",
            leftAddon: <FavoriteIcon />,
            disabled: index < 3,
            children: `${option.name} ${index + 1}`,
          };
        }}
      />
    </>
  );
}
