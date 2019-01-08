const mongoose = require('mongoose');

const connect = (options, mediator) => {
    mediator.once('boot.ready', () => {
        const url = options.url; 
        mongoose.connect(url, {useNewUrlParser: true});  
        
        
        mongoose.connection.once('open', () => {
            console.log('Connected to Database');
            mediator.emit('db.ready', mongoose.connection);
        });

    })
}

module.exports = {
    connect: connect
}; 