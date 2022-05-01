import type { ButtonProps } from "@react-md/button";
import type { IconRotatorProps, TextIconSpacingProps } from "@react-md/icon";
import type { ListElement, ListItemProps, ListProps } from "@react-md/list";
import type { RenderConditionalPortalProps } from "@react-md/portal";
import type {
  SheetPosition,
  SheetProps,
  SheetVerticalSize,
} from "@react-md/sheet";
import type {
  FixedPositioningTransitionCallbacks,
  ScaleTransitionHookOptions,
  TransitionScrollCallback,
} from "@react-md/transition";
import type {
  CalculateFixedPositionOptions,
  KeyboardFocusHookOptions,
  LabelA11y,
  PositionAnchor,
  PropsWithRef,
  RequireAtLeastOne,
} from "@react-md/utils";
import type {
  CSSProperties,
  Dispatch,
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  Ref,
  RefObject,
  SetStateAction,
} from "react";

/** @remarks \@since 5.0.0 */
export type MenuTransitionProps = Omit<
  ScaleTransitionHookOptions<HTMLDivElement>,
  "transitionIn" | "vertical" | "nodeRef"
>;

/** @remarks \@since 5.0.0 */
export interface MenuOrientationProps {
  /**
   * Boolean if the menu should be rendered horizontally instead of vertically.
   * This will also update the `aria-orientation`.
   *
   * @defaultValue `false`
   */
  horizontal?: boolean;
}

/**
 * This allows the menu to be conditionally rendered as a `Sheet` instead of a
 * menu.
 *
 * - `false` - always render as a `Menu`
 * - `true` - always render as a `Sheet`
 * - `"phone"` - render as a sheet only when the {@link AppSize} is considered
 *   phone (`isPhone === true`).
 *
 * @defaultValue `false`
 * @remarks \@since 5.0.0
 */
export type RenderMenuAsSheet = boolean | "phone";

/** @remarks \@since 5.0.0 */
export interface MenuConfiguration extends MenuOrientationProps {
  /** {@inheritDoc RenderMenuAsSheet} */
  renderAsSheet?: RenderMenuAsSheet;

  /**
   * @see {@link SheetPosition}
   * @defaultValue `"bottom"`
   */
  sheetPosition?: SheetPosition;

  /**
   * @see {@link SheetVerticalSize}
   * @defaultValue `"touch"`
   */
  sheetVerticalSize?: SheetVerticalSize;

  /**
   * Any children to render above the sheet's menu implementation. This would
   * normally be something like a `<DialogHeader>` or `AppBar`.
   *
   * @defaultValue `null`
   */
  sheetHeader?: ReactNode;

  /**
   * Any children to render below the sheet's menu implementation. This would
   * normally be something like a `<DialogFooter>`.
   *
   * @defaultValue `null`
   */
  sheetFooter?: ReactNode;
}

/** @remarks \@since 5.0.0 */
export type MenuConfigurationContext = Required<MenuConfiguration>;

/** @remarks \@since 5.0.0 */
export interface MenuWidgetProps
  extends HTMLAttributes<HTMLDivElement>,
    KeyboardFocusHookOptions<HTMLDivElement>,
    MenuOrientationProps {
  /**
   * An id required for a11y.
   */
  id: string;

  /**
   * Boolean if the menu should not gain the elevation styles and should only be
   * set to `true` when rendering within a `Sheet`.
   *
   * @defaultValue `false`
   */
  disableElevation?: boolean;
}

/** @remarks \@since 5.0.0 */
export interface MenuProps
  extends RenderConditionalPortalProps,
    MenuTransitionProps,
    MenuWidgetProps,
    MenuListProps {
  /**
   * Boolean if the menu is currently visible.
   */
  visible: boolean;
}

/** @remarks \@since 5.0.0 */
export interface DropdownMenuConfigurationProps {
  /**
   * An optional `aria-label` that should be applied to the `Menu` component. If
   * this is `undefined`, an `aria-labelledby` will be provided to the `Menu`
   * instead linking to the {@link id} of the `Button`.
   */
  menuLabel?: string;

