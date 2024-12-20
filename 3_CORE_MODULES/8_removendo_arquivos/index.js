const fs = require('fs')

fs.unlink('arquivo.txt', function (err) {
    if(err){
        if(err.code === 'ENOENT'){
            console.log('ARQUIVO NÃO ENCONTRADO!')
            return
        }else{
            console.log(err)
            return
        }
    }
    
    console.log('arquivo removido')
 })