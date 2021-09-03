const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey:'qQy7u6Ye3isvKtLQXRvmJAnUZ0q0H6Kg',
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;