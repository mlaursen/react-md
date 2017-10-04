import React from 'react';
import { CircularProgress } from 'react-md';

import FakeFeed from '../FakeFeed';

const Indeterminate = () => <FakeFeed component={CircularProgress} />;
export default Indeterminate;
