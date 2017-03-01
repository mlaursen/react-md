module.exports = require(`./config.${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}`);
