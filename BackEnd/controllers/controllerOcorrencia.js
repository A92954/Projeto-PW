const connect = require("../database");
const { save } = require("./controllerTestemunha");

function read(req, res) {
  const query = connect.con.query(
    "SELECT oc.id_ocorrencia, loc.freguesia, oc.id_equipa, gu.descricao_urgencia oc.data_ocorrencia FROM ocorrencia oc, localizacao loc, grau_urgencia gu WHERE oc.id_local = loc.id_local and oc.id_nivel = gu.id_nivel",
    function (err, rows, fields) {
      if (err) return res.status(500).end();
      res.send(rows);
    }
  );
}

function readAcabada(req, res) {
  const query = connect.con.query(
    "SELECT oc.id_ocorrencia, loc.freguesia, oc.id_equipa, gu.descricao_urgencia, oc.data_ocorrencia FROM ocorrencia oc, localizacao loc, grau_urgencia gu WHERE oc.id_local = loc.id_local and oc.id_nivel = gu.id_nivel and oc.id_estado = 2",
    function (err, rows, fields) {
      if (err) return res.status(500).end();
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
      if (err) return res.status(500).end();
      if (results.length == 0) return res.status(404).end();
      res.send(results[0]);
    }
  );
}

function readCreditoOcorrenciaX(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  const query = connect.con.query(
    "SELECT creditos_ocorrencia FROM ocorrencia WHERE id_ocorrencia = ?",
    id_ocorrencia,
    function (err, rows, fields) {
      if (err) return res.status(500).end();
      res.send(rows[0]);
    }
  );
}

//Este metodo imprime apenas as ocorrencias que teem uma equipa atribuida e ainda esta a decorrer
function readOcorrenciaDecorrer(req, res) {
  const query = connect.con.query(
    "SELECT oc.id_ocorrencia, loc.morada, eq.nome_equipa FROM localizacao loc, equipa eq, ocorrencia oc WHERE data_fim_ocorrencia IS NULL and oc.id_local = loc.id_local and oc.id_equipa = eq.id_equipa",
    function (err, rows, fields) {
      if (err) return res.status(500).end();
      res.send(rows);
    }
  );
}

function readGrafico(req, res) {
  const query = connect.con.query(
    'SELECT COUNT(*) AS Janeiro, (SELECT COUNT(*) FROM ocorrencia WHERE DATE_FORMAT(data_ocorrencia, "%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-02")) AS Fevereiro, (SELECT COUNT(*) FROM ocorrencia WHERE DATE_FORMAT(data_ocorrencia, "%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-03")) AS Março, (SELECT COUNT(*) FROM ocorrencia WHERE DATE_FORMAT(data_ocorrencia, "%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-04")) AS Abril, (SELECT COUNT(*) FROM ocorrencia WHERE DATE_FORMAT(data_ocorrencia, "%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-05")) AS Maio, (SELECT COUNT(*) FROM ocorrencia WHERE DATE_FORMAT(data_ocorrencia, "%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-06")) AS Junho, (SELECT COUNT(*) FROM ocorrencia WHERE DATE_FORMAT(data_ocorrencia, "%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-07")) AS Julho, (SELECT COUNT(*) FROM ocorrencia WHERE DATE_FORMAT(data_ocorrencia, "%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-08")) AS Agosto, (SELECT COUNT(*) FROM ocorrencia WHERE DATE_FORMAT(data_ocorrencia, "%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-09")) AS Setembro, (SELECT COUNT(*) FROM ocorrencia WHERE DATE_FORMAT(data_ocorrencia, "%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-010")) AS Outubro, (SELECT COUNT(*) FROM ocorrencia WHERE DATE_FORMAT(data_ocorrencia, "%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-11")) AS Novembro, (SELECT COUNT(*) FROM ocorrencia WHERE DATE_FORMAT(data_ocorrencia, "%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-12")) AS Dezembro FROM ocorrencia WHERE DATE_FORMAT(data_ocorrencia, "%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-01")',
    function (err, rows, fields) {
      if (!err) {
        //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
        if (rows.length == 0) {
          res.status(404).send("Data not found");
        } else {
          res.status(200).send(rows[0]);
        }
      } else console.log("Error while performing Query.", err);
    }
  );
}

function updateCreditoOcorrencia(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  let creditos_ocorrencia = req.body.creditos_ocorrencia;
  creditos_ocorrencia = parseInt(creditos_ocorrencia, 10);
  let id_estado;
  const query = connect.con.query(
    "SELECT id_estado FROM ocorrencia WHERE id_ocorrencia = ?",
    id_ocorrencia,
    function (err, rows, fields) {
      id_estado = rows[0].id_estado;
      if (err) return res.status(500).end();
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

function updateConfirmarPartidaOcorrencia(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  let id_estado;
  const query = connect.con.query(
    "SELECT id_estado FROM ocorrencia WHERE id_ocorrencia = ?",
    id_ocorrencia,
    function (err, rows, fields) {
      id_estado = rows[0].id_estado;
      if (err) return res.status(500).end();
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

function updateDuracaoOcorrencia(req, res) {
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
      if (err) return res.status(500).end();
      const secondquery = connect.con.query(
        "UPDATE ocorrencia SET duracao_ocorrencia = ? WHERE id_ocorrencia = ?",
        update,
        function (err, rows, fields) {
          if (err) return res.status(500).end();
          res.send(
            "A duracao da ocorrencia foi de " + duracao_ocorrencia + " minutos"
          );
        }
      );
    }
  );
}

function updatePercentagemSobrevivente(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  const percentagem_sobrevivente = req.body.percentagem_sobrevivente;
  if (err) return res.status(500).end();
  if (0 <= percentagem_sobrevivente && percentagem_sobrevivente <= 100) {
    const query = connect.con.query(
      "UPDATE ocorrencia SET percentagem_sobrevivente = ? WHERE id_ocorrencia = ?",
      [percentagem_sobrevivente, id_ocorrencia],
      function (err, rows, fields) {
        res.send(
          "A percentagem " +
            percentagem_sobrevivente +
            "% foi inserida com sucesso"
        );
      }
    );
  } else {
    res.send("Por favor, insira um valor entre 0 e 100...");
  }
}

module.exports = {
  read: read,
  readAcabada: readAcabada,
  readOcorrenciaX: readOcorrenciaX,
  readCreditoOcorrenciaX: readCreditoOcorrenciaX,
  readOcorrenciaDecorrer: readOcorrenciaDecorrer,
  readGrafico: readGrafico,
  updateCreditoOcorrencia: updateCreditoOcorrencia,
  updateConfirmarPartidaOcorrencia: updateConfirmarPartidaOcorrencia,
  updateDuracaoOcorrencia: updateDuracaoOcorrencia,
  updatePercentagemSobrevivente: updatePercentagemSobrevivente,
};
