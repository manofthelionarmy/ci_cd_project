/**
 * test - the configuration for the test environment
 * default - the configuration for the environment when the app is running locally
 */
const dbSettings = {
    test: {
        url: 'mongodb://localhost:27017/data'
    },
    default: {
        url: 'mongodb://localhost:27017/data'
    }
}

module.exports = {
    dbSettings: dbSettings
}; 