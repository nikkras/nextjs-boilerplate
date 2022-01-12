import WPAPI from 'wpapi';
// import { wpapiUser, wpapiPass, wpapiEndpoint } from '../data/settings';
import { wpapiEndpoint } from '../data/settings';

let endpoint = wpapiEndpoint;

if (typeof window !== 'undefined') {
  endpoint = `https://cors-anywhere.herokuapp.com/${endpoint}`;
}

const api = new WPAPI({ endpoint });

// const api = new WPAPI({
//   endpoint,
//   username: wpapiUser,
//   password: wpapiPass,
//   auth: true
// });

// api.videos = api.registerRoute('wp/v2', '/videos/(?P<id>)');
// api.projects = api.registerRoute('wp/v2', '/projects/(?P<id>)');

export default api;
