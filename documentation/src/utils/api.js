import 'isomorphic-fetch';

export default function fetch(endpoint) {
  return global.fetch(endpoint).then((response) => {
    if (response.ok) {
      return response.json();
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  });
}
