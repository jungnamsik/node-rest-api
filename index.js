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
    let id = req.params.id
    // let user = users.filter(user = ())
    res.json(users)
})


// app.listen(3000, () => {   console.log('running');}) // bin/www.js ~~


module.exports = app 
