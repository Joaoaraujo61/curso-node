//nome

console.log(process.argv)

let args = process.argv.slice(2)
console.log(args)

let nome = args[0].split('=')[1]
console.log(nome)