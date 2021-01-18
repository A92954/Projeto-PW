const { json } = require("body-parser");
const connect = require("../database");

function read(req, res) {
  const query = connect.con.query(
    "SELECT * FROM operacional",
    function (err, rows, fields) {
      res.send(rows);
    }
  );
}

function readOperacional(req, res) {
  const id_operacional = req.params.id_operacional;
  const query = connect.con.query(
    "SELECT * FROM operacional WHERE id_operacional = ?",
    id_operacional,
    function (err, rows, fields) {
      res.send(rows);
    }
  );
}

function readEspecialidade(req, res) {
  const id_operacional = req.params.id_operacional;
  const query = connect.con.query(
    "SELECT c.descricao_cargo FROM operacional op, cargo c WHERE op.id_operacional = ? and op.id_cargo = c.id_cargo",
    id_operacional,
    function (err, rows, fields) {
      res.send(rows[0]);
    }
  );
}

function readOcorrenciasOperacional(req, res) {
  const id_operacional = req.params.id_operacional;
  const query = connect.con.query(
    "SELECT oc.* FROM operacional op, equipa eq, ocorrencia oc WHERE op.id_operacional = ? and op.id_equipa = eq.id_equipa and oc.id_ocorrencia = eq.id_ocorrencia",
    id_operacional,
    function (err, rows, fields) {
      res.send(rows);
    }
  );
}

function readCreditosOperacional(req, res) {
  const id_operacional = req.params.id_operacional;
  const query = connect.con.query('SELECT op.id_operacional, eq.id_equipa, eq.creditos_equipa FROM equipa eq, operacional op WHERE op.id_operacional = ? and eq.id_equipa = op.id_equipa', id_operacional,
    function(err, rows, fields) {

    });
}

/*function readRankingOperacional(req, res) {
    const query = connect.con.query('SELECT pontos_gamificacao DENSE_RANK() OVER (ORDER BY pontos_gamificacao) Rank FROM operacional',
        function(err, rows, fields) {
            res.send(rows);
        });
}*/

/*function readRankingOperacional(req, res) {
    const query = connect.con.query('SELECT id_operacional, pontos_gamificacao FROM operacional ORDER BY pontos_gamificacao', 
        function(err, rows, fields) {
            res.send(rows);
        });
}*/

function readRankingOperacional(req, res) {
  const pontos_gamificacao = req.body.pontos_gamificacao;
  /*const query = connect.con.query(
    "SELECT ca.descricao_cargo  FROM cargo ca, operacional op WHERE ca.id_cargo = op.id_cargo",
    function(err, rows,fields) {
      res.send(rows)
    }
  )*/
  const query2 = connect.con.query(
    "SELECT op.username, op.pontos_gamificacao, c.descricao_cargo, DENSE_RANK() OVER  (ORDER BY pontos_gamificacao DESC) AS Ranking_operacionais FROM operacional op, cargo c WHERE op.id_cargo=c.id_cargo",
    pontos_gamificacao,
    function (err, rows, fields) {
      res.send(rows);
    }
  );  
}

function readOcorrenciaAtual(req, res) {
  const id_operacional = req.params.id_operacional;
  const id_equipa = req.params.id_equipa;
  const id_estado = req.params.id_estado;
  const query = connect.con.query(
    "SELECT loc.localizacao, ur.descricao_urgencia, oc.id_equipa, mat.descricao_material FROM ocorrencia oc, localizacao loc, material mat, grau_urgencia ur, ocorrencia_material om WHERE id_ocorrencia = ? AND  ",
    id_ocorrencia
  );
}

module.exports = {
  read: read,
  readEsp: readEspecialidade,
  readOcorrenciasOperacional: readOcorrenciasOperacional,
  readRankingOperacional: readRankingOperacional,
};
