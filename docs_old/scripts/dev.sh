#!/bin/bash

cd ..

npm run scripts:watch > /dev/null 2>&1 &

cd docs
rm -rf src/docgen
npm run docgen && npm run sassdoc && npm run server:dev
