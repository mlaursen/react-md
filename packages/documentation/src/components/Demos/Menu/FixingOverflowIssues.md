After reading over a couple of the other examples, you might be wondering why
all this work is going into positioning menus since this seems a bit overkill.
If you've made a pop-out menu before, you'll know that you can pretty easily
position two elements together with:

```scss
.container {
  display: inline-block;
  position: relative;
}

.child {
  position: absolute;

  // or whatever positioning options you'd like
  right: 0;
  top: 0;
}
```

```html
<div class="container">
  <button type="button">Button</button>
  <div class="child" role="menu">Content</div>
</div>
```

This works for simple menus but has a few drawbacks:

- if there's any `overflow` set for a parent element in the DOM, the menu will
  only be visible within that overflow container.
- you'll need to know the height and width of both the container and menu as
  well as the position the container element is within the viewport to be able
  to determine if the menu can be shown.

To work around these issues, the `Menu` component is rendered using
`position: fixed` and all that additional positioning logic goes on behind the
scenes to handle everything for you to ensure that your menu is visible within
the viewport. This is also great just in-case you want to be able to portal
(#portal) the menu as well.

This example below will use the `position: relative` approach to show these
problems as well as the `DropdownMenu` implementation that fixes them.
