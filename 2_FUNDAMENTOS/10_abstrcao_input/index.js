const inquirer = require('inquirer') 

inquirer.prompt([{
    name: 'p1', 
    message:'qual a primeira nota?'
},{
    name: 'p2', 
    message: 'qual a segunda nota?'
}]).then((aswers)=>{
    console.log(aswers)
    const media = (parseInt(aswers.p1)+parseInt(aswers.p2)/2)
    console.log(`a media é ${media}`)

}).catch(err => console.log(err))