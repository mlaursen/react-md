import { TextContainer, Typography } from "@react-md/core";
import type { ReactElement } from "react";

export default function TypographyPage(): ReactElement {
  return (
    <TextContainer>
      <Typography type="headline-1" style={{ overflowWrap: "anywhere" }}>
        Headline 1
      </Typography>
      <Typography type="body-1">
        Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus accumsan auctor neque, eu dignissim ex. Etiam vitae nisl ex.
        Maecenas ut elit risus. In consequat augue quis dui ultrices, nec
        interdum ipsum lacinia. Sed cursus justo erat, vehicula vestibulum lacus
        mattis ut. Fusce id lacinia sem, nec volutpat nunc. Suspendisse nec sem
        libero. Pellentesque diam eros, ornare ut nunc vitae, finibus feugiat
        purus. Mauris finibus aliquam consequat.
      </Typography>
      <Typography type="headline-2">Headline 2</Typography>
      <Typography type="body-1">
        Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus accumsan auctor neque, eu dignissim ex. Etiam vitae nisl ex.
        Maecenas ut elit risus. In consequat augue quis dui ultrices, nec
        interdum ipsum lacinia. Sed cursus justo erat, vehicula vestibulum lacus
        mattis ut. Fusce id lacinia sem, nec volutpat nunc. Suspendisse nec sem
        libero. Pellentesque diam eros, ornare ut nunc vitae, finibus feugiat
        purus. Mauris finibus aliquam consequat.
      </Typography>
      <Typography type="headline-3">Headline 3</Typography>
      <Typography type="body-1">
        Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus accumsan auctor neque, eu dignissim ex. Etiam vitae nisl ex.
        Maecenas ut elit risus. In consequat augue quis dui ultrices, nec
        interdum ipsum lacinia. Sed cursus justo erat, vehicula vestibulum lacus
        mattis ut. Fusce id lacinia sem, nec volutpat nunc. Suspendisse nec sem
        libero. Pellentesque diam eros, ornare ut nunc vitae, finibus feugiat
        purus. Mauris finibus aliquam consequat.
      </Typography>
      <Typography type="headline-4">Headline 4</Typography>
      <Typography type="body-1">
        Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus accumsan auctor neque, eu dignissim ex. Etiam vitae nisl ex.
        Maecenas ut elit risus. In consequat augue quis dui ultrices, nec
        interdum ipsum lacinia. Sed cursus justo erat, vehicula vestibulum lacus
        mattis ut. Fusce id lacinia sem, nec volutpat nunc. Suspendisse nec sem
        libero. Pellentesque diam eros, ornare ut nunc vitae, finibus feugiat
        purus. Mauris finibus aliquam consequat.
      </Typography>
      <Typography type="headline-5">Headline 5</Typography>
      <Typography type="headline-6">Headline 6</Typography>
      <Typography type="subtitle-1">Subtitle 1</Typography>
      <Typography type="subtitle-2">Subtitle 2</Typography>
      <Typography type="body-1">
        Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus accumsan auctor neque, eu dignissim ex. Etiam vitae nisl ex.
        Maecenas ut elit risus. In consequat augue quis dui ultrices, nec
        interdum ipsum lacinia. Sed cursus justo erat, vehicula vestibulum lacus
        mattis ut. Fusce id lacinia sem, nec volutpat nunc. Suspendisse nec sem
        libero. Pellentesque diam eros, ornare ut nunc vitae, finibus feugiat
        purus. Mauris finibus aliquam consequat.
      </Typography>
      <Typography type="body-2">
        Body 2: Cras condimentum facilisis augue vel porta. Proin eget aliquam
        libero. Class aptent taciti sociosqu ad litora torquent per conubia
        nostra, per inceptos himenaeos. Donec elementum imperdiet erat, sed
        feugiat turpis sodales a. Aenean congue luctus venenatis. Phasellus
        congue nulla justo, nec facilisis mi porttitor eu. Mauris semper ex et
        ex scelerisque placerat. Cras id urna vulputate, euismod dolor a,
        laoreet odio. Etiam accumsan vehicula nulla, quis luctus ante iaculis
        id. Quisque hendrerit, odio sit amet rutrum vestibulum, metus purus
        ultrices risus, ac vulputate mi ante id purus. Cras in felis ut lorem
        aliquam dapibus ut id lacus. Ut maximus tortor libero, sit amet mollis
        ipsum euismod id. Morbi vulputate ac sapien nec bibendum. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Cras ipsum massa,
        tristique tincidunt finibus vitae, aliquam vitae est.
      </Typography>
      <Typography type="caption" as="h5">
        Caption text
      </Typography>
      <Typography type="overline" as="h5">
        Overline text
      </Typography>
    </TextContainer>
  );
}
