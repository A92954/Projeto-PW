const connect = require("../database");

function read(req, res) {
  const query = connect.con.query(
    "SELECT * FROM equipa",
    function (err, rows, fields) {
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
      res.send(rows);
    }
  );
}

function confirmarEquipa(req, res) {
  const id_operacional = req.params.id_operacional;
  let disponibilidade_operacional;
  let id_equipa;
  let disponibilidade_equipa;
  const query = connect.con.query(
    "SELECT disponibilidade_operacional, id_equipa FROM operacional WHERE id_operacional = ?",
    id_operacional,
    function (err, rows, fields) {
      disponibilidade_operacional = rows[0].disponibilidade_operacional;
      id_equipa = rows[0].id_equipa;
      if (disponibilidade_operacional == "indisponivel") {
        const secondquery = connect.con.query(
          "SELECT disponibilidade_equipa FROM equipa WHERE id_equipa = ?",
          id_equipa,
          function (err, rows, fields) {
            disponibilidade_equipa = rows[0].disponibilidade_equipa;
            if (disponibilidade_equipa == "disponivel") {
              const update = id_equipa;
              const thirdquery = connect.con.query(
                'UPDATE equipa SET disponibilidade_equipa = "indisponivel" WHERE id_equipa = ?',
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
      } else {
        res.send("O operacional nao se encontra numa equipa");
      }
    }
  );
}

/*function creditoEquipa(req, res) {
    const id_ocorrencia = req.params.id_ocorrencia;
    let id_equipa;
    let creditos_equipa = req.body.creditos_equipa;
    creditos_equipa = parseInt(creditos_equipa, 10);
    let id_estado;
    const query = connect.con.query('SELECT id_estado, id_equipa FROM ocorrencia WHERE id_ocorrencia = ?', id_ocorrencia,
        function(err, rows, fields) {
            id_estado = rows[0].id_estado;
            if(id_estado == 2) {
                id_equipa = rows[0].id_equipa;
                const update = [creditos_equipa, id_equipa];
                const secondquery = connect.con.query('UPDATE equipa SET creditos_equipa = ? WHERE id_equipa = ?', update,
                    function(err, rows, fields) {
                        res.send('Os creditos foram atribuidos com sucesso');
                    });
            } else {
                res.send('A ocorrencia ainda nao esta concluida');
            }
        });
}*/

function readRankingEquipa(req, res) {
  const creditos_equipa = req.body.creditos_equipa;
  const query = connect.con.query(
    "SELECT id_equipa, creditos_equipa, DENSE_RANK() OVER  (ORDER BY creditos_equipa DESC) AS Ranking_equipa FROM equipa",
    creditos_equipa,
    function (err, rows, fields) {
      res.send(rows);
    }
  );
}

module.exports = {
  read: read,
  readEqOc: readEquipaOcorrencia,
  confirmarEquipa: confirmarEquipa,
  readRankingEquipa: readRankingEquipa,
};
