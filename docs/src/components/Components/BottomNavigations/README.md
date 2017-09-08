The `BottomNavigation` component is a mobile/tablet only alternative to a `NavigationDrawer`
for handling navigation. It should only be used when there are 3 to 5 links within your app.
The bottom navigation can be static or dynamic. When it is static, it will always be visible
while a dynamic navigation will disappear when the user scrolls down and appears when the user
scrolls up.

There are two types of bottom navigations: fixed and shifting. A fixed bottom navigation will
be used when there are exactly 3 links. Each icon and label will always be visible. A shifting
bottom navigation will be used when there are more than 3 links. An inactive link will only display
an icon and the active link will include a label.

Since the `BottomNavigation` is only supposed to be used for mobile devices, the examples below
have been modified to be emulated in desktop browsers.
