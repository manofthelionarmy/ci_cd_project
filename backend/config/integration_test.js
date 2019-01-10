/**
 * test - the configuration for the test environment
 * default - the configuration for the environment when the app is running locally
 */
const dbSettings = {
    test: {
        url: 'mongodb://localhost:27017/data'
    },
    default: {
        url: 'mongodb+srv://mando:1KBNWdXuNKTAJb3e@cluster0-ewz1r.mongodb.net/hobbies?retryWrites=true'
    }
}

const serverSettings = {
    port: process.env.PORT || 3000
}

module.exports = {
    dbSettings: dbSettings,
    serverSettings: serverSettings
}; 