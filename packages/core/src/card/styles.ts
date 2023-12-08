import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";
import { cssUtils } from "../cssUtils.js";

const cardStyles = bem("rmd-card");

/** @remarks \@since 6.0.0 */
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
   * Update the card to have `display: block` and `width: 100%` instead of
   * `display: inline-block`.
   *
   * @defaultValue `false`
   */
  fullWidth?: boolean;

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
 * @remarks \@since 6.0.0
 */
export function card(options: CardClassNameOptions = {}): string {
  const { className, bordered, raisable, fullWidth, interactable } = options;

  return cnb(
    cardStyles({
      bordered,
      shadowed: !bordered,
      raisable: !bordered && raisable,
      interactable,
      "full-width": fullWidth,
    }),
    className
  );
}

/** @remarks \@since 6.0.0 */
export interface CardHeaderClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  addonAfter?: boolean;

  /** @defaultValue `false` */
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

  return cnb(
    cardStyles("subtitle"),
    cssUtils({ textColor: "text-secondary" }),
    className
  );
}

/** @remarks \@since 6.0.0 */
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
   * @remarks \@since 6.0.0 Renamed from `disableExtraPadding`
   */
  disableLastChildPadding?: boolean;
}

/**
 * @remarks \@since 6.0.0
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
