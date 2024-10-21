import inquirer from 'inquirer'
import chalk from 'chalk'

try{
    inquirer.prompt([
        {
            name: 'nome',
            message: 'qual o seu nome?'
        },
        {
            name: 'idade',
            message: 'qual sua idade?'
        }
    ]).then(answers => {
        if(!answers.nome || !answers.idade){
            throw new Error('nome e idade são obrigatórios')
        }
        console.log(chalk.black.bgYellow(`seu nome é ${answers.nome} e voce tem ${answers.idade}`))
    })
}catch{
    console.log(`Erro ${err}`)
}