const path = require('path');

const writeFile = require('./utils/writeFile');
const compileSass = require('./utils/compileSass');


/**
 * This route will dynamically compile sass for a specific theme when needed. In production mode,
 * it will either send an already compiled css file or compile, create the file, and then send.
 *
 * In development mode, it will always compile the styles and then the compiled css as text/css to
 * the client.
 */
module.exports = function theme(req, res) {
  const fileName = req.url.replace(/\/themes\/|\.css/g, '');
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(req.url, { root: __dirname }, err => {
      if (err) {
        compileSass(fileName).then(css => writeFile(`${fileName}.css`, path.resolve(__dirname, 'themes'), css))
          .then(() => {
            res.sendFile(req.url, { root: __dirname }, error => {
              if (error) {
                Promise.reject(error);
                return;
              }
              Promise.resolve();
            });
          }).catch(error => {
            res.sendStatus(error.status || 500);
          });

        return;
      }
    });
  } else {
    compileSass(fileName).then(css => {
      res.header('Content-Type', 'text/css');
      res.send(css.toString());
    }).catch(error => {
      res.sendStatus(error.status || 500);
    });
  }
};
