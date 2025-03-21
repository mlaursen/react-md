import { useState } from "react";
import { ScaleTransition } from "@react-md/transition";

export default function Example() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setVisible((p) => !p)}>
        Toggle
      </button>
      <ScaleTransition transitionIn={visible}>
        <div>Something</div>
      </ScaleTransition>
    </>
  );
}
