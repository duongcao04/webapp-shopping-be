const redis = require('redis');
const _CONF = require('../config');

const client = redis.createClient({
    port: _CONF.REDIS_PORT,
    host: '127.0.0.1'
})

client.on('error', function (error) {
    console.error(error)
})

client.on('connected', function () {
    console.log('connected')
})

client.on('ready', function () {
    console.log('Redis is ready')
})

module.exports = client