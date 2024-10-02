let users = []; //Array que armazena os usuários

module.exports = class userController{
    static async createUser(req, res) {
        const { nome, email, senha, telefone } = req.body;

        if (!nome || !email || !senha || !telefone) {
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
        // Verifica se já existe um usuário com o mesmo Email
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const newUser = { id: id_usuario++, nome, email, senha, telefone  };    
    users.push(newUser);
    return res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
}

    static async getAllUser(req, res) {
    //Lista todos os usuarios
    return res
      .status(200)
      .json({ message: "Obtendo todos os usuários", users }); //200 significa sucesso
  }
    static async updateUser (req, res){
    // Desestrutura e recupera os dados enviados via corpo da requisição
    const { nome, email, senha, telefone } = req.body;

    // Validar se todos os campos foram preenchidos
    if ( !nome || !email || !senha || !telefone) {
        return res
          .status(400)
          .json({ error: "Todos os campos devem ser preenchidos" });
      }
    // Procurar o indice do organizador no Array 'organizadores' pelo id
    const userIndex = users.findIndex((user) => user.id_usuario === id_usuario);

    // Se o organizador não for encontrado organizadorIndex equivale a -1
    if (userIndex === -1) {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }
      // Atualiza os dados do organizador do Array 'organizadores'
    users[userIndex] = { id_usuario, nome, email, senha, telefone };
    return res
      .status(200)
      .json({ message: "Usuário atualizado", user: users[userIndex] });
    }

    static async deleteUser(req, res) {
        // Obtém o parâmetro 'id' da requisição, que é o id do usuário a ser deletado
        const id_usuario = req.params.id_usuario;

        // Procurar o indice do organizador no Array 'organizadores' pelo email
    const userIndex = users.findIndex((user) => user.id_usuario == id_usuario);

    // Se o usuário não for encontrado organizadorIndex equivale a -1
    if (userIndex === -1) {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }

      //Removendo o usuário do Array 'users'
    users.splice(userIndex, 1);

    return res.status(200).json({message: "Usuário Apagado"});
}
    // Função de login  
    static async loginUser(req, res) {    
        const { email, password } = req.body;
    
        if (!email || !password) {      
            return res.status(400).json({ error: "Email e senha são obrigatórios" });    
        }
    const user = users.find((user) => user.email === email);
    
    if (!user) {
          return res.status(400).json({ error: "Usuário não encontrado" });    
        }
    if (user.password !== password) {      
        return res.status(400).json({ error: "Senha incorreta" });    
    }
    return res.status(200).json({ message: "Login realizado com sucesso", user });  
}};



