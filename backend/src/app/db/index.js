
const mongoose = require('mongoose');
/**
 * @param options - Has the dbSettings from config. Must  have either dbSettings.test or dbSettings.default passed
 * @param mediator - The event Emitter object. Can be triggered by events or send events, especially within a callback
 */
const connect = (url, mediator) => {

    mediator.once('boot.ready', () => {

        const mongoURL = url;

        console.log(url); 

        mongoose.connect(mongoURL, { useNewUrlParser: true }).then(() => {
            console.log('Connected to Database');
            message = 'Connected to Database';
            mediator.emit('db.ready', message);
        }).catch((err) => {
            mediator.emit('db.error', (err));
        });


        /*mongoose.connection.once('open', () => {
            
        });

        mongoose.connection.on('error', (err) => {
            
        });*/

    });
}

const disconnect = () => {
    return new Promise((resolve, reject) => {

        connection = mongoose.connection.close().then(() => {
            resolve('Successfully disconnectd from the database');
        }).catch((err) => {
            reject(err);
        });

    });
};

module.exports = {
    connect: connect,
    disconnect: disconnect
}; 