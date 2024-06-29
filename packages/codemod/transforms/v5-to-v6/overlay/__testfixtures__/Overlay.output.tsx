import { type MouseEvent, type ReactElement, useState } from "react";
import { Overlay, useToggle } from "react-md";

interface ExampleProps {
  handleClick?(event: MouseEvent<HTMLDivElement>): void;
}

export default function Example({ handleClick }: ExampleProps): ReactElement {
  const [visible, setVisible] = useState(false);
  const [visible2, show, hide] = useToggle();

  return (<>
    <Overlay
      visible={visible}
      onClick={() => {
        setVisible(false);
      }}
    />
    <Overlay visible={visible2} onClick={hide} />
    <Overlay
      visible={visible2}
      onClick={() => {
        hide();
      }}
      noOpacity
    />
    <Overlay
      visible={visible}
      onClick={() => {
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
      onClick={() => {
        setVisible(false);
      }}
      clickable
    >
      Content
    </Overlay>
  </>);
}
