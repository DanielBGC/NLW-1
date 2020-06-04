const express = require("express")

//executa a função express
const server = express()

//configura a pasta public
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
    return response.render("search.html")
})

//liga o servidor na porta 3000
server.listen(3000)