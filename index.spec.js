// const assert = require('assert')
const should = require('should')
const request = require('supertest')
const app = require('./index')

describe('GET /users', () => {
    describe("Success", () => {
        it('Return Array', (done) => {
            // assert.equal(1,2)
            // (1).should.equal(0)
            request(app)
                .get('/users')
                .end((err, res) => {
                    // console.log("res.body>>",res.body);
                    res.body.should.be.instanceof(Array);
                    res.body.forEach(user => {
                        user.should.have.property('name')
                    })
                    done()
                })
        })
        it('Max limit count response', done => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2)
                })
                done()
        })
    })
    describe("Failure", ()=> {
        it('limit ini check', (done) => {
            request(app)
                .get('/users?limit=one')
                .expect(400)
                .end(done)
        })
        // it()
    })
    
}) 


