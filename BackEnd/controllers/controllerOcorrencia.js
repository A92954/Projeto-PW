const connect = require("../database");

function read(req, res) {
  const query = connect.con.query(
    "SELECT oc.id_ocorrencia, loc.freguesia, oc.id_equipa, gu.descricao_urgencia oc.data_ocorrencia FROM ocorrencia oc, localizacao loc, grau_urgencia gu WHERE oc.id_local = loc.id_local and oc.id_nivel = gu.id_nivel",
    function (err, rows, fields) {
      res.send(rows);
    }
  );
}

function readOcorrenciaX(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  const query = connect.con.query(
    "SELECT * FROM ocorrencia WHERE id_ocorrencia = ?",
    id_ocorrencia,
    function (err, results) {
      res.send(results[0]);
    }
  );
}

function creditoOcorrencia(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  let creditos_ocorrencia = req.body.creditos_ocorrencia;
  creditos_ocorrencia = parseInt(creditos_ocorrencia, 10);
  let id_estado;
  const query = connect.con.query(
    "SELECT id_estado FROM ocorrencia WHERE id_ocorrencia = ?",
    id_ocorrencia,
    function (err, rows, fields) {
      id_estado = rows[0].id_estado;
      if (id_estado == 2) {
        const update = [creditos_ocorrencia, id_ocorrencia];
        const secondquery = connect.con.query(
          "UPDATE ocorrencia SET creditos_ocorrencia = ? WHERE id_ocorrencia = ?",
          update,
          function (err, rows, fields) {
            res.send("Os creditos foram atribuidos com sucesso");
          }
        );
      } else {
        res.send("A ocorrencia ainda nao esta concluida");
      }
    }
  );
}

function readCreditoOcorrenciaX(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  const query = connect.con.query(
    "SELECT creditos_ocorrencia FROM ocorrencia WHERE id_ocorrencia = ?",
    id_ocorrencia,
    function (err, rows, fields) {
      res.send(rows[0]);
    }
  );
}

function confirmarPartidaOcorrencia(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  let id_estado;
  const query = connect.con.query(
    "SELECT id_estado FROM ocorrencia WHERE id_ocorrencia = ?",
    id_ocorrencia,
    function (err, rows, fields) {
      id_estado = rows[0].id_estado;
      if (id_estado == 3) {
        const update = [id_estado, id_ocorrencia];
        const secondquery = connect.con.query(
          "UPDATE ocorrencia SET id_estado = 1 WHERE id_ocorrencia = ?",
          update,
          function (err, rows, fields) {
            res.send("Confirmada a partida para a ocorrencia");
          }
        );
      } else if (id_estado == 2) {
        res.send("A ocorrencia ja foi concluida");
      } else {
        res.send("A ocorrencia ja se encontra em progresso");
      }
    }
  );
}

function creditoEquipa(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  let id_equipa;
  let creditos_equipa = req.body.creditos_equipa;
  creditos_equipa = parseInt(creditos_equipa, 10);
  let id_estado;
  const query = connect.con.query(
    "SELECT id_estado, id_equipa FROM ocorrencia WHERE id_ocorrencia = ?",
    id_ocorrencia,
    function (err, rows, fields) {
      id_estado = rows[0].id_estado;
      if (id_estado == 2) {
        id_equipa = rows[0].id_equipa;
        const update = [creditos_equipa, id_equipa];
        const secondquery = connect.con.query(
          "UPDATE equipa SET creditos_equipa = ? WHERE id_equipa = ?",
          update,
          function (err, rows, fields) {
            res.send("Os creditos foram atribuidos com sucesso");
          }
        );
      } else {
        res.send("A ocorrencia ainda nao esta concluida");
      }
    }
  );
}

function duracaoOcorrencia(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  let data_ocorrencia;
  let data_fim_ocorrencia;
  let duracao_ocorrencia;
  const query = connect.con.query(
    "SELECT * FROM ocorrencia WHERE id_ocorrencia = ?",
    id_ocorrencia,
    function (err, rows, fields) {
      data_ocorrencia = rows[0].data_ocorrencia;
      data_fim_ocorrencia = rows[0].data_fim_ocorrencia;
      duracao_ocorrencia = Math.abs(data_ocorrencia - data_fim_ocorrencia);
      duracao_ocorrencia = duracao_ocorrencia * 0.00001 * 1.66666667;
      const update = [duracao_ocorrencia, id_ocorrencia];
      const secondquery = connect.con.query(
        "UPDATE ocorrencia SET duracao_ocorrencia = ? WHERE id_ocorrencia = ?",
        update,
        function (err, rows, fields) {
          res.send(
            "A duracao da ocorrencia foi de " + duracao_ocorrencia + " minutos"
          );
        }
      );
    }
  );
}

function readGrafico(req, res) {
  const data_ocorrencia;
  let query = "SELECT id_ocorrencia, [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12] FROM (SELECT DATEPART(m, data_ocorrencia) TheMonth, id_ocorrencia FROM ocorrencia WHERE data_ocorrencia >= '20200101' AND data_ocorrencia <= '20201231') as src PIVOT (COUNT(TheMonth) FOR TheMonth IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])) as pvt')";
  connect.con.query(query, function(err, rows, fields){
    if (!err) {
      //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
      if (rows.length == 0) {
          res.status(404).send("Data not found");
      } else {
      res.status(200).send(rows);
      }
    } else
    console.log('Error while performing Query.', err);
  }); 
}

/*Select *
  From (Select UserName, DateName(Month, DateColumn) As Month_Name, Count(*) As Month_Count
          From TestPivot
         Group By UserName, DateName(Month, DateColumn)) As SourcePart
  Pivot (Sum(Month_Count)
         For Month_Name In (January, February, March, April, May, June, 
                            July, August, September, October, November, December)) As PivotPart*/

module.exports = {
  read: read,
  readOcorrenciaX: readOcorrenciaX,
  creditoOcorrencia: creditoOcorrencia,
  readCreditoOcorrenciaX: readCreditoOcorrenciaX,
  confirmarPartidaOcorrencia: confirmarPartidaOcorrencia,
  creditoEquipa: creditoEquipa,
  duracaoOcorrencia: duracaoOcorrencia,
  readGrafico: readGrafico
};
