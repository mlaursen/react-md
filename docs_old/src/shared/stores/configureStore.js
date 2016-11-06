module.exports = require(`./configureStore.${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}`);
