import { AppBarTitle } from "react-md";

function Example() {
  return (
    <>
      <AppBarTitle noWrap>Hello</AppBarTitle>
      <AppBarTitle noWrap={true}>Hello</AppBarTitle>
      <AppBarTitle noWrap={false}>Hello</AppBarTitle>
      <AppBarTitle keyline>Hello</AppBarTitle>
      <AppBarTitle keyline={true}>Hello</AppBarTitle>
      <AppBarTitle keyline={false}>Hello</AppBarTitle>
    </>
  );
}
