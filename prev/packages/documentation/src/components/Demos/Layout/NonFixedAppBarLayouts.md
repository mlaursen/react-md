Since you might not want to always have the `AppBar` fixed to the top of the
page for your layout, you can remove the fixed behavior by setting
`fixed: false` with the `appBarProps` prop:

```tsx
<Layout {...props} appBarProps={{ fixed: false }}>
  {children}
</Layout>
```

The example below will showcase this type of layout along with the
`temporary-mini` layout.
