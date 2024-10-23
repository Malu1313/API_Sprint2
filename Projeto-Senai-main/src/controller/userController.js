let users = []; //Array que armazena os usuários
let id_usuario = 0;
const connect = require("../db/connect");

module.exports = class userController{
    static async createUser(req, res) {
        const { nome, email, senha, telefone, tipo_de_usuario } = req.body;

        if (!nome || !email || !senha || !telefone || !tipo_de_usuario) {
            //Verifica se todos os campos estão preenchidos
            return res
              .status(400)
              .json({ error: "Todos os campos devem ser preenchidos" });
        } else if (isNaN(telefone) || telefone.length !== 11) {
            //Verifica se tem só números e se tem 11 dígitos
            return res
                .status(400)
                .json({
                    error: "Telefone inválido. Deve conter exatamente 11 dígitos numéricos",
                  });
        } else if (!email.includes("@")) {
            //Verifica se o email tem o @
            return res.status(400).json({ error: "Email inválido. Deve conter @" });
        }
        // Construção da query INSERT
      const query = `INSERT INTO usuarios (nome, senha, telefone, tipo_de_usuario) VALUES('${nome}', '${senha}', '${telefone}', '${tipo_de_usuario}')`;
      // Executando a query criada
      try {
        connect.query(query, function (err) {
          if (err) {
            console.log(err);
            console.log(err.code);
            if (err.code === "ER_DUP_ENTRY") {
              return res
                .status(400)
                .json({ error: "O Email já está vinculado a outro usuário" });
            } else {
              return res
                .status(500)
                .json({ error: "Erro interno do servidor" });
            }
          } else {
            return res
              .status(201)
              .json({ message: "Usuário criado com sucesso" });
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  }
    static async getAllUser(req, res) {
    //Lista todos os usuarios
    const query = `SELECT * FROM usuarios`;

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do Servidor" });
        }

        return res
          .status(200)
          .json({ message: "Lista de usuários", users: results });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    }
    static async updateUser (req, res){
    // Desestrutura e recupera os dados enviados via corpo da requisição
    const { nome, email, senha, telefone, tipo_de_usuario } = req.body;

    // Validar se todos os campos foram preenchidos
    if ( !nome || !email || !senha || !telefone || !tipo_de_usuario) {
        return res
          .status(400)
          .json({ error: "Todos os campos devem ser preenchidos" });
      }
      const query = `UPDATE usuarios SET nome=?,senha=?,telefone=?, tipo_de_usuario=? WHERE id_usuario = ?`;
      const values = [ nome, senha, email, telefone , tipo_de_usuario, id_usuario];
  
      try {
        connect.query(query, values, function (err, results) {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              return res
                .status(400)
                .json({ error: "Email já cadastrado por outro usuario" });
            } else {
              console.error(err);
              return res.status(500).json({ error: "Erro interno do servidor" });
            }
          }
          if (results.affectedRows === 0) {
            return res.status(404).json({ error: "usuario não encontrado" });
          }
          return res
            .status(200)
            .json({ message: "usuario foi atualizado com sucesso" });
        });
      } catch {
        error;
      }
      {
        console.error("Erro ao executar consulta");
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
    }

    static async deleteUser(req, res) {
        // Obtém o parâmetro 'id' da requisição, que é o id do usuário a ser deletado
      const id_usuario = req.params.id_usuario;
      const query = `DELETE FROM usuarios WHERE id_usuario = ?`;
      const values = [id_usuario];
  
      try {
        connect.query(query, values, function (err, results) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }
  
          if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario não encontrado" });
          }
  
          return res
            .status(200)
            .json({ message: "Usuario exluido com sucesso" });
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json
          ({error:"Erro interno do servidor"})
      }
    };
    // Função de login
  static async loginUser(req, res) {
  const {nome, senha} = req.body;
  if (|| !nome || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }
  
  const user = users.find((user) => user.email === email);
  
  if (!users) {
    return res.status(400).json({ error: "Usuário não encontrado" });
  }
  
  if (user.senha !== senha) {
    return res.status(400).json({ error: "Senha incorreta" });
  }
  
  return res.status(200).json({ message: "Login realizado com sucesso", users });
}; 
 

