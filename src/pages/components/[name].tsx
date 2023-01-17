import type { GetStaticPaths, GetStaticProps } from "next";
import type { ReactElement } from "react";
import { FlatButtons } from "src/components/ButtonExamples/FlatButtons";
import { Example } from "src/components/Example";
import { PhoneEmulator } from "src/components/PhoneEmulator";
import { extractExamples } from "src/utils/examples";
import { qsToString } from "src/utils/qs";
import { toTitleCase } from "src/utils/string";

export interface ExamplesProps {
  name: string;
  title: string;
}

export default function Examples(props: ExamplesProps): ReactElement {
  const { name, title } = props;
  // console.log("props:", props);
  return (
    <>
      <Example title={title}>
        <FlatButtons />
      </Example>
    </>
  );
}

export const getStaticProps: GetStaticProps<ExamplesProps> = async ({
  params,
}) => {
  const name = qsToString(params?.name);
  const title = toTitleCase(name);
  try {
    const result = await extractExamples(name);

    console.log("result:", result);
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      name,
      title,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["/components/button"],
    fallback: false,
  };
};
