const express = require('express')
const router = express.Router()
const { Createcrud, Getcrud, Getcrudid, Updatecrud, Deletecrud } = require('../Controller/Crudcontroller')

router.post('/create', Createcrud)
router.get('/get', Getcrud)
router.get('/get/:id', Getcrudid)
router.patch('/update/:id', Updatecrud)
router.delete('/delete/:id', Deletecrud)

module.exports = router