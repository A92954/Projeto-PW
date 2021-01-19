const connect = require("../database");

function read(req, res) {
  const query = connect.con.query(
    "SELECT * FROM equipa",
    function (err, rows, fields) {
      if (err) return res.status(500).end();
      res.send(rows);
    }
  );
}

function readEquipaOcorrencia(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  const query = connect.con.query(
    "SELECT eq.* FROM equipa eq, ocorrencia oc WHERE oc.id_ocorrencia = ? and eq.id_equipa = oc.id_equipa",
    id_ocorrencia,
    function (err, rows, fields) {
      if (err) return res.status(500).end();
      res.send(rows);
    }
  );
}

function readRankingEquipa(req, res) {
  const query = connect.con.query(
    "SELECT id_equipa, creditos_equipa, DENSE_RANK() OVER  (ORDER BY creditos_equipa DESC) AS Ranking_equipa FROM equipa",
    function (err, rows, fields) {
      if (err) return res.status(500).end();
      res.send(rows);
    }
  );
}

function updateConfirmarEquipa(req, res) {
  const id_equipa = req.params.id_equipa;
  let disponibilidade;
  const query = connect.con.query("SELECT disponibilidade FROM equipa WHERE id_equipa = ?", id_equipa,
    function (err, rows, fields) {
      disponibilidade = rows[0].disponibilidade;
      if (err) return res.status(500).end();
      if (disponibilidade == "Disponivel") {
        const update = id_equipa;
        const secondquery = connect.con.query('UPDATE equipa SET disponibilidade = "Indisponivel" WHERE id_equipa = ?', update, 
          function (err, rows, fields) {
            res.send("A equipa esta confirmada");
          });
      } else {
        res.send("A equipa continua indisponivel para ir a terreno");
      }
    });
}

function updateCreditoEquipa(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  let id_equipa;
  let id_estado;
  let duracao_ocorrencia;
  let id_nivel;
  let percentagem_sobrevivente;
  let creditos_equipa;
  const query = connect.con.query("SELECT oc.id_estado, oc.id_equipa, oc.duracao_ocorrencia, oc.id_nivel, oc.percentagem_sobrevivente, eq.creditos_equipa FROM ocorrencia oc, equipa eq WHERE oc.id_ocorrencia = ?", id_ocorrencia,
    function (err, rows, fields) {
      id_estado = rows[0].id_estado;
      creditos_equipa = rows[0].creditos_equipa;
      if (err) return res.status(500).end();
      if (id_estado == 2) {
        duracao_ocorrencia = rows[0].duracao_ocorrencia;
        id_nivel = rows[0].id_nivel;
        percentagem_sobrevivente = rows[0].percentagem_sobrevivente;
        id_equipa = rows[0].id_equipa;
        switch(id_nivel) {
          case 1: creditos_equipa = creditos_equipa + 6;
            break;
          case 2: creditos_equipa = creditos_equipa + 12;
            break;
          case 3: creditos_equipa = creditos_equipa + 18;
            break;
          case 4: creditos_equipa = creditos_equipa + 24;
            break;
          case 5: creditos_equipa = creditos_equipa + 30;
            break;
        }
        console.log(creditos_equipa);
        if(duracao_ocorrencia < 60) {
          creditos_equipa = creditos_equipa + 20;
        }
        if(duracao_ocorrencia > 60) {
          creditos_equipa = creditos_equipa + 10;
        }
        console.log(creditos_equipa);
        if(percentagem_sobrevivente == 100) {
          creditos_equipa = creditos_equipa + 50;
        }
        if(percentagem_sobrevivente >= 50 && percentagem_sobrevivente < 100) {
          creditos_equipa = creditos_equipa + 30;
        }
        if(percentagem_sobrevivente > 0 && percentagem_sobrevivente < 50) {
          creditos_equipa = creditos_equipa + 10;
        }
        if(percentagem_sobrevivente == 0) {
          creditos_equipa = creditos_equipa + 0;
        }
        const update = [creditos_equipa, id_equipa];
        console.log(creditos_equipa);
        const query = connect.con.query('UPDATE equipa SET creditos_equipa = ? WHERE id_equipa = ?', update,
          function(err, rows, fields) {
            res.send("Os creditos foram atribuidos com sucesso");
          });
      }
      else {
        res.send("A ocorrencia ainda nao esta concluida");
      }
    }
  );
}

module.exports = {
  read: read,
  readEquipaOcorrencia: readEquipaOcorrencia,
  readRankingEquipa: readRankingEquipa,
  updateConfirmarEquipa: updateConfirmarEquipa,
  updateCreditoEquipa: updateCreditoEquipa
};
