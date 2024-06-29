import { Button, UnstyledButton } from "react-md";

export default function Example() {
  return (
    <>
      <Button
        onClick={() => {
          // do something
        }}
      >
        Hello!
      </Button>
      <UnstyledButton
        onClick={() => {
          // do something else
        }}
      >
        Unstyled 1
      </UnstyledButton>
      <UnstyledButton
        onClick={() => {
          // do something else
        }}
        className="example-class-name"
      >
        Unstyled 2
      </UnstyledButton>
    </>
  );
}
