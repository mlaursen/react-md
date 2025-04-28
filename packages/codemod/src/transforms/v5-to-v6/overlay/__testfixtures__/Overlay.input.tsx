import { type MouseEvent, type ReactElement, useState } from "react";
import { Overlay, useToggle } from "react-md";

interface ExampleProps {
  handleClick?(event: MouseEvent<HTMLDivElement>): void;
}

export default function Example({ handleClick }: ExampleProps): ReactElement {
  const [visible, setVisible] = useState(false);
  const [visible2, show, hide] = useToggle();

  return (
    <>
      <Overlay
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}
      />
      <Overlay visible={visible2} onRequestClose={hide} />
      <Overlay
        visible={visible2}
        onRequestClose={() => {
          hide();
        }}
        hidden
      />
      <Overlay
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}
        clickable
      >
        Content
      </Overlay>
      <Overlay
        visible={visible}
        onClick={(event) => {
          handleClick?.(event);
        }}
        onRequestClose={() => {
          setVisible(false);
        }}
        clickable
      >
        Content
      </Overlay>
    </>
  );
}