  /**
   * The {@link PositionAnchor} to use for the menu. Here's the default value
   * for the anchor:
   *
   * - horizontal - `BELOW_CENTER_ANCHOR`
   * - a submenu - `TOP_RIGHT_ANCHOR`
   * - default - `TOP_INNER_RIGHT_ANCHOR`
   */
  anchor?: PositionAnchor;

  /** {@inheritDoc CalculateFixedPositionOptions} */
  fixedPositionOptions?: Readonly<CalculateFixedPositionOptions>;

  /**
   * A function that can be used to get the
   * {@link CalculateFixedPositionOptions} dynamically.
   */
  getFixedPositionOptions?(): Readonly<CalculateFixedPositionOptions>;

  /**
   * Boolean if the menu should close if the page is scrolled. The default
   * behavior is to just update the position of the menu relative to the menu
   * button until it can no longer be visible within the viewport.
   *
   * @defaultValue `false`
   */
  closeOnScroll?: boolean;

  /**
   * Boolean if the page should no longer be scrollable while the menu is
   * visible.
   *
   * @defaultValue `false`
   */
  preventScroll?: boolean;

  /**
   * Boolean if the menu should close instead of repositioning itself if the
   * browser window is resized.
   *
   * @defaultValue `false`
   */
  closeOnResize?: boolean;

  /**
   * Boolean if the menu component should not gain focus once it has mounted.
   * This should really only be set to `true` if the enter transition has been
   * disabled.
   *
   * @defaultValue `timeout === 0`
   */
  disableFocusOnMount?: boolean;

  /**
   * Boolean if the toggle element should no longer gain focus when the menu
   * loses visibility.
   *
   * Note: The toggle element will not gain focus if:
   * - the menu closed via resizing the browser window
   * - the menu closes because the menu is no longer within the viewport
   * - the current `document.activeElement` has moved outside of the menu
   *   - this generally means the `MenuItem`'s action cause the focus to move
   *     already
   * - the current `document.activeElement` is an link (`<a href="">`)
   *   - links should generally handle focus behavior themselves
   *
   * @defaultValue `timeout === 0`
   */
  disableFocusOnUnmount?: boolean;
}

/**
 * Since the `useMenu` hook was designed to work with `react-md` components,
 * this is an object of props that should be passed to the {@link Menu}
 * component to get the correct menu functionality.
 *
 * @remarks \@since 5.0.0
 */
export type ProvidedMenuProps = Required<
  Pick<MenuProps, "id" | "style" | "visible" | "onClick" | "onKeyDown">
> &
  Required<FixedPositioningTransitionCallbacks> &
  RequireAtLeastOne<LabelA11y>;

/**
 * Props that should be passed to a `Button` or `MenuItem` component to toggle
 * the visibility of a {@link Menu}.
 *
 * @remarks \@since 5.0.0
 */
export interface ProvidedMenuToggleProps<E extends HTMLElement> {
  /**
   * This will always be set to `"menu"`.
   */
  "aria-haspopup": HTMLAttributes<E>["aria-haspopup"];

  /**
   * This will be set to `true` only while the menu is `visible`.
   */
  "aria-expanded": HTMLAttributes<E>["aria-expanded"];

  /**
   * This will be set to `${baseId}-toggle` and is used for providing an
   * accessible label to the menu if the {@link BaseMenuHookOptions.menuLabel}
   * was not provided.
   *
   * @see {@link BaseMenuHookOptions.baseId}
   */
  id: string;

  /**
   * A click handler that will toggle the visibility of the menu.
   *
   * @see {@link HoverModeHookReturnValue.onClick}
   */
  onClick: MouseEventHandler<E>;

  /**
   * The event handler will allow the menu to become visible by with `ArrowUp`
   * or `ArrowDown` for horizontal menus and `ArrowLeft` or `ArrowRight` for
   * vertical menus. This will also allow the focus to move between menus within
   * a `MenuBar` with the `ArrowLeft` and `ArrowRight` keys.
   */
  onKeyDown: KeyboardEventHandler<E>;

  /**
   * The event handler will allow a `Menu` within a `MenuBar` to gain
   * visibility.
   */
  onMouseEnter: MouseEventHandler<E>;

  /**
   * This handler just cancels the `hoverTimeout` from the `MenuBar`.
   */
  onMouseLeave: MouseEventHandler<E>;
}

