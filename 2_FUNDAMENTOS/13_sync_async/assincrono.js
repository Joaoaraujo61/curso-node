const fs = require('fs')

console.log('inicio')

fs.writeFile('arquivoa.txt', 'oi', (err)=>{
    setTimeout(()=>{
        console.log('arquivo criado')
    }, 1000)
})

console.log('fim')