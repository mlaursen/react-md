import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";

const cardStyles = bem("rmd-card");

/** @remarks \@since 6.0.0 */
export interface CardClassNameOptions {
  className?: string;

  /**
   * @defaultValue `false`
   */
  bordered?: boolean;

  /**
   * @defaultValue `false`
   */
  raiseable?: boolean;

  /**
   * @defaultValue `false`
   */
  fullWidth?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function card(options: CardClassNameOptions = {}): string {
  const {
    className,
    bordered = false,
    raiseable = false,
    fullWidth = false,
  } = options;

  return cnb(
    cardStyles({
      bordered,
      shadowed: !bordered,
      raiseable: !bordered && raiseable,
      "full-width": fullWidth,
    }),
    className
  );
}

/** @remarks \@since 6.0.0 */
export interface CardHeaderClassNameOptions {
  className?: string;
  addonAfter?: boolean;
  addonBefore?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function cardHeader(options: CardHeaderClassNameOptions = {}): string {
  const { className, addonAfter = false, addonBefore = false } = options;

  return cnb(
    cardStyles("header", {
      "addon-after": addonAfter && !addonBefore,
      "addon-before": addonBefore && !addonAfter,
      surrounded: addonAfter && addonBefore,
    }),
    className
  );
}

/** @remarks \@since 6.0.0 */
export interface CardHeaderContentClassNameOptions {
  className?: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function cardHeaderContent(
  options: CardHeaderContentClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(cardStyles("header-content"), className);
}

/** @remarks \@since 6.0.0 */
export interface CardTitleClassNameOptions {
  className?: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function cardTitle(options: CardTitleClassNameOptions = {}): string {
  const { className } = options;

  return cnb(cardStyles("title"), className);
}

/** @remarks \@since 6.0.0 */
export interface CardSubtitleClassNameOptions {
  className?: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function cardSubtitle(
  options: CardSubtitleClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(cardStyles("subtitle"), className);
}

/** @remarks \@since 6.0.0 */
export interface CardContentClassNameOptions {
  className?: string;
  disablePadding?: boolean;
  disableLastChildPadding?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function cardContent(options: CardContentClassNameOptions): string {
  const {
    className,
    disablePadding = false,
    disableLastChildPadding = false,
  } = options;

  return cnb(
    cardStyles("content", {
      padded: !disablePadding,
      "padding-bottom": !disableLastChildPadding,
    }),
    className
  );
}

/** @remarks \@since 6.0.0 */
export interface CardFooterClassNameOptions {
  className?: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function cardFooter(options: CardFooterClassNameOptions = {}): string {
  const { className } = options;

  return cnb(cardStyles("footer"), className);
}
