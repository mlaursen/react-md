# @react-md/codemod

This repository contains a collection of codemod scripts for use with
[JSCodeshift](https://github.com/facebook/jscodeshift) that help update ReactMD
APIs.

> Note: If you use [prettier](https://prettier.io/), you will most likely need
> to re-format your files after running a codemod.

## Usage

```sh
Usage: npx @react-md/codemod [options] [command]

Run a codemod script to update to the latest version of ReactMD.

 Running this script without any options or commands will start an interactive wizard.


Options:
  -d, --dry                                    Dry run (no changes are made to files) (default: false)
  -p, --print                                  Print transformed files to your terminal (default: false)
  --parser <parser>                            The file parser to use. (choices: "babel", "tsx", "", default: "")
  --jscodeshift <jscodeshift>                  (Advanced) Pass options directly to jscodeshift (default: "")
  -h, --help                                   display help for command

Commands:
  v3-to-v4/preset [options] [files...]
  v5-to-v6/prerequisites/to-react-md [options] [files...]
```

## Transformations

- [v5-to-v6](./src/transforms/v5-to-v6/README.md)
- [v3-to-v4](./src/transforms/v3-to-v4/README.md)
