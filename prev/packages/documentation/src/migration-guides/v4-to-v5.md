# Migrate from v4 to v5

#### Rename the download icon to upload

If you provide custom icons for `react-md` using the `IconProvider` or
`Configuration` components, you must rename the `download` icon to be `upload`.

```diff
 const icons: ConfiguredIcons = {
   back: <KeyboardArrowLeftSVGIcon />,
   checkbox: <CheckBoxSVGIcon />,
-  download: <FileUploadSVGIcon />,
   dropdown: <ArrowDropDownSVGIcon />,
   error: <ErrorOutlineSVGIcon />,
   expander: <KeyboardArrowDownSVGIcon />,
   forward: <KeyboardArrowRightSVGIcon />,
   menu: <MenuSVGIcon />,
   notification: <NotificationsSVGIcon />,
   password: <RemoveRedEyeSVGIcon />,
   radio: <RadioButtonCheckedSVGIcon />,
   selected: <CheckSVGIcon />,
   sort: <ArrowUpwardSVGIcon />,
+  upload: <FileUploadSVGIcon />,
 };
```

#### Update DropdownMenu for the new API

```diff
 import type { ReactElement } from "react";
-import { DropdownMenu } from "@react-md/menu";
+import { DropdownMenu, MenuItem } from "@react-md/menu";

 export default function Example(): ReactElement (
-  <DropdownMenu
-    id="example-dropdown-menu"
-    items={[
-      { onClick: () => console.log("Clicked Item 1"), children: "Item 1" },
-      { onClick: () => console.log("Clicked Item 2"), children: "Item 2" },
-      { onClick: () => console.log("Clicked Item 3"), children: "Item 3" },
-    ]}
-  >
-    Dropdown
+  <DropdownMenu id="example-dropdown-menu" buttonChildren="Dropdown">
+    <MenuItem onClick={() => console.log("Clicked Item 1")}>Item 1</MenuItem>
+    <MenuItem onClick={() => console.log("Clicked Item 2")}>Item 2</MenuItem>
+    <MenuItem onClick={() => console.log("Clicked Item 3")}>Item 3</MenuItem>
   </DropdownMenu>
 );
```

#### Update DropdownMenuItem to be DropdownMenu

The `DropdownMenuItem` no longer exists since the nested dropdown menu behavior
has been integrated into the `DropdownMenu` component:

```diff
 import type { ReactElement } from "react";
-import { DropdownMenu, DropdownMenuItem } from "@react-md/menu";
+import { DropdownMenu, MenuItem } from "@react-md/menu";

 export default function Example(): ReactElement (
-  <DropdownMenu
-    id="example-dropdown-menu"
-    items={[
-      "Item 1",
-      "Item 2",
-      "Item 3",
-      <DropdownMenuItem
-        id="nested-dropdown-menu"
-        items={["Subitem 1", "Subitem 2", "Subitem 3"]}
-      >
-        Submenu
-      </DropdownMenuItem>,
-    ]}
-  >
-    Dropdown
+  <DropdownMenu id="example-dropdown-menu" buttonChildren="Dropdown">
+    <MenuItem>Item 1</MenuItem>
+    <MenuItem>Item 2</MenuItem>
+    <MenuItem>Item 3</MenuItem>
+    <DropdownMenu
+      id="nested-dropdown-menu"
+      buttonChildren="Submenu"
+    >
+      <MenuItem>Subitem 1</MenuItem>
+      <MenuItem>Subitem 2</MenuItem>
+      <MenuItem>Subitem 3</MenuItem>
+    </DropdownMenu>
   </DropdownMenu>
 );
```

#### Update useContextMenu for the new API

```diff
 const id = "table-row-id";
-const [menuProps, onContextMenu] = useContextMenu();
+const { menuProps, onContextMenu } = useContextMenu();

 return (
   <>
     <TableRow id={id} tabIndex={0} onContextMenu={onContextMenu}>
       <TableCell>Cell 1</TableCell>
       <TableCell>Cell 2</TableCell>
       <TableCell>Cell 3</TableCell>
     </TableRow>
-    <Menu aria-label="Some menu label" controlId={id} {...menuProps} portal>
-     <List>
     <Menu {...menuProps}>
       <MenuItem>Item 1</MenuItem>
       <MenuItem>Item 2</MenuItem>
       <MenuItem>Item 3</MenuItem>
-      </List>
     </Menu>
   </>
 ):
```

#### Update MenuItemRadio groups to be wrapped with the MenuItemGroup

If you have multiple groups of `MenuItemRadio`, `MenuItemCheckbox`, or
`MenuItemSwitch` in your menu, the `MenuItemRadio` should be wrapped in this new
component for increased accessibility. The `MenuItemSeparator` component should
also be used to help separate different groups.

