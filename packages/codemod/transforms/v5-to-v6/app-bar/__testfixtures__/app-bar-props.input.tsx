import { AppBar } from "react-md";

function Example() {
  return (
    <>
      <AppBar component="div">Hello</AppBar>
      <AppBar fixed={true}>Hello</AppBar>
      <AppBar fixed fixedElevation={false}>
        Hello
      </AppBar>
      <AppBar fixed={false} fixedElevation>
        Hello
      </AppBar>
      <AppBar flexWrap inheritColor>
        Hello
      </AppBar>
    </>
  );
}
