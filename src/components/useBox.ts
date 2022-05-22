import { cnb } from "cnbuilder";
import styles from "./useBox.module.scss";

export interface BoxOptions {
  [key: string]: unknown;
}

export function useBox(_options: BoxOptions = {}): string {
  return cnb(styles.box);
}
