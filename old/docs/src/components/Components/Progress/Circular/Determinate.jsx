import React from 'react';
import { CircularProgress } from 'react-md';

import FakeFeed from '../FakeFeed';

const Determinate = () => <FakeFeed component={CircularProgress} determinate />;
export default Determinate;
