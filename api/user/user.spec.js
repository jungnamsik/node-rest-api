// const assert = require('assert')
const should = require('should')
const request = require('supertest')
const app = require('../../index')

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


describe('GET /users/:id', () => {
    describe('Success', () => {
        it('user obj return', done => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1)
                    done()
                })
        })
    } )
    describe('Failure', () => {
        it('id Not numer. res code 400', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done)
        })
        it('id Not numer. res code 404', (done) => {
            request(app)
                .get('/users/0')
                .expect(404)
                .end(done)
        })

    })
})


describe('DELETE /users/:id', ()=> {
    describe('Success', () => {
        it('Success', done =>{
            request(app)
                .delete('/users/1')
                .expect(204)
                .end((err, res) => {
                    // console.log("err>>", err);
                    // console.log("user>>", res.body);
                    done()
                })
        })

    })
    describe('Failure', () => {
        it('ID is not number', done => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done)
        })
    })
})


describe('POST /users', () => {
    describe('Success', () => {
        it('Code 201 : Ok!!', done => {
            request(app)
                .post('/users')
                .send({name:"jns9"})
                .expect(201)
                .end((err, res) => {
                    res.body.should.have.property('name', 'jns9')
                    done()
                })
        })
    })
    describe('Failure', () => {
        it('Not Name : Code 400', done => {
            request(app)
                .post('/users')
                .send({xname:"jnsX"})
                .expect(400)
                .end(done)
        })
        it('Name duplication : Code 409', done => {
            request(app)
                .post('/users')
                .send({name:"jns1"})
                .expect(409)
                .end(done)
        })
    })
})