```diff
 import { ReactElement, useState } from "react";
-import { DropdownMenu } from "@react-md/menu";
+import { DropdownMenu, MenuItemGroup, MenuItemSeparator } from "@react-md/menu";
 import { MenuItemRadio, MenuItemSwitch } from "@react-md/form";

 function Example(): ReactElement {
   const [value, setValue] = useState("value1");
   const [checked, setChecked] = useState(false);

   return (
     <DropdownMenu id="dropdown-menu-id" buttonChildren="Button">
       <MenuItemSwitch
         id="switch-id"
         checked={checked}
         onCheckedChange={nextChecked => setChecked(nextChecked)}
       >
         Light mode
       </MenuItemSwitch>
-      <div role="group" aria-label="My Group Label">
+      <MenuItemSeparator />
+      <MenuItemGroup aria-label="My Group Label">
         <MenuItemRadio
           id="radio-1"
           checked={value === "value1"}
           onCheckedChange={() => setValue("value1")}
         >
           Radio 1
         </MenuItemRadio>
         <MenuItemRadio
           id="radio-2"
           checked={value === "value2"}
           onCheckedChange={() => setValue("value2")}
         >
           Radio 2
         </MenuItemRadio>
         <MenuItemRadio
           id="radio-3"
           checked={value === "value3"}
           onCheckedChange={() => setValue("value3")}
         >
           Radio 3
         </MenuItemRadio>
-      </div>
+      </MenuItemGroup>
     </DropdownMenu>
   );
 }
```

#### Update tests that use a DropdownMenu to include the AppSizeListener

Since the `DropdownMenu` can now render as a `Sheet` when the `AppSize` is
`phone`, your tests might throwing an error about a missing `AppSizeListener`.

If you are using `@testing-library/react`, you can just follow the example in my
[template-rmd](https://github.com/mlaursen/template-rmd). Check out the
[src/test-utils.tsx](https://github.com/mlaursen/template-rmd/blob/react-md%40v4.0.3/src/test-utils.tsx)
and
[src/components/\_\_tests\_\_/LinkUnstyled.tsx](https://github.com/mlaursen/template-rmd/blob/react-md%40v4.0.3/src/components/__tests__/LinkUnstyled.tsx)
for example usage. This is basically the custom render documentation from the
[React Testing Library documentation](https://testing-library.com/docs/react-testing-library/setup#custom-render).

If you aren't, just wrap all your tests that use a `DropdownMenu` in either the
`Configuration` or `AppSizeListener` component.

#### Update `useHoverMode` for the new API

```diff
 import { BELOW_CENTER_ANCHOR, useHoverMode } from "@react-md/utils";

 export default function StickyHoverMode(): ReactElement {
-  const { stuck, active, handlers, stickyHandlers, visible, setVisible } =
-    useHoverMode({
-      sticky: true,
-    });
+  const { stuck, active, handlers, hoverHandlers, visible, setVisible } =
+    useHoverMode();
   const buttonRef = useRef<HTMLButtonElement>(null);

   return (
     <>
-      <Button {...stickyHandlers} ref={buttonRef}>
+      <Button {...handlers} ref={buttonRef}>
         Button
       </Button>
       <FixedDialog
-        {...handlers}
+        {...hoverHandlers}
         aria-label="Additional Information"
         id="some-dialog-id"
         visible={visible}
```

#### Opt-in to mobile action sheet menus

If you want to start rendering menus as sheets on phones throughout your app,
update the main `Configuration` component:

```diff
 import type { ReactElement, ReactNode } from "react";
 import { Link, useLocation } from "react-router-dom";
 import {
   ArrowDropDownSVGIcon,
   ArrowUpwardSVGIcon,
   CheckBoxSVGIcon,
   CheckSVGIcon,
   ConfiguredIcons,
   Configuration,
   ErrorOutlineSVGIcon,
   FileUploadSVGIcon,
   KeyboardArrowDownSVGIcon,
   KeyboardArrowLeftSVGIcon,
   KeyboardArrowRightSVGIcon,
   Layout as RMDLayout,
+  MenuConfiguration,
   MenuSVGIcon,
   NotificationsSVGIcon,
   RadioButtonCheckedSVGIcon,
   RemoveRedEyeSVGIcon,
   useLayoutNavigation,
 } from "react-md";

 import navItems from "./navItems";

 const icons: ConfiguredIcons = {
   back: <KeyboardArrowLeftSVGIcon />,
   checkbox: <CheckBoxSVGIcon />,
   dropdown: <ArrowDropDownSVGIcon />,
   error: <ErrorOutlineSVGIcon />,
   expander: <KeyboardArrowDownSVGIcon />,
   forward: <KeyboardArrowRightSVGIcon />,
   menu: <MenuSVGIcon />,
   notification: <NotificationsSVGIcon />,
   password: <RemoveRedEyeSVGIcon />,
   radio: <RadioButtonCheckedSVGIcon />,
   selected: <CheckSVGIcon />,
   sort: <ArrowUpwardSVGIcon />,
   upload: <FileUploadSVGIcon />,
 };

+const menuConfiguration: MenuConfiguration = {
+  renderAsSheet: "phone",
+};

 interface LayoutProps {
   children: ReactNode;
 }

 export default function Layout({ children }: LayoutProps): ReactElement {
   const { pathname } = useLocation();

   return (
-    <Configuration icons={icons}>
+    <Configuration icons={icons} menuConfiguration={menuConfiguration}>
       <RMDLayout
         tabletLayout="temporary"
         landscapeTabletLayout="temporary"
         desktopLayout="temporary"
         largeDesktopLayout="temporary"
         treeProps={useLayoutNavigation(navItems, pathname, Link)}
       >
         {children}
       </RMDLayout>
     </Configuration>
   );
 }
```
