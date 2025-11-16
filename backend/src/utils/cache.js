const NodeCache = require('node-cache');
const config = require('../config/config');

const cache = new NodeCache({
  stdTTL: config.cache.ttl,
  checkperiod: 120
});

const getFromCache = (key) => {
  return cache.get(key);
};

const setInCache = (key, value, ttl = config.cache.ttl) => {
  return cache.set(key, value, ttl);
};

const deleteFromCache = (key) => {
  return cache.del(key);
};

const flushCache = () => {
  return cache.flushAll();
};

module.exports = {
  getFromCache,
  setInCache,
  deleteFromCache,
  flushCache
};
