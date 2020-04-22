const express = require("express")
const logger = require('morgan')
const app = express()

const port = 3000

const users = [
    {id:1, name:"jns1"}
    ,{id:2, name:"jns2"}
    ,{id:3, name:"jns3"}
]
app.use(logger('dev'))


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


// app.listen(3000, () => {   console.log('running');}) // bin/www.js ~~


module.exports = app 
