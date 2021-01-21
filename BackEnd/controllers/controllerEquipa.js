const connect = require("../database");

function read(req, res) {
  const query = connect.con.query(
    "SELECT * FROM equipa",
    function (err, rows, fields) {
      if (!err) {
        if (rows.length == 0) {
          res.status(404).send("Data not found");
        } else {
          res.status(200).send(rows);
        }
      } else console.log("Error while performing Query.", err);
    }
  );
}

function readEquipaOcorrencia(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  const query = connect.con.query(
    "SELECT eq.* FROM equipa eq, ocorrencia oc WHERE oc.id_ocorrencia = ? and eq.id_equipa = oc.id_equipa",
    id_ocorrencia,
    function (err, rows, fields) {
      if (!err) {
        if (rows.length == 0) {
          res.status(404).send({ msg: "data not found" });
        } else {
          res.status(200).send(rows);
        }
      } else res.status(400).send({ msg: err.code });
      console.log("Error while performing Query.", err);
    }
  );
}

/*function readRankingEquipa(req, res) {
  let id_equipa;
  let numero_ocorrencias;
  const query = connect.con.query(
    'SELECT eq.id_equipa, eq.creditos_equipa, DENSE_RANK() OVER  (ORDER BY eq.creditos_equipa DESC) AS Ranking_equipa FROM equipa eq UNION SELECT COUNT(oc.id_ocorrencia) AS Numero_Ocorrencias FROM ocorrencia oc WHERE oc.id_equipa = eq.id_equipa UNION SELECT op.username FROM operacional op WHERE eq.id_equipa = op.id_equipa',
    function (err, rows, fields) {
      if (err) return res.status(500).end();
      console.log(err);
      res.send(rows);
      const secondquery = connect.con.query('SELECT COUNT(id_ocorrencia) AS Numero_Ocorrencias FROM ocorrencia WHERE id_equipa = ?', id_equipa,
        function(err, rows, fields) {
          numero_ocorrencias = rows[0].Numero_Ocorrencias;
          console.log(numero_ocorrencias);
          res.send(rows);
          const thirdquery = connect.con.query('SELECT username FROM operacional WHERE id_equipa = ?', id_equipa,
            function(err, rows, fields) {
              res.send(rows);
            })
        })
    }
  );
}*/

function readRankingEquipa(req, res) {
  const query = connect.con.query(
    "SELECT id_equipa, creditos_equipa, DENSE_RANK() OVER  (ORDER BY creditos_equipa DESC) AS Ranking_Equipa FROM equipa",
    function (err, rows, fields) {
      if (!err) {
        if (rows.length == 0) {
          res.status(404).send({ msg: "data not found" });
        } else {
          res.status(200).send(rows);
        }
      } else res.status(400).send({ msg: err.code });
      console.log("Error while performing Query.", err);
    }
  );
}

function updateConfirmarEquipa(req, res) {
  const id_equipa = req.params.id_equipa;
  let disponibilidade;
  const query = connect.con.query(
    "SELECT disponibilidade FROM equipa WHERE id_equipa = ?",
    id_equipa,
    function (err, rows, fields) {
      disponibilidade = rows[0].disponibilidade;
      if (err) return res.status(500).end();
      if (disponibilidade == "Disponivel") {
        const update = id_equipa;
        const secondquery = connect.con.query(
          'UPDATE equipa SET disponibilidade = "Indisponivel" WHERE id_equipa = ?',
          update,
          function (err, rows, fields) {
            res.send("A equipa esta confirmada");
          }
        );
      } else {
        res.send("A equipa continua indisponivel para ir a terreno");
      }
    }
  );
}

function updateCreditoEquipa(req, res) {
  const id_equipa = req.params.id_equipa;
  let creditos_equipa;
  const query = connect.con.query(
    "SELECT SUM(creditos_ocorrencia) AS creditos_equipa FROM ocorrencia WHERE id_equipa = ?",
    id_equipa,
    function (err, rows, fields) {
      creditos_equipa = rows[0].creditos_equipa;
      const update = [creditos_equipa, id_equipa];
      const secondquery = connect.con.query(
        "UPDATE equipa SET creditos_equipa = ? WHERE id_equipa = ?",
        update,
        function (err, rows, fields) {
          if (!err) {
            console.log("Number of records updated: " + rows.affectedRows);
            res
              .status(200)
              .send({
                msg:
                  "Foram atribuidos " +
                  creditos_equipa +
                  " pontos à Equipa " +
                  id_equipa,
              });
          } else {
            res.status(400).send({ msg: err.code });
            console.log("Error while performing Query.", err);
          }
        }
      );
    }
  );
}

module.exports = {
  read: read,
  readEquipaOcorrencia: readEquipaOcorrencia,
  readRankingEquipa: readRankingEquipa,
  updateConfirmarEquipa: updateConfirmarEquipa,
  updateCreditoEquipa: updateCreditoEquipa,
};
