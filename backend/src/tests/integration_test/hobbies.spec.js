const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app/server/app');
const {hobbyController} = require('../../app/controller/hobby_controller');
const {connect} = require('../../app/controller/connect');
const db = require('../../db/mongo');
const {EventEmitter} = require('events');
const hobbyAPI = require('../../app/routes/api/hobbies');
const {dbSettings} = require('config');

chai.use(chaiHttp);

mocha.describe(('Testing Hobbies API'), () => {
    describe('Testing getAll REST endpoint', () => {

        before((done) => {

            const mediator = new EventEmitter();

            mediator.on('db.ready', (connection) => {
                connect(connection, hobbyController).then((controller) => {
                    hobbyAPI.addRoutes(app, controller);
                    done();
                }); 
            }); 

            db.connect(dbSettings.test.url, mediator);

            mediator.emit('boot.ready'); 

        })
        it('should successfully get hobbies', (done) => {
            chai.request(app).get('/api/hobbies/getAll').end((err, res) => {
                chai.assert.equal(res.status, 200);
                chai.assert.exists(res.body.hobbies);

                console.log('\tHobbies: ', res.body.hobbies); 
                done();
            }); 
        });
        
        after((done) => {
            db.disconnect().then((res) => {
                console.log(res);
                done();
            });
        }); 
    }); 
}); 