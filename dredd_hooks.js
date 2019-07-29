const hooks = require("hooks");
const faker = require("faker");
const mysql = require("mysql");
const fs = require("fs");
var jwt = {
  token: null
};

var codigo_imagem = 0;

var cadastro = {
  username: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

var perfil = {
	username: faker.name.findName()
};

hooks.before("Usuário > Criar Usuário > Criar Usuário", function(transaction) {
  transaction.request.body = JSON.stringify(cadastro);
});

hooks.before("Usuário > Login do usuário > Login do usuário", function(
  transaction
) {
  transaction.request.body = JSON.stringify(cadastro);
});

hooks.after("Usuário > Login do usuário > Login do usuário", function(
  transaction
) {
  //console.log(transaction.real.body);
  jwt.token = JSON.parse(transaction.real.body).token;
});

hooks.before(
  "Preferences > Preferências do Usuário > Preferências do Usuário",
  function(transaction) {
    //transaction.skip = true;
  }
);

hooks.before(
  "Preferences > Salvar Preferências do Usuário > Salvar Preferências do Usuário",
  function(transaction) {
    //transaction.skip = true;
  }
);

hooks.before(
  "Profile > Perfil do Usuário > Retornar Dados do Usuário",
  function(transaction) {
    //transaction.skip = true;
  }
);

hooks.before(
  "Profile > Perfil do Usuário > Atualizar Perfil do Usuário",
  function(transaction) {
    //transaction.skip = true;
	transaction.request.body = JSON.stringify(perfil);
  }
);

hooks.before("Files > Imagens dos Meetups > Imagem do meetup", function(
  transaction
) {
  //transaction.skip = true;
});

hooks.before("Files > Imagens dos Meetups > Apagar Imagem do Meetup", function(
  transaction
) {
  //transaction.skip = true;
  let url = transaction.fullPath;
  transaction.fullPath = url.replace("1", codigo_imagem);
});

hooks.before(
  "Files > Enviar Imagem do Meetup > Enviar Imagem do Meetup",
  function(transaction) {
    transaction.skip = true;
  }
);

hooks.before("Dashboard > Dashboard > Dashboard", function(transaction) {
  //transaction.skip = true;
});

hooks.before("Meetup > Dados do Meetup > Ver Meetup", function(transaction) {
  //transaction.skip = true;
});

hooks.before("Meetup > Dados do Meetup > Cadastrar Meetup", function(
  transaction
) {
  //transaction.skip = true;
});

hooks.before("Meetup > Inscrição no Meetup > Inscrição no Meetup", function(
  transaction
) {
  //transaction.skip = true;
});

hooks.before(
  "Meetup > Confirmação Inscrição Meetup > Confirmação Inscrição Meetup",
  function(transaction) {
    transaction.skip = true;
  }
);

hooks.beforeEach(function(transaction) {
  console.log(transaction.fullPath);
  console.log(transaction.name);
  if (jwt.token != null) {
    transaction.request.headers["Authorization"] = `Bearer ${jwt.token}`;
  }
  //Apenas para fins de testes, criar uma imagem no banco para testar a rotina de apagar
  if (codigo_imagem === 0) {
    const connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "meetapp"
    });
    connection.connect();
    const StrSQL =
      "INSERT INTO files (file, name, type, subtype) VALUES ('teste/teste.jpg', 'imagem de testes', 'image', 'jpeg')";

    var query = connection.query(StrSQL, function(err, result) {
      codigo_imagem = result.insertId;
    });

    connection.end();
  }
});
