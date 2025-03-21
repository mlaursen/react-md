import {
  Typography,
  TypographyProps,
  TypographyType,
  TypographyRenderFunction,
  TypographyHTMLElement,
  TextContainer,
} from "@react-md/typography";

const renderer: TypographyRenderFunction = ({ className }) => (
  <div className={className} />
);

const types: TypographyType[] = [
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

const props: TypographyProps = {};
let element: TypographyHTMLElement;

export default function Example() {
  return (
    <>
      <Typography>Hello</Typography>
      <TextContainer>
        <Typography>World!</Typography>
        <Typography type="headline-1">Headline</Typography>
      </TextContainer>
    </>
  );
}
