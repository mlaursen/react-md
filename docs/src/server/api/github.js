import express from 'express';
import { RATE_LIMIT, RATE_REMAINING, RATE_RESET } from 'constants/headerKeys';
import { FORBIDDEN } from 'constants/responseCodes';
import { Version } from 'react-md';
import { fetchGithub } from 'utils/api';

const githubRouter = express.Router();

const headers = new Headers({
  Accept: 'application/vnd.github.v3+json',
  'User-Agent': `react-md-documentation/${Version} mlaursen`,
});

function setHeader(key, res, { headers }) {
  res.set(key, headers.get(key));
}

/**
 * Soo.. There's probably a better way to set up a proxy server, but that isn't
 * in my knowledge set. Anyways...
 *
 * GitHub likes when you specify a custom User-Agent that contains your app name/username
 * when making api calls to help with debugging and other things. At the time of making
 * this server, the User-Agent header is considered read-only in most browser still, and breaks
 * api calls. This "proxy" server was created instead to help with this.
 *
 * All this endpoint will do is proxy any requests from /api/github to the github api endpoint
 * and then provide the reate limiting headers in the response to my documentation website.
 *
 * @see https://developer.github.com/v3/#user-agent-required
 */
async function githubProxy(req, res) {
  const response = await fetchGithub(req.url, { headers });
  setHeader(RATE_LIMIT, res, response);
  setHeader(RATE_REMAINING, res, response);
  setHeader(RATE_RESET, res, response);
  if (response.ok) {
    const json = await response.json();
    res.json(json);
  } else if (response.status === FORBIDDEN) {
    const json = await response.json();
    res.status(FORBIDDEN).json(json);
  } else {
    res.status(response.status).send(response.statusText);
  }
}
githubRouter.get('*', githubProxy);

export default githubRouter;
