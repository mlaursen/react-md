let serverUrl = '';
if (process.env.NODE_ENV === 'production') {
  serverUrl = PUBLIC_URL.replace('/v1', '');
}

/**
 * Gets the fully resolved hostname for the current request.
 *
 * Ex:
 * 'http://localhost:8080'
 *
 * @param {Request} req - The http request from express.
 * @return {String} the fully resolved hostname.
 */
export default function getServerUrl(req) {
  return serverUrl || `${req.protocol}://${req.get('host')}`;
}

/**
 * Gets the fully resolved url with the hostname.
 *
 * Ex:
 * 'https://react-md.dev/v1/components/text-fields'
 *
 * @param {Request} req - The http request from express.
 * @return {String} the fully resolved hostname.
 */
export function getUrl(req) {
  return `${getServerUrl(req)}${req.originalUrl}`;
}
