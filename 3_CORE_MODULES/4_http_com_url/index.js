const http = require('http')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {
    const urlInfo = url.parse(req.url, true)
    const name = urlInfo.query.nome

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    
    if(!name){
        res.end(
            '<h1>Preencha o seu nome:</h1><form action="get"><input type="text" name="nome"><input type="submit" value="enviar"></form>'
        )
    }else{
        res.end(`<h1>Seja bem-vindo: ${name}!</h1>`)
    }
})

server.listen(port, ()=>{
    console.log('servidor rodando na porta ' + port) 
})
