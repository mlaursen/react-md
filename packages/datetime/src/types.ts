/**
 * @since 6.4.0
 */
export type ReadonlyDate = Readonly<Date>;

/**
 * @since 6.4.0
 */
export interface OptionsWithDate {
  date: ReadonlyDate;
}
