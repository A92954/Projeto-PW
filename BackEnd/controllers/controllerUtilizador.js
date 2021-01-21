const connect = require("../database");

function read(req, res) {
  const query = connect.con.query(
    "SELECT * FROM utilizador",
    function (err, rows, fields) {
      if (!err) {
        if (rows.length == 0) {
        res.status(404).send("Data not found");
        } else {
        res.status(200).send(rows);
        }
        } else
        console.log('Error while performing Query.', err);
        });
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
      console.log(query.sql);
      if (!err) {
        console.log("Number of records updated: " + rows.affectedRows);
      res.status(200).send({"msg": "update with success"});
        } else {
      res.status(400).send({"msg": err.code});
        console.log('Error while performing Query.', err);
      }
    });
  } 

module.exports = {
  read: read,
  updateUtilizador: updateUtilizador,
};
