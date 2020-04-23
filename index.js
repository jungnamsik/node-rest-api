const express = require("express")
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const port = 3000

const users = [
    {id:1, name:"jns1"}
    ,{id:2, name:"jns2"}
    ,{id:3, name:"jns3"}
]

app.use(logger('dev'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/', (req, res) => { res.send('Hellow World!!') })

app.get('/users', (req,res) => {
    let limit = parseInt(req.query.limit || 10, 10)
    console.log("limit>>", limit, typeof(limit));
    
    if(Number.isNaN(limit)) {
        res.status(400).end()
    }
    else {
        res.json(users.slice(0, limit))
    }

})

app.get('/users/:id', (req,res) => {
    let id = parseInt(req.params.id, 10)

    if(Number.isNaN(id))
        return res.status(400).end()

    const user = users.filter(user => user.id === id)[0]
    if (!user) {
        return res.status(404).end()
    }
    res.json(user)
})

app.delete('/users/:id', (req,res) => {
    let id = parseInt(req.params.id, 10)

    if(Number.isNaN(id))
        return res.status(400).end()

    const user = users.filter(user => user.id !== id)
    if (!user) {
        return res.status(404).end()
    }

    res.status(204).json(user)
})

app.post('/users', (req,res) => {
    let name = req.body.name
    
    
    if (!name)
    return res.status(400).end()
    
    let chk_user = users.filter(x => x.name === name )
    if (chk_user.length > 0)
    return res.status(409).end()
    
    let user = {}
    let id = Date.now()
    user.name = name
    user.id = id

    users.push(user)
    // console.log("users >> ", users);
    res.status(201).json(user)
})



// app.listen(3000, () => {   console.log('running');}) // bin/www.js ~~


module.exports = app 
