const express = require('express')
const router = express.Router()
const ctrl = require('./user.ctrl')


// router.get('/', (req, res) => { res.send('Hellow World!!') })
router.get('/', ctrl.index )
router.get('/:id', ctrl.show)
router.delete('/:id', ctrl.destroy )
router.post('/', ctrl.create)


module.exports = router 

//google cloud 연결 후 테스트 수정
