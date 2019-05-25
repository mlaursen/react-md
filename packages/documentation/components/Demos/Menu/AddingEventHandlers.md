You can add event handlers to items in multiple ways:

###### Adding an `onClick` to each item<!-- no-margin -->

Updating each item to be an object with an `onClick` attribute might be the
easiest way to add an event handler. An example would be:

```diff
-const items = ["Item 1", "Item 2", "Item 3"];
+const items = [
+  {
+    children: "Item 1",
+    onClick: () => console.log("Clicked Item 1"),
+  },
+  {
+    children: "Item 2",
+    onClick: () => console.log("Clicked Item 2"),
+  },
+  {
+    children: "Item 3",
+    onClick: () => console.log("Clicked Item 3"),
+  },
+  {
+    children: "Item 4",
+    onClick: () => console.log("Clicked Item 4"),
+  },
+]
```

###### Using custom `MenuItem`<!-- no-margin -->

The easiest option will probably be to create custom `MenuItem` components that
have their own click handlers attached. This will also make it so you can have
reusable `MenuItem`s if they need to appear in multiple menus or need to make
them have additional functionality (like connecting to redux actions). You'll
just want to import the `MenuItem` component and add it to the `items` list like
normal. The default item renderer will automatically clone each item with a
unique key as well, so you won't need to manually define keys yourself.
