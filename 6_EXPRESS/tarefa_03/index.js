const express = require('express')
const app = express()
const path = require('path')

const basePath = path.join(__dirname, 'templates')
const port = 5000
const projectsRoutes = require('./projects')

app.use(express.static('public'))

app.use('/', projectsRoutes)

app.get('/', (req, res)=>{
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, ()=>{
    console.log(`Rodando na porta: ${port}`)
})