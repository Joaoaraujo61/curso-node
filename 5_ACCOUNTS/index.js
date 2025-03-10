const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')


operation()

function operation(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: [
                'Criar Conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                'Sair',
            ],
        },
    ]).then((answer) => {
        const action = answer['action']
        switch(action){
            case "Criar Conta":
                createAccount()
                break
            case "Consultar Saldo":
                getAccountBalace()
                break
            case 'Depositar':
                deposit()
                break
            case 'Sacar':
                withdraw()
                break
            case 'Sair':
                console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
                process.exit()
                break
        }
    })
    .catch((err) => console.log(err))
}

//create an account

function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns po escolher o nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    buildAccount()
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para a sua conta:',
        },
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        console.info(accountName)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Essa contá já existe!'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`,'{"balance": 0}',
            function(err){
                console.log('Erro ao criar conta ' + err)
            },
        )

        console.log(chalk.green('Parabéns a sua conta foi criada,'))
        operation()
    })
    .catch((err) => console.log(err))
}

//addd an amount to user account

function deposit(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta:',
        },
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        //verify if account exists
        if(!checkAccount(accountName)){
            return deposit()
        }
    
        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar?',
            },
        ]).then((answer) => {
            const amount = answer['amount']

            //add amount
            addAmount(accountName, amount)
            operation()
        }).catch((err) => console.log(`Erro: ${err}`))
    })
    .catch((err => console.log(`Erro: ${err}`)))
    
}

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
        return false
    }else{
        return true
    }
    
}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente!'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        },
    )
    console.log(chalk.green(`Foi depositado o valor de R$${amount}`))
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
        encoding: 'utf8',
        flag: 'r',
    })

    return JSON.parse(accountJSON)
}

//show account balance

function getAccountBalace(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?',
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        //verify if account exists
        if(!checkAccount(accountName)){
            return getAccountBalace()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Olá o saldo da sua conta é ${accountData.balance}`))
        operation()

    })
    .catch((err) => console.log(`Erro: ${err}`))
}
//withdraw an amount from user account

function withdraw(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?',
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return withdraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Qual valor deseja sacar?',
            }
        ])
        .then((answer) =>{
            const amount = answer['amount'] 

            removeAmount(accountName, amount)
        })
        .catch((err) => console.log(`Erro: ${err}`))

    })
    .catch((err) => console.log(`Erro: ${err}`))
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, insira uma valor válido!'))
        return withdraw()
    }
    
    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('Valor inváido!'))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        },
    )

    console.log(chalk.bgGreen.black(`Foi realizado um saque de ${amount} da sua conta!`))
    operation()
}
