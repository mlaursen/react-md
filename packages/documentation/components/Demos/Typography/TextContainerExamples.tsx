import React, { FC, Fragment } from "react";
import { TextContainer, Text } from "@react-md/typography";

const TextContainerExamples: FC = () => (
  <Fragment>
    <TextContainer>
      <Text type="headline-4">
        This example will update the size based on the viewport to switch
        between desktop and mobile line widths.
      </Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus
        finibus sodales. Nullam pretium lorem eu scelerisque cursus. Morbi
        aliquet varius nisl. Nullam viverra, dolor ut suscipit congue, massa
        nibh commodo lectus, eu convallis sapien mauris a libero. Suspendisse
        porttitor dolor quis pulvinar semper. Aliquam diam neque, accumsan nec
        aliquam ut, dignissim non nibh. Sed consectetur dolor nec sem volutpat
        rutrum. Proin pellentesque arcu nec varius luctus. Maecenas vel sapien a
        lectus faucibus finibus ut quis sapien. Mauris vitae turpis pulvinar,
        tristique orci in, sollicitudin urna. Aliquam pellentesque commodo sem
        sed volutpat.
      </Text>
    </TextContainer>
    <TextContainer size="desktop">
      <Text type="headline-4">
        This example will always use the desktop typography line width.
      </Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus
        finibus sodales. Nullam pretium lorem eu scelerisque cursus. Morbi
        aliquet varius nisl. Nullam viverra, dolor ut suscipit congue, massa
        nibh commodo lectus, eu convallis sapien mauris a libero. Suspendisse
        porttitor dolor quis pulvinar semper. Aliquam diam neque, accumsan nec
        aliquam ut, dignissim non nibh. Sed consectetur dolor nec sem volutpat
        rutrum. Proin pellentesque arcu nec varius luctus. Maecenas vel sapien a
        lectus faucibus finibus ut quis sapien. Mauris vitae turpis pulvinar,
        tristique orci in, sollicitudin urna. Aliquam pellentesque commodo sem
        sed volutpat.
      </Text>
    </TextContainer>
    <TextContainer size="mobile">
      <Text type="headline-4">
        This example will always use the mobile typography line width.
      </Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus
        finibus sodales. Nullam pretium lorem eu scelerisque cursus. Morbi
        aliquet varius nisl. Nullam viverra, dolor ut suscipit congue, massa
        nibh commodo lectus, eu convallis sapien mauris a libero. Suspendisse
        porttitor dolor quis pulvinar semper. Aliquam diam neque, accumsan nec
        aliquam ut, dignissim non nibh. Sed consectetur dolor nec sem volutpat
        rutrum. Proin pellentesque arcu nec varius luctus. Maecenas vel sapien a
        lectus faucibus finibus ut quis sapien. Mauris vitae turpis pulvinar,
        tristique orci in, sollicitudin urna. Aliquam pellentesque commodo sem
        sed volutpat.
      </Text>
    </TextContainer>
  </Fragment>
);

export default TextContainerExamples;
