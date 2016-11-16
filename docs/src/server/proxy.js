const fetch = require('isomorphic-fetch');

/**
 * Does a very simple fetch for the requested url
 *
 * @param {Object} req - The http request
 * @param {Object} res - The http response
 */
module.exports = function proxy(req, res) {
  // Soooo I don't know how to properly quote the url so that the query params get passed..
  // So gotta manually do it here :/
  const { url, start, limit } = req.query;
  if (!url) {
    res.sendStatus(400);
  } else {
    fetch(`${url}${start ? `&start=${start}` : ''}${limit ? `&limit=${limit}` : ''}`).then(response => response.json()).then(data => {
      res.json(data);
    }).catch(error => {
      res.sendStatus(error.status || 500);
    });
  }
};
