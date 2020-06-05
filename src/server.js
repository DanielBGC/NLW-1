//importa a dependência express
const express = require("express")

//executa a função express
const server = express()

//importa o banco de dados
const db = require("./database/db.js")

//configura a pasta public para ser utilizada
server.use(express.static("public"))

//habilita o uso do require.body 
server.use(express.urlencoded( {extended: true}) )

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

    //pegando a Query String da URL
    //console.log(require.query)

    return response.render("register.html")
})

//método POST do formulário
server.post("/saveregister",function(require, response) {

    //pegando a Query String pelo formulário
    console.log(require.body)

    //inserir os dados no banco de dados
    const query = `
        INSERT INTO places (
            name,
            image,
            state,
            city,
            address,
            address2,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        require.body.name,
        require.body.imagem,
        require.body.state,
        require.body.city,
        require.body.address,
        require.body.address2,
        require.body.items
    ]

    //função que analisa se houve algum erro
    function afterInsertData(error) {
        if(error) {
            console.log(error)
            return response.send("register.html", {saved: false})
        }
        else {
            console.log("Cadastro efetivado!")
            console.log(this)

            return response.render("register.html", {saved: true})
        }
    }
    db.run(query, values, afterInsertData)
})

//(3) página de listagem
server.get("/search",function(require, response) {

    const search = require.query.search

    if(search == "") {
        return response.render("search.html", {total: 0})
    }

    //pega os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' `, function(error, rows) {
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