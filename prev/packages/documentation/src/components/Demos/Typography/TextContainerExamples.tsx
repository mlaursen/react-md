import type { ReactElement } from "react";
import { TextContainer, Typography } from "@react-md/typography";

export default function TextContainerExamples(): ReactElement {
  return (
    <>
      <TextContainer>
        <Typography type="headline-4">
          This example will update the size based on the viewport to switch
          between desktop and mobile line widths.
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus
          finibus sodales. Nullam pretium lorem eu scelerisque cursus. Morbi
          aliquet varius nisl. Nullam viverra, dolor ut suscipit congue, massa
          nibh commodo lectus, eu convallis sapien mauris a libero. Suspendisse
          porttitor dolor quis pulvinar semper. Aliquam diam neque, accumsan nec
          aliquam ut, dignissim non nibh. Sed consectetur dolor nec sem volutpat
          rutrum. Proin pellentesque arcu nec varius luctus. Maecenas vel sapien
          a lectus faucibus finibus ut quis sapien. Mauris vitae turpis
          pulvinar, tristique orci in, sollicitudin urna. Aliquam pellentesque
          commodo sem sed volutpat.
        </Typography>
      </TextContainer>
      <TextContainer size="desktop">
        <Typography type="headline-4">
          This example will always use the desktop typography line width.
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus
          finibus sodales. Nullam pretium lorem eu scelerisque cursus. Morbi
          aliquet varius nisl. Nullam viverra, dolor ut suscipit congue, massa
          nibh commodo lectus, eu convallis sapien mauris a libero. Suspendisse
          porttitor dolor quis pulvinar semper. Aliquam diam neque, accumsan nec
          aliquam ut, dignissim non nibh. Sed consectetur dolor nec sem volutpat
          rutrum. Proin pellentesque arcu nec varius luctus. Maecenas vel sapien
          a lectus faucibus finibus ut quis sapien. Mauris vitae turpis
          pulvinar, tristique orci in, sollicitudin urna. Aliquam pellentesque
          commodo sem sed volutpat.
        </Typography>
      </TextContainer>
      <TextContainer size="mobile">
        <Typography type="headline-4">
          This example will always use the mobile typography line width.
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus
          finibus sodales. Nullam pretium lorem eu scelerisque cursus. Morbi
          aliquet varius nisl. Nullam viverra, dolor ut suscipit congue, massa
          nibh commodo lectus, eu convallis sapien mauris a libero. Suspendisse
          porttitor dolor quis pulvinar semper. Aliquam diam neque, accumsan nec
          aliquam ut, dignissim non nibh. Sed consectetur dolor nec sem volutpat
          rutrum. Proin pellentesque arcu nec varius luctus. Maecenas vel sapien
          a lectus faucibus finibus ut quis sapien. Mauris vitae turpis
          pulvinar, tristique orci in, sollicitudin urna. Aliquam pellentesque
          commodo sem sed volutpat.
        </Typography>
      </TextContainer>
    </>
  );
}
