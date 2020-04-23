const users = [
    {id:1, name:"jns1"}
    ,{id:2, name:"jns2"}
    ,{id:3, name:"jns3"}
]


const index = (req,res) => {
    let limit = parseInt(req.query.limit || 10, 10)
    console.log("limit>>", limit, typeof(limit));
    
    if(Number.isNaN(limit)) {
        res.status(400).end()
    }
    else {
        res.json(users.slice(0, limit))
    }
}
const show = (req,res) => {
    let id = parseInt(req.params.id, 10)

    if(Number.isNaN(id))
        return res.status(400).end()

    const user = users.filter(user => user.id === id)[0]
    if (!user) {
        return res.status(404).end()
    }
    res.json(user)
}
const destroy = (req,res) => {
    let id = parseInt(req.params.id, 10)

    if(Number.isNaN(id))
        return res.status(400).end()

    const user = users.filter(user => user.id !== id)
    if (!user) {
        return res.status(404).end()
    }

    res.status(204).json(user)
}
const create = (req,res) => {
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
}

module.exports = {
    index
    , show
    , destroy
    , create
}