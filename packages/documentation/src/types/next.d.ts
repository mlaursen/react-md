import { NextComponentType, NextPageContext } from "next";

declare module "next" {
  export type NextFC<P extends {} = {}> = NextComponentType<
    NextPageContext,
    P,
    P
  >;
}
