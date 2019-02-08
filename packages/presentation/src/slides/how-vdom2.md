# Virtual DOM (Cont.)

```html
<div class="some-div">
  <button type="button">Button</button>
</div>
```

```js
const tree = {
  type: "div",
  props: {
    className: "some-div",
    children: [
      {
        type: "button",
        props: {
          type: "button",
          children: ["Button"],
        },
      },
    ],
  },
};
```
