const connect = require("../database");

function read(req, res) {
  const query = connect.con.query(
    "SELECT * FROM utilizador",
    function (err, rows, fields) {
      res.send(rows);
    }
  );
}

function updateUtilizador(req, res) {
  const username = req.params.username;
  const nome = req.body.nome;
  const email_utilizador = req.body.email_utilizador;
  const password = req.body.password;
  const update = [nome, email_utilizador, password, username];
  const query = connect.con.query(
    "UPDATE utilizador SET nome = ?, email_utilizador = ?, password = ? WHERE username = ?",
    update,
    function (err, results) {
      if (err) throw err;
      res.send("Dados de utilizador alterados");
    }
  );
}

module.exports = {
  read: read,
  update: updateUtilizador,
};
