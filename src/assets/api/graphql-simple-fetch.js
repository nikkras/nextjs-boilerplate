import { graphqlEndpoint } from '../data/settings';

export default async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  // if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
  //   headers[
  //     'Authorization'
  //   ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  // }

  const res = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables
    })
  });

  const json = await res.json();
  return {
    error: json.errors ? json.errors : false,
    data: json.data ? json.data : false
  };
}
