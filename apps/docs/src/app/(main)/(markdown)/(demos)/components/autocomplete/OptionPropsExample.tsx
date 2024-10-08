"use client";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

const options = [
  {
    label: "Favorite Left Addon",
    leftAddon: <FavoriteIcon />,
  },
  {
    label: "Favorite Right Addon",
    rightAddon: <FavoriteIcon />,
  },
  {
    label: "Multiline",
    secondaryText: "Second line of text that is ignored in filtering",
    multiline: true,
  },
];

export default function OptionPropsExample(): ReactElement {
  return (
    <Autocomplete label="Label" options={options} listboxLabel="Options" />
  );
}
