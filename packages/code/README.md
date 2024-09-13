# @react-md/code

This package provides all the functionality for displaying code in the browser
and is currently an internal-only package.

## Installation

```sh
npm install @react-md/core react-md/code sass
```

Once installed, update the main `.scss` file to include the styles:

```diff
 @use "@react-md/core";
+@use "@react-md/code";

 @include core.styles;
+@include code.styles;

+:root {
+  @if core.$color-scheme == dark {
+    @include code.use-dark-theme;
+  } @else {
+    @include code.use-light-theme;
+
+    @if core.$color-scheme == system {
+      @media (prefers-color-scheme: dark) {
+        @include code.use-dark-theme;
+      }
+    }
+  }
+}
```

## Components

### `InlineCode`

The `InlineCode` is used to render inline code that is surrounded in backticks
and other default styles.

```tsx
import { InlineCode } from "@react-md/code/InlineCode";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

function Example(): ReactElement {
  return (
    <Typography>
      Here is a paragraph of text using the <InlineCode>Typography</InlineCode>
      component from <InlineCode>@react-md/core</InlineCode>.
    </Typography>
  );
}
```

### `HighlightedCodeBlock`

The `HighlightedCodeBlock` component is used to render a `CodeBlock` with the
code highlighted using `prismjs` or another highlighting library. The
`language`, `highlightCode`, and `children` must be provided where the
`children` is the code to highlight and display.

Since I always use [prismjs](https://prismjs.com/) for code highlighting, the
`highlightCode` behavior is available in `@react-md/code/prismjs/highlight`.

```tsx
import { type ReactElement } from "react";
import { HighlightedCodeBlock } from "@react-md/code/HighlightedCodeBlock";
import { highlightCode } from "@react-md/code/prismjs/highlight";

const code = `const x = 3;`;

function Example(): ReactElement {
  return (
    <HighlightedCodeBlock language="ts" highlightCode={hbighlightCode}>
      {code}
    </HighlightedCodeBlock>
  );
}
```

### `HighlightedCodeBlockWithAppBar`

The `HighlightedCodeBlockWithAppBar` component is the same as the
`HighlightedCodeBlock` but also supports rendering the `CodeBlockAppBar` above
with some updated default styles. This component also accepts `fileName`,
`appBarProps`, and `appBarChildren` to render the `CodeBlockAppBar`.

```tsx
import { type ReactElement } from "react";
import { HighlightedCodeBlockWithAppBar } from "@react-md/code/HighlightedCodeBlockWithAppBar";
import { highlightCode } from "@react-md/code/prismjs/highlight";

const code = `const x = 3;`;

function Example(): ReactElement {
  return (
    <HighlightedCodeBlockWithAppBar
      language="ts"
      highlightCode={hbighlightCode}
      fileName="src/example.ts"
    >
      {code}
    </HighlightedCodeBlockWithAppBar>
  );
}
```

### `CodeEditor`

The `CodeEditor` component allows users to view and edit the code in real time.
The code editor should normally be setup to only support one language at a time.

See [DemoCodeEditor](../../apps/docs/src/components/DemoCode/DemoCodeEditor.tsx)
for a real world example for the react-md documentation site. It supports
Typescript, Javascript, and SCSS modules.

## Previewing Code

The code can be previewed using the `CodePreview` component or building your own
using the `useDangerousCodeRunner`.

### SCSS Modules

SCSS Modules are supported by faking any `.module.scss` imports found in the
code by converting the import into a `Proxy` that changes any property accessors
to a string based on the `fileName` and `key`. See the
[fakeCssModules](./src/fakeCssModules.ts) file for more info around generating
the class name.

Since this only handles creating the fake CSS modules, the SCSS code will still
need to be compiled somehow. The
[compileScssModules.ts](../docs-generator/src/utils/compileScssModule.ts) in the
[docs-generator](../docs-generator/README.md) shows how the react-md
documentation site compiles the SCSS and
[useScssCodeEditor.ts](../../apps/docs/src/components/DemoCode/useScssCodeEditor.ts)
shows how the code editor is able to compile any changed code.
