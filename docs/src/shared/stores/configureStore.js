module.exports = require(`./configureStore.${!__DEV__ ? 'prod' : 'dev'}`);
