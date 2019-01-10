
const mongoose = require('mongoose');
const Hobby = require('../app/models/hobbies');
/**
 * @param options - Has the dbSettings from config. Must  have either dbSettings.test or dbSettings.default passed
 * @param mediator - The event Emitter object. Can be triggered by events or send events, especially within a callback
 */
const connect = (url, mediator) => {

    mediator.once('boot.ready', () => {

        const mongoURL = url; 

        // console.log(url); 
   
        mongoose.connect(mongoURL, {useNewUrlParser: true});  

            
        mongoose.connection.once('open', () => {
            console.log('Connected to Database');
            mediator.emit('db.ready', mongoose.connection);
        }); 

  
    }); 
}

const disconnect = () => {
    return new Promise((resolve, reject) => {

        const connection = mongoose.connection; 
        if(connection.readyState != 1) {
            reject(new Error('Exprienece error while disconnecting from the database')); 
        } else {
            connection.close().then(() => {
                resolve('Successfully disconnected from MongoDB');
            }); 
        }
      
    }); 
}; 

module.exports = {
    connect: connect,
    disconnect: disconnect
}; 