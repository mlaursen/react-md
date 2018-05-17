#!/bin/sh

lerna run build \
  --ignore @react-md/documentation \
  --ignore @react-md/build \
  --ignore @react-md/color \
  --ignore @react-md/internal-types \
  --ignore @react-md/internal-testing \
  --ignore react-md
