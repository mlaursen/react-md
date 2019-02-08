# Context

- In a typical React application, data is passed top-down (parent to child) via
  props.
- Context provides a way to pass data through the component tree without having
  to pass props down manually at every level.
- The examples of data that needs to be globally available to many components at
  different nesting levels are “App theme”, “Logged in user type” and etc.
