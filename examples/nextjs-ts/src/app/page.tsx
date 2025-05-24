import { Link } from '@react-md/core/link/Link';
import { TextContainer } from '@react-md/core/typography/TextContainer';
import { Typography } from '@react-md/core/typography/Typography';

export default function Home() {
  return (
    <TextContainer>
      <Typography>
        This is a simple app bootstrapped with{" "}
        <Link href="https://react-md.dev">react-md</Link>{" "}
        and <Link href="https://nextjs.org">Next.js</Link>.
      </Typography>
    </TextContainer>
  );
}