"use client";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { cssUtils } from "@react-md/core/cssUtils";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

const options = [
  {
    label: "Favorite Left Addon",
    leftAddon: <FavoriteIcon />,
  },
  {
    label: "Favorite Right Addon",
    // children will be shown in the Option by default and should normally
    // contain the same text as the `label` since the label is the searchable
    // part. the main usage of the `children` is to apply any custom styles or
    // highlighting
    children: (
      <>
        <span className={cssUtils({ fontWeight: "bold" })}>Favorite</span>{" "}
        <span className={cssUtils({ textDecoration: "underline" })}>Right</span>{" "}
        Addon
      </>
    ),
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
