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

###### Using `onItemClick`

The `DropdownMenu` has a prop named `onItemClick` that will be triggered each
time an item is clicked in the menu. You will be provided:

```ts
declare function onItemClick(
  item: Item,
  itemElement: HTMLLIElement,
  event: React.MouseEvent
): void;
```

So the first argument will be the item within the `items` list, the
`itemElement` will be the `<li>` that was clicked, and finally the `event` will
be the click event that triggered this callback. This one is pretty nice since
it'll allow you to only provide one click handler to manage all the items in the
dropdown menu.

> You could also use a custom `itemRenderer` to add event listeners, but these
> two cases above are generally the easiest ones to use.
