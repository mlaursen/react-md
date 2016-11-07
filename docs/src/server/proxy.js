const fetch = require('isomorphic-fetch');

module.exports = function proxy(req, res) {
  const { url } = req.query;
  if (!url) {
    res.sendStatus(400);
  } else {
    fetch(url).then(response => response.json()).then(data => {
      res.json(data);
    }).catch(error => {
      res.sendStatus(error.status || 500);
    });
  }
};
