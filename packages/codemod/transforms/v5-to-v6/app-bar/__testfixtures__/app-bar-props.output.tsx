import { AppBar } from "react-md";

function Example() {
  return (
    <>
      <AppBar as="div">Hello</AppBar>
      <AppBar position="fixed">Hello</AppBar>
      <AppBar position="fixed" disableFixedElevation>
        Hello
      </AppBar>
      <AppBar>
        Hello
      </AppBar>
      <AppBar>
        Hello
      </AppBar>
    </>
  );
}
