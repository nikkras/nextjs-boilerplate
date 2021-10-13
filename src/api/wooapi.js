import WooCommerceAPI from 'woocommerce-api';
import { wooKey, wooSecret, siteEndpoint } from '../data/settings';

const api = new WooCommerceAPI({
  url: siteEndpoint,
  consumerKey: wooKey,
  consumerSecret: wooSecret,
  wpAPI: true,
  version: 'wc/v3'
});

export default api;
