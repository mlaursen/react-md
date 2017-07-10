import { all, spawn } from 'redux-saga/effects';

import docgens from './docgens';
import sassdocs from './sassdocs';
import search from './search';
import themes from './themes';
import github from './github';
import airQuality from './airQuality';

export default function* sagas() {
  yield all([
    spawn(docgens),
    spawn(sassdocs),
    spawn(search),
    spawn(themes),
    spawn(github),
    spawn(airQuality),
  ]);
}
