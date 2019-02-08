import React, {
  Component,
  FunctionComponent,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
  createElement,
  ReactType,
  lazy,
  Suspense,
} from "react";
import { withRouter } from "react-router";
import { TextContainer, Text } from "@react-md/typography";

import { slides } from "./constants";
import Markdown from "./Markdown";
import { useCurrentContext } from "./CurrentIndex";

function getSlide(
  index: number,
  setMarkdown: Dispatch<SetStateAction<string>>,
  setElement: Dispatch<SetStateAction<ReactType | null>>
) {
  const slide = index === -1 ? "intro.md" : slides[index];
  if (slide && typeof slide !== "string") {
    setElement(slide);
    return;
  }
  return import(`./slides/${slide}`)
    .then(pkg => {
      setMarkdown(pkg.default);
    })
    .catch(e => {
      setMarkdown(`# Slide not found

### \`./slides/${slide || `slide-${index}`}.md\`
        `);
    });
}

const Fallback = () => (
  <TextContainer>
    <Text type="headline-1">Loading</Text>
  </TextContainer>
);

const CurrentSlide: FunctionComponent<any> = ({ location: { pathname } }) => {
  const current = useCurrentContext();
  const [markdown, setMarkdown] = useState("");
  const [element, setElement] = useState<ReactType | null>(null);
  const currentPage = useRef(null);
  if (currentPage.current === null) {
    currentPage.current = pathname;
    getSlide(current, setMarkdown, setElement);
  }

  if (element !== null) {
    return (
      <Suspense fallback={<Fallback />}>
        {createElement(element as ReactType, null, null)}
      </Suspense>
    );
  }

  return (
    <TextContainer>
      <Markdown markdown={markdown} />
    </TextContainer>
  );
};

export default withRouter(CurrentSlide);
