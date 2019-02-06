/**
 * test - the configuration for the test environment
 * default - the configuration for the environment when the app is running locally
 */
const dotenv = require('dotenv').config();

const dbSettings = {
    test: {
        url: 'mongodb://db:27017/data'
    },
    default: {
        url: process.env.ATLAS_URL || 'mongodb://localhost:27017/data'
    }
}

const serverSettings = {
    port: process.env.PORT || 3000
}

module.exports = {
    dbSettings: dbSettings,
    serverSettings: serverSettings
}; 