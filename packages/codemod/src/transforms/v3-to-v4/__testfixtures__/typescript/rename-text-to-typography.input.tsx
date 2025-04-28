import {
  Text,
  TextProps,
  TextTypes,
  TextRenderFunction,
  TextElement,
  TextContainer,
} from "@react-md/typography";

const renderer: TextRenderFunction = ({ className }) => (
  <div className={className} />
);

const types: TextTypes[] = [
  "headline-1",
  "headline-2",
  "headline-3",
  "headline-4",
  "headline-5",
  "headline-6",
  "subtitle-1",
  "subtitle-2",
  "body-1",
  "body-2",
  "caption",
  "overline",
  "button",
];

const props: TextProps = {};
let element: TextElement;

export default function Example() {
  return (
    <>
      <Text>Hello</Text>
      <TextContainer>
        <Text>World!</Text>
        <Text type="headline-1">Headline</Text>
      </TextContainer>
    </>
  );
}
