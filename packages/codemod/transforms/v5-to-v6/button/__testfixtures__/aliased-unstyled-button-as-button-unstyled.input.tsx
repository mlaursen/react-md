import { Button, UnstyledButton as ButtonUnstyled } from "react-md";

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
      <ButtonUnstyled
        onClick={() => {
          // do something else
        }}
      >
        Unstyled 1
      </ButtonUnstyled>
      <ButtonUnstyled
        onClick={() => {
          // do something else
        }}
        className="example-class-name"
      >
        Unstyled 2
      </ButtonUnstyled>
    </>
  );
}
