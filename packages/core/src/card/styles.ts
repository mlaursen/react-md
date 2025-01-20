import { cnb } from "cnbuilder";

import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";

const cardStyles = bem("rmd-card");

/** @since 6.0.0 */
export interface CardClassNameOptions {
  className?: string;

  /**
   * Set this to `true` if the card should use apply an inset `border` instead
   * of `box-shadow`.
   *
   * @defaultValue `false`
   */
  bordered?: boolean;

  /**
   * Set this to `true` if the card should gain additional box shadow while
   * hovered.
   *
   * @defaultValue `false`
   */
  raisable?: boolean;

  /**
   * Set this to `true` if the card should gain the pointer cursor while
   * hovering and other interaction styles and not using the `ClickableCard`
   * component.
   *
   * @defaultValue `false`
   */
  interactable?: boolean;
}

/**
 * @since 6.0.0
 */
export function card(options: CardClassNameOptions = {}): string {
  const { className, bordered, raisable, interactable } = options;

  return cnb(
    cardStyles({
      bordered,
      shadowed: !bordered,
      raisable: !bordered && raisable,
      interactable,
    }),
    className
  );
}

/** @since 6.0.0 */
export interface CardHeaderClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  addonAfter?: boolean;

  /** @defaultValue `false` */
  addonBefore?: boolean;
}

/**
 * @since 6.0.0
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

/** @since 6.0.0 */
export interface CardHeaderContentClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function cardHeaderContent(
  options: CardHeaderContentClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(cardStyles("header-content"), className);
}

/** @since 6.0.0 */
export interface CardTitleClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function cardTitle(options: CardTitleClassNameOptions = {}): string {
  const { className } = options;

  return cnb(cardStyles("title"), className);
}

/** @since 6.0.0 */
export interface CardSubtitleClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function cardSubtitle(
  options: CardSubtitleClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(cardStyles("subtitle"), className);
}

/** @since 6.0.0 */
export interface CardContentClassNameOptions {
  className?: string;

  /**
   * Set this to `true` to disable the card's padding.
   *
   * @defaultValue `false`
   */
  disablePadding?: boolean;

  /**
   * Set this to `true` to disable applying the `text-secondary-color`.
   *
   * @defaultValue `false`
   */
  disableSecondaryColor?: boolean;

  /**
   * Set this to `true` to disable applying extra `padding-bottom` if the
   * `CardContent` component is the last child.
   *
   * @defaultValue `false`
   * @since 6.0.0 Renamed from `disableExtraPadding`
   */
  disableLastChildPadding?: boolean;
}

/**
 * @since 6.0.0
 */
export function cardContent(options: CardContentClassNameOptions = {}): string {
  const {
    className,
    disablePadding,
    disableSecondaryColor,
    disableLastChildPadding,
  } = options;

  return cnb(
    cardStyles("content", {
      padded: !disablePadding,
      "padding-bottom": !disableLastChildPadding,
    }),
    cssUtils({
      textColor: !disableSecondaryColor ? "text-secondary" : undefined,
    }),
    className
  );
}

/** @since 6.0.0 */
export interface CardFooterClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function cardFooter(options: CardFooterClassNameOptions = {}): string {
  const { className } = options;

  return cnb(cardStyles("footer"), className);
}
