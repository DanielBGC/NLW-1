//importação a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criação do objeto para operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

//inicializando o objeto
db.serialize(function() {
    
    //(1) CRIAR A TABELA
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            state TEXT, 
            city TEXT,
            address TEXT,
            address2 TEXT,
            items TEXT
        );
    `)

    //(2) INSERIR DADOS NA TABELA
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
        "Papersider",
        "https://www.aparasdepapelsaojorge.com.br/imagens/onde-tem-empresa-de-reciclagem-papelao.jpg",
        "Minas Gerais",
        "Uberaba",
        "Rua Alfonso Miguel, Abadia",
        "Nº 964",
        "Papéis e Papelão"
    ]

    //função que analisa se houve algum erro
    function afterInsertData(error) {
        if(error)
            return console.log(error)
        else {
            console.log("Cadastro efetivado!")
            console.log(this)
        }
    }
    db.run(query, values, afterInsertData)

    //(3) DELETAR DADOS DA TABELA
    /* 
        db.run(`DELETE FROM places WHERE id = ?`, [1], function(error) {
            if(error) 
                return console.log(error)
            else
                console.log("Registro deletado!", this)
        }) 
    */

    //(4) CONSULTAR DADOS DA TABELA
    db.all(`SELECT * FROM places`, function(error, rows) {
        if(error) 
            return console.log(error)
        else 
            console.log(rows)
    })
})