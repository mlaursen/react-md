export default {
  path: '*',
  getComponent(state, cb) {
    if (__CLIENT__) {
      require.ensure([], require => {
        cb(null, require('components/NotFound').default);
      });
    } else {
      cb(null, require('components/NotFound').default);
    }
  },
};
