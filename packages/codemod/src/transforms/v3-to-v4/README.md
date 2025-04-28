# Transformations

## `v3-to-v4/preset`

```sh
Usage: npx @react-md/codemod v3-to-v4/preset [options] [files...]

Arguments:
  files                        An optional glob or folder path to transform
                               (default: ".")

Options:
  -d, --dry                    Dry run (no changes are made to files) (default:
                               false)
  -p, --print                  Print transformed files to your terminal
                               (default: false)
  --parser <parser>            The file parser to use. (choices: "babel",
                               "tsx", "", default: "")
  --jscodeshift <jscodeshift>  (Advanced) Pass options directly to jscodeshift
                               (default: "")
  -h, --help                   display help for command
```

## `v3-to-v4/rename-text-to-typography`

### Changes

```diff
 import {
-  Text,
-  TextProps,
-  TextTypes,
-  TextRenderFunction,
-  TextElement,
+  Typography,
+  TypographyProps,
+  TypographyType,
+  TypographyRenderFunction,
+  TypographyHTMLElement,
   TextContainer,
 } from "@react-md/typography";

-const renderer: TextRenderFunction = ({ className }) => (
+const renderer: TypographyRenderFunction = ({ className }) => (
   <div className={className} />
 );

-const types: TextTypes[] = [
+const types: TypographyType[] = [
   "headline-1",
   "headline-2",
   "headline-3",
@@ -27,17 +27,15 @@ const types: TextTypes[] = [
   "button",
 ];

-const props: TextProps = {};
-let element: TextElement;
+const props: TypographyProps = {};
+let element: TypographyHTMLElement;

 export default function Example() {
-  return (
-    <>
-      <Text>Hello</Text>
+  return <>
+    <Typography>Hello</Typography>
     <TextContainer>
-        <Text>World!</Text>
-        <Text type="headline-1">Headline</Text>
+      <Typography>World!</Typography>
+      <Typography type="headline-1">Headline</Typography>
     </TextContainer>
-    </>
-  );
+  </>;
 }
,
```

```sh
Usage: npx @react-md/codemod v3-to-v4/rename-text-to-typography [options] [files...]

Arguments:
  files                        An optional glob or folder path to transform
                               (default: ".")

Options:
  -d, --dry                    Dry run (no changes are made to files) (default:
                               false)
  -p, --print                  Print transformed files to your terminal
                               (default: false)
  --parser <parser>            The file parser to use. (choices: "babel",
                               "tsx", "", default: "")
  --jscodeshift <jscodeshift>  (Advanced) Pass options directly to jscodeshift
                               (default: "")
  -h, --help                   display help for command
```

## `v3-to-v4/scale-transition-props`

### Changes

```diff

 export default function Example() {
   const [visible, setVisible] = useState(false);
-  return (
-    <>
+  return <>
     <button type="button" onClick={() => setVisible((p) => !p)}>
       Toggle
     </button>
-      <ScaleTransition visible={visible}>
+    <ScaleTransition transitionIn={visible}>
       <div>Something</div>
     </ScaleTransition>
-    </>
-  );
+  </>;
 }
,
```

```sh
Usage: npx @react-md/codemod v3-to-v4/scale-transition-props [options] [files...]

Arguments:
  files                        An optional glob or folder path to transform
                               (default: ".")

Options:
  -d, --dry                    Dry run (no changes are made to files) (default:
                               false)
  -p, --print                  Print transformed files to your terminal
                               (default: false)
  --parser <parser>            The file parser to use. (choices: "babel",
                               "tsx", "", default: "")
  --jscodeshift <jscodeshift>  (Advanced) Pass options directly to jscodeshift
                               (default: "")
  -h, --help                   display help for command
```
