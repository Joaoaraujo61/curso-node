import chalk from "chalk"

const nota = 3
if(nota>7){
    console.log(chalk.green.bold('parabens, aprovado'))    
}else{
    console.log(chalk.bgRed.bold('recuperação'))
}
