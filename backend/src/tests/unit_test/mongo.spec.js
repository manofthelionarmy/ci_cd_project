const {EventEmitter} = require('events');
const chai = require('chai');
const mongo = require('../../db/mongo');
const mocha = require('mocha');
const config = require('config'); 

mocha.describe('-- Testing Mongo ---', () => {
    describe('Testing connection() function', () => {
        it('should emit Mongoose.Connection Object with an Event Emitter', (done) => {
            const mediator = new EventEmitter();

            mediator.on('db.ready', (connection) => {
                chai.assert.exists(connection);
                connection.close(() => {
                    console.log('Disconnected from MongoDB');
                });

                done();
            }); 

            mongo.connect(config.dbSettings.test.url, mediator); 

            mediator.emit('boot.ready');
        });

        it('should throw an error if a bad url is passed', () => {
            const mediator = new EventEmitter();

            chai.assert.throws(() => {
                mongo.connect({}, mediator);

                mediator.emit('boot.ready');
            });
        }); 

        it('should throw an error if Event Emitter Object is not passed', () => {
            chai.assert.throws(() => {
                mongo.connect(config.dbSettings.test.url, {}); 
            });
        });
        
    });

    describe('Testing disconnect function', () => {
        it('should successfully disconnect from the database', (done) => {
            const mediator = new EventEmitter(); 

            mediator.on('db.ready', (connection) => {
                
                mongo.disconnect().then((res) => {
                    console.log(res);
                    chai.assert.equal(res, 'Successfully disconnected from MongoDB');
                    done();
                });
            }); 

            mongo.connect(config.dbSettings.test.url, mediator);

            mediator.emit('boot.ready');
        }); 

        it('should throw an error if trying to disconnect from the DB when it is not even connected', (done) => {
        
            mongo.disconnect().catch((err) => {
                chai.assert.exists(err);
                done();
            });
        }); 
    }); 
});