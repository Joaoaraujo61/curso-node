const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question('qual a sua linguagem prefeerida? ', (language)=> {
    if(language=='python'){
        console.log('isso nem é lin3guagem')
    }else{
        console.log(`a minha linguagem preferida é: ${language}`)
    }
    readline.close()
})