/**
 * This type was created since the `useContextMenu` only requires the menu
 * related props from the `useMenu` hook and I didn't want to duplicate the
 * information between the two.
 *
 * @remarks \@since 5.0.0
 */
export interface BaseMenuHookOptions
  extends DropdownMenuConfigurationProps,
    MenuOrientationProps,
    FixedPositioningTransitionCallbacks {
  /**
   * This is the `id` for the toggle element for a `DropdownMenu` that is
   * required for a11y. This is used to also create the `Menu` component's `id`
   * as `${baseId}-menu`.
   */
  baseId: string;

  /**
   * An optional style object to merge with the `Menu`'s fixed positioning
   * style.
   *
   * @see {@link useFixedPositioning}
   * @see {@link FixedPositionStyle}
   */
  style?: CSSProperties;

  /**
   * Boolean if the menu is currently visible.
   */
  visible: boolean;

  /**
   * This should be the second argument for the `useState` hook.
   *
   * ```ts
   * const [visible, setVisible] = useState(false);
   * ```
   *
   * This is used to update the visibility of the menu based on click and
   * keyboard events.
   */
  setVisible: Dispatch<SetStateAction<boolean>>;

  /**
   * Boolean if the menu is being rendered as a menuitem instead of a button.
   * Setting this to `true` implements the
   * {@link ProvidedMenuToggleProps.onKeyDown} functionality.
   *
   * @defaultValue `false`
   */
  menuitem?: boolean;

  /** {@inheritDoc TransitionScrollCallback} */
  onFixedPositionScroll?: TransitionScrollCallback<HTMLElement, HTMLDivElement>;

  /**
   * An optional function to call if the page resizes while the menu is visible.
   */
  onFixedPositionResize?: EventListener;
}

/** @remarks \@since 5.0.0 */
export interface BaseMenuHookReturnValue {
  /**
   * Maybe don't need to provide.
   */
  menuRef: Ref<HTMLDivElement>;

  /**
   * An object of props that should be provided to the {@link Menu} component.
   */
  menuProps: ProvidedMenuProps;

  /**
   * A ref containing the menu DivHTMLElement if you need access to it for your
   * use case.
   */
  menuNodeRef: RefObject<HTMLDivElement>;
}

/** @remarks \@since 5.0.0 */
export type MenuButtonTextIconSpacingProps = Pick<
  TextIconSpacingProps,
  "icon" | "iconAfter"
>;

/** @remarks \@since 5.0.0 */
export type MenuButtonIconRotatorProps = Omit<
  IconRotatorProps,
  "children" | "rotated"
>;

/** @remarks \@since 5.0.0 */
export interface BaseMenuButtonProps
  extends ButtonProps,
    MenuButtonTextIconSpacingProps {
  /**
   * An id required for accessibility and will be passed to the `<Button>`
   * component.
   *
   * @see {@link BaseMenuHookOptions.baseId}
   */
  id: string;

  /**
   * Boolean if the dropdown icon should be included with the button children.
   *
   * @defaultValue `buttonType === "icon"`
   */
  disableDropdownIcon?: boolean;

  /**
   * Any additional props to pass to the {@link IconRotator} component that
   * surrounds the {@link buttonChildren}
   */
  iconRotatorProps?: Readonly<MenuButtonIconRotatorProps>;

  /**
   * Any additional props to pass to the {@link TextIconSpacing} component that
   * surrounds the optional dropdown icon.
   */
  textIconSpacingProps?: Readonly<
    Omit<
      TextIconSpacingProps,
      "children" | keyof MenuButtonTextIconSpacingProps
    >
  >;
}

/** @remarks \@since 5.1.0 */
export interface MenuListProps {
  /**
   * An optional style to provide to the `List` component that surrounds the
   * `MenuItem` within a `Menu`.
   */
  listStyle?: CSSProperties;

  /**
   * An optional className to provide to the `List` component that surrounds the
   * `MenuItem` within a `Menu`.
   */
  listClassName?: string;

  /**
   * Any additional props to pass to the `List` component that surrounds the
   * `Menu`'s `MenuItem`s.
   */
  listProps?: Readonly<
    PropsWithRef<Omit<ListProps, "horizontal">, ListElement>
  >;
}

