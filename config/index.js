require('dotenv').config();

module.exports = configVariables = {
    PORT: process.env.PORT || 3001,
    REDIS_PORT: process.env.REDIS_PORT || 8081,
    URI_MONGODB: process.env.URI_MONGODB,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,
}