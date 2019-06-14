import { useState, useRef, CSSProperties, useCallback, useEffect } from "react";
import { useRefCache } from "@react-md/utils";

type ChangeEventHandler = React.ChangeEventHandler<HTMLTextAreaElement>;

interface Options {
  defaultStyle?: CSSProperties;
  onChange?: ChangeEventHandler;
}

export default function useTextAreaHeightAnimation({
  defaultStyle,
  onChange: propOnChange,
}: Options) {
  const [style, setStyle] = useState(defaultStyle);
  const cache = useRefCache({ style, propOnChange });

  const onChange = useCallback<ChangeEventHandler>(event => {
    const { style: prevStyle, propOnChange } = cache.current;
    if (propOnChange) {
      propOnChange(event);
    }

    const area = event.currentTarget;
    const container = area.closest(
      ".rmd-text-field-container"
    ) as HTMLDivElement | null;
    if (!container) {
      return;
    }

    const containerStyle = window.getComputedStyle(container);
    const borderHeight =
      parseInt(containerStyle.borderTopWidth || "", 10) +
      parseInt(containerStyle.borderBottomWidth || "", 10);

    const cloned = area.cloneNode() as HTMLTextAreaElement;
    cloned.style.height = "auto";
    cloned.removeAttribute("id");
    cloned.removeAttribute("name");

    container.appendChild(cloned);
    const { scrollHeight } = cloned;
    container.removeChild(cloned);

    const height = borderHeight + scrollHeight;
    if (!prevStyle || prevStyle.height !== height) {
      console.log("height:", height);
      console.log("scrollHeight:", scrollHeight);
      console.log("borderHeight:", borderHeight);
      console.log("prevStyle:", prevStyle);
      // console.log("prevStyle:", prevStyle);
      // console.log("height:", height);
      setStyle({ ...prevStyle, height });
    }

    // const style = window.getComputedStyle(cloned);
    // console.log("style.height:", style.height);
    // clv
  }, []);

  return {
    style,
    onChange,
  };
}
