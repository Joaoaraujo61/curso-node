//mais de um valor
const x = 20
const y = 'joao'
const z = [1,2]

console.log(x,y,z)

//contagem de impressões
console.count(`o valor de x é: ${x}, contagem`)
console.count(`o valor de x é: ${x}, contagem`)

//variavel entre strings
console.log('o nome é %s, ele é programador', y)

//limpar console
setTimeout(()=>{
    console.clear()
}, 2000);