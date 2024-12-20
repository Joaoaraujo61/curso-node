const fs = require('fs')
let arquivoAntigo = 'arquivo.txt'
let arquivoNovo = 'novo.txt'

fs.rename(arquivoAntigo, arquivoNovo, function(err){
    if(err){
        if(err.code === 'ENOENT'){
            console.log(`${arquivoAntigo} não encontrado!`)
            return
        }else{
            console.log(err)
            return
        }
    }
    console.log(`O arquivo ${arquivoAntigo}, foi renomeado como ${arquivoNovo}`)
})