/** @remarks \@since 5.0.0 */
export interface BaseMenuRendererProps
  extends RenderConditionalPortalProps,
    MenuConfiguration {
  /**
   * Any additional props that should be passed to the {@link Menu} component.
   *
   * Note: use the {@link menuStyle} and {@link menuClassName} props instead of
   * including `style` or `className` here.
   */
  menuProps?: Readonly<Omit<MenuWidgetProps, "id" | "children">>;

  /**
   * An optional style object that should be merged with the menu's fixed
   * positioning styles.
   */
  menuStyle?: CSSProperties;

  /**
   * An optional className that should be passed to the menu component.
   */
  menuClassName?: string;

  /**
   * Any additional props that should be passed to the {@link Sheet} component.
   *
   * Note: use the {@link sheetStyle} and {@link sheetClassName} props instead
   * of including `style` or `className` here.
   */
  sheetProps?: Readonly<
    Omit<SheetProps, "id" | "visible" | "onRequestClose" | "children">
  >;

  /**
   * An optional style object that should be passed to the sheet.
   */
  sheetStyle?: CSSProperties;

  /**
   * An optional className that should be passed to the sheet component.
   */
  sheetClassName?: string;

  /**
   * Any additional props that should be added to the sheet's menu
   * implementation. You probably won't ever need to use this.
   */
  sheetMenuProps?: HTMLAttributes<HTMLDivElement>;
}

/** @remarks \@since 5.0.0 */
export interface BaseDropdownMenuProps
  extends DropdownMenuConfigurationProps,
    BaseMenuRendererProps,
    MenuTransitionProps {}

/** @remarks \@since 5.0.0 */
export interface DropdownMenuButtonProps
  extends BaseMenuButtonProps,
    BaseDropdownMenuProps,
    MenuButtonTextIconSpacingProps,
    MenuListProps {
  /**
   * The children to display in the button. This should normally be text or an
   * icon.
   *
   * Note: If this is an icon, set the {@link buttonType} to `"icon"` to get the
   * correct styling and remove the dropdown icon.
   */
  buttonChildren: ReactNode;
}

/**
 * @remarks \@since 5.0.0
 */
export interface MenuItemProps extends Omit<ListItemProps, "role"> {
  /**
   * An optional id for the menu item. This is generally recommended, but it can
   * be ignored.
   */
  id?: string;

  /**
   * The current role for the menu item. This will eventually be updated for
   * some of the other `menuitem*` widgets.
   *
   * @defaultValue `"menuitem"`
   */
  role?: "menuitem";

  /**
   * The tab index for the menu item. This should always stay at `-1`.
   */
  tabIndex?: number;
}

/** @remarks \@since 5.0.0 */
export interface BaseMenuItemButtonProps extends MenuItemProps {
  /**
   * An id required for accessibility and will be passed to the `<MenuItem>`
   * component.
   *
   * @see {@link BaseMenuHookOptions.baseId}
   */
  id: string;

  /**
   * Boolean if the dropdown icon should be set to the
   * {@link ListItemProps.rightAddon}.
   *
   * @defaultValue `typeof rightAddon !== "undefined"`
   */
  disableDropdownIcon?: boolean;

  /**
   * Any additional props to pass to the {@link IconRotator} component that
   * surrounds the {@link buttonChildren}
   */
  iconRotatorProps?: Readonly<MenuButtonIconRotatorProps>;
}

/** @remarks \@since 5.0.0 */
export interface DropdownMenuItemProps
  extends BaseDropdownMenuProps,
    BaseMenuItemButtonProps,
    MenuListProps {
  /**
   * The children to display in the menuitem acting as a button.
   */
  buttonChildren: ReactNode;
}

/**
 * I couldn't really figure out a nice way to have the type inferred
 * automatically based on parent menus, so this is the "best" way to allow
 * some type-safety and autocompletion I could think of for `DropdownMenu`s.
 *
 * All this type will do is make sure you don't apply both button specific props
 * with menu item specific props at the same time but won't catch any errors
 * around providing button props to a menuitem or menuitem props to a button.
 *
 * @remarks \@since 5.0.0
 */
export type DropdownMenuProps = DropdownMenuButtonProps | DropdownMenuItemProps;
