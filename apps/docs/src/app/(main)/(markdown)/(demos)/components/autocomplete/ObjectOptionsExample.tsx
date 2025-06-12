"use client";

import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type ReactElement } from "react";

import { desserts } from "@/constants/desserts.js";

export default function ObjectOptionsExample(): ReactElement {
  return (
    <Autocomplete label="State" options={desserts} listboxLabel="States" />
  );
}
