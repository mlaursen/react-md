/* eslint-disable import/prefer-default-export */
import { NextComponentType, NextPageContext } from "next";

export type NextFC<P extends {} = {}> = NextComponentType<
  NextPageContext,
  P,
  P
>;
