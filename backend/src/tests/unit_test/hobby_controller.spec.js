const chai = require('chai');
const mongo = require('../../db/mongo');
const mocha = require('mocha');
const config = require('config');
const {EventEmitter} = require('events');
const {hobbyController} = require('../../app/controller/hobby_controller');
const {connect} = require('../../app/controller/connect');
const mongoose = require('mongoose');

mocha.describe('-- Testing Controller --', () => {
   
    describe('Testing getAllHobbies function', () => {

        it('should get hobbies', (done) => {

            const mediator = new EventEmitter();

            mediator.on('db.ready', (db_connection) => {
                connect(db_connection, hobbyController)
                    .then((repo) => {
                        return repo.getAllHobbies();
                    }).then(hobbies => {
                        console.log('Retrieved hobbies: ', hobbies);
                        chai.assert.exists(hobbies);
                        db_connection.close();
                        done();
                    });


            });

            mongo.connect(config.dbSettings.test.url, mediator);
            mediator.emit('boot.ready');
        });


        it('should throw an error if the db connection is not a Monogoose Connection Object', (done) => {

            const mediator = new EventEmitter();

            mediator.on('db.ready', (db_connection) => {
                connect(5, hobbyController).then((repo) => {
                    return repo.getAllHobbies();
                }).catch((err) => {
                    console.log('\tError:',err.message);
                    chai.assert.exists(err)
                    done();
                });


            });

            mongo.connect(config.dbSettings.test.url, mediator);

            mediator.emit('boot.ready');
        });

    }); 

    

    describe('Testing the disconnect function', () => {
        it('should throw an error when trying to disconnect', (done) => {
            
            connect(mongoose, hobbyController).then((repo) => {
                repo.disconnect().catch((err) => {
                    console.log('\tError:', err.message);
                    chai.assert.exists(err);
                    done();
                })
            });
        }); 

        it('should successfully disconnect from MongoDB', (done) => {
            

            const mediator = new EventEmitter();

            mediator.on('db.ready', (db_connection) => {
                connect(db_connection, hobbyController).then((repo) => {
                    repo.disconnect().then((res) => {
                        chai.assert.equal(res, 'Successfully disconnected from MongoDB');
                        done();
                    })
                }); 

            });

            mongo.connect(config.dbSettings.test.url, mediator);

            mediator.emit('boot.ready');
        }); 

        describe('Testing addHobby function', () => {
            it('should successfully add a hobby', (done) => {
                const mediator = new EventEmitter();

                mediator.on('db.ready', (db_connection) => {
                    connect(db_connection, hobbyController).then((controller) => {
                        controller.addHobby('Armando', 'coding').then((res) => {
                            chai.assert.equal(res.message, 'Successfully saved hobby'); 
                            console.log(res.hobby);
                            done();
                        })
                    });

                });

                mongo.connect(config.dbSettings.test.url, mediator);

                mediator.emit('boot.ready');
            }); 
        });
    })
});