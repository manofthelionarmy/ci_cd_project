const mocha = require('mocha');
const chai = require('chai');

const server = require('../../app/server/server'); 
const {serverSettings} = require('config');


describe('-- Testing Server --', () => {
    describe('Testing start function', () => {
        it('should successfully connect to port 3000', () => {
            server.start(serverSettings.port).then((serv) => {
                chai.assert.exists(serv);
                chai.assert.equal(serv.listening, true);
            }); 
        }); 
    });     
}); 