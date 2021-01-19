const { json } = require("body-parser");
const connect = require("../database");
const { updateUtilizador } = require("./controllerUtilizador");

function read(req, res) {
  const query = connect.con.query(
    "SELECT * FROM operacional",
    function (err, rows, fields) {
      if (err) return res.status(500).end();
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
      if (err) return res.status(500).end();
      if (rows.length == 0) return res.status(404).end();
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
      if (err) return res.status(500).end();
      res.send(rows[0]);
    }
  );
}

function readOcorrenciaOperacional(req, res) {
  const id_operacional = req.params.id_operacional;
  const query = connect.con.query(
    "SELECT oc.* FROM operacional op, equipa eq, ocorrencia oc WHERE op.id_operacional = ? and op.id_equipa = eq.id_equipa and oc.id_ocorrencia = eq.id_ocorrencia",
    id_operacional,
    function (err, rows, fields) {
      if (err) return res.status(500).end();
      res.send(rows);
    }
  );
}

function readCreditoOperacional(req, res) {
  const id_operacional = req.params.id_operacional;
  const query = connect.con.query(
    "SELECT op.id_operacional, eq.id_equipa, eq.creditos_equipa FROM equipa eq, operacional op WHERE op.id_operacional = ? and eq.id_equipa = op.id_equipa",
    id_operacional,
    function (err, rows, fields) {}
  );
}

function readRankingOperacional(req, res) {
  const query = connect.con.query(
    "SELECT username, pontos_gamificacao,id_cargo, DENSE_RANK() OVER  (ORDER BY pontos_gamificacao DESC) AS Ranking_operacionais FROM operacional",
    function (err, rows, fields) {
      if (err) return res.status(500).end();
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

function updateCreditoOperacional(req, res) {
  const id_operacional = req.params.id_operacional;
  let pontos_gamificacao;
  let numero_operacional_equipa;
  const query = connect.con.query(
    "SELECT op.id_equipa, eq.creditos_equipa FROM operacional op, equipa eq WHERE op.id_operacional = ? and eq.id_equipa = op.id_equipa",
    id_operacional,
    function (err, rows, fields) {
      if (err) return res.status(500).end();
    }
  );
}

module.exports = {
  read: read,
  readOperacional: readOperacional,
  readEspecialidade: readEspecialidade,
  readOcorrenciaOperacional: readOcorrenciaOperacional,
  readCreditoOperacional: readCreditoOperacional,
  readRankingOperacional: readRankingOperacional,
  //readOcorrenciaAtual: readOcorrenciaAtual
  updateCreditoOperacional: updateCreditoOperacional,
};
