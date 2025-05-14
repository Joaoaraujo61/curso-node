const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res)=>{
    const user = {
        name: 'João',
        surname: 'Dias',
        age: 19
    }
    const word = 'palavra'


    res.render('home', {dados: user, word})
})

app.listen(3000, ()=>{
    console.log('App funcionando')
})