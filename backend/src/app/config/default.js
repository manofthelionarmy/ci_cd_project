/**
 * test - the configuration for the test environment
 * default - the configuration for the environment when the app is running locally
 */
const dotenv = require('dotenv').config();

const dbSettings = {
    test: {
        url: 'mongodb://localhost:27017/data'
    }, 
    default: {
        url: 'mongodb://localhost:27017/data' || process.env.ATLAS_URL
    }
}

const serverSettings = {
    port: process.env.PORT || 3000
}

module.exports = {
    dbSettings: dbSettings,
    serverSettings: serverSettings
}; 