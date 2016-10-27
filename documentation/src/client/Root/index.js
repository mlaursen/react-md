import './_styles.scss';

module.exports = require(`./Root.${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}`);
