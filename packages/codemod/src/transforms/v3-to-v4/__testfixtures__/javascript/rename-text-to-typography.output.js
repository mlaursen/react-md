import { Typography, TextContainer } from '@react-md/typography';

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
