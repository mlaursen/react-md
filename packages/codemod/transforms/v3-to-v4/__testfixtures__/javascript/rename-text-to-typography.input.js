import { Text, TextContainer } from '@react-md/typography';

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
