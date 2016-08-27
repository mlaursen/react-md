#!/bin/bash

cd ..

npm run scripts:watch > /dev/null 2>&1 &

cd docs
npm run dev
