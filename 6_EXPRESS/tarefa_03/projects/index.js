const express = require('express')
const router = express.Router()
const path = require('path')

const basePath = path.join(__dirname, '../templates')


router.get('/sobre', (req, res)=>{
    res.sendFile(`${basePath}/sobre.html`)
})


module.exports = router