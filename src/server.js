//importa a dependência express
const express = require("express")

//executa a função express
const server = express()

//importa o banco de dados
const db = require("./database/db.js")

//configura a pasta public para ser utilizada
server.use(express.static("public"))

//configurando a template engine (comunicação entre o HTML e o back-end)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configura caminhos do servidor:
//(1) página inicial
server.get("/",function(require, response) {
    //2º parâmetro = variável a ser enviada para o HTML pelo nunjucks
    return response.render("index.html")
})

//(2) página de cadastro
server.get("/register",function(require, response) {
    return response.render("register.html")
})

//(3) página de listagem
server.get("/search",function(require, response) {

    //pega os dados do banco de dados
    db.all(`SELECT * FROM places`, function(error, rows) {
        if(error) 
            return console.log(error)
        else {
            
            //número de elementos existentes no array
            const total  = rows.length

            //mostra a página html com os dados do banco de dados
            return response.render("search.html", {places: rows, total: total} )
        }
    })
})

//liga o servidor na porta 3000
server.listen(3000)