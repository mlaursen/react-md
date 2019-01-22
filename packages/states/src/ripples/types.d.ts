import { CSSProperties } from "react";
export type RippleTrigger = "keyboard" | "mouse" | "touch";

export interface IRipple {
  timestamp: number;
  style: CSSProperties & {
    left: number;
    top: number;
    height: number;
    width: number;
  };
  type: RippleTrigger;
  exiting: boolean;
}
