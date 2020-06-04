const express = require("express")

//executa a função express
const server = express()

//configura a pasta public
server.use(express.static("public"))

//configura caminhos do servidor:
//(1) página inicial
server.get("/",function(require, response) {
    response.sendFile(__dirname + "/views/index.html")
})

//(2) página de cadastro
server.get("/register",function(require, response) {
    response.sendFile(__dirname + "/views/register.html")
})

//(3) página de listagem
server.get("/search",function(require, response) {
    response.sendFile(__dirname + "/views/search.html")
})

//liga o servidor na porta 3000
server.listen(3000)