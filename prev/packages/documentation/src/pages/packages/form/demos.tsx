import type { ReactElement } from "react";
import { MarkdownPage } from "components/Markdown";

export default function Demos(): ReactElement {
  return (
    <MarkdownPage>
      {`
The demos for the \`@react-md/form\` package have been split into separate
pages since there are a lot of components within this package. Navigate to
one of the following pages:

- [Text Field Demos](./text-field-demos)
- [Select Field Demos](./select-field-demos)
- [Selection Control Demos](./selection-control-demos)
- [File Input Demos](./file-input-demos)
- [Slider Demos](./slider-demos)
- [Validation Demos](./validation-demos)
`}
    </MarkdownPage>
  );
}
