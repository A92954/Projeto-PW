const connect = require("../database");
const { save } = require("./controllerTestemunha");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

function read(req, res) {
  const query = connect.con.query(
    "SELECT oc.id_ocorrencia, loc.freguesia, oc.id_equipa, gu.descricao_urgencia oc.data_ocorrencia FROM ocorrencia oc, localizacao loc, grau_urgencia gu WHERE oc.id_local = loc.id_local and oc.id_nivel = gu.id_nivel",
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
function readAcabada(req, res) {
  const query = connect.con.query(
    "SELECT oc.id_ocorrencia, loc.freguesia, oc.id_equipa, gu.descricao_urgencia, oc.data_ocorrencia FROM ocorrencia oc, localizacao loc, grau_urgencia gu WHERE oc.id_local = loc.id_local and oc.id_nivel = gu.id_nivel and oc.id_estado = 2",
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

function readOcorrenciaX(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  const query = connect.con.query(
    "SELECT * FROM ocorrencia WHERE id_ocorrencia = ?",
    id_ocorrencia,
    function (err, rows, fields) {
      if (!err) {
        if (rows.length == 0) {
          res.status(404).send({
            msg: "data not found",
          });
        } else {
          res.status(200).send(rows);
        }
      } else
        res.status(400).send({
          msg: err.code,
        });
      console.log("Error while performing Query.", err);
    }
  );
}

function readCreditoOcorrenciaX(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  const query = connect.con.query(
    "SELECT creditos_ocorrencia FROM ocorrencia WHERE id_ocorrencia = ?",
    id_ocorrencia,
    function (err, rows, fields) {
      if (!err) {
        if (rows.length == 0) {
          res.status(404).send({
            msg: "data not found",
          });
        } else {
          res.status(200).send(rows);
        }
      } else
        res.status(400).send({
          msg: err.code,
        });
      console.log("Error while performing Query.", err);
    }
  );
}

//Este metodo imprime apenas as ocorrencias que teem uma equipa atribuida e ainda esta a decorrer
function readOcorrenciaAtual(req, res) {
  const id_operacional = req.params.id_operacional;
  let id_equipa;
  let id_estado;
  let id_ocorrencia;
  const query = connect.con.query(
    "SELECT id_equipa FROM operacional WHERE id_operacional = ?",
    id_operacional,
    function (err, rows, fields) {
      id_equipa = rows[0].id_equipa;
      const secondquery = connect.con.query(
        "SELECT id_estado, id_ocorrencia FROM ocorrencia WHERE id_equipa = ? and data_fim_ocorrencia IS NULL",
        id_equipa,
        function (err, rows, fields) {
          id_estado = rows[0].id_estado;
          id_ocorrencia = rows[0].id_ocorrencia;
          if (id_estado == 2) {
            const thirdquery = connect.con.query(
              "SELECT oc.id_ocorrencia, lo.freguesia, ur.descricao_urgencia, eq.nome_equipa, ma.nome_material, om.quantidade_usada, oc.data_ocorrencia, op.id_operacional, op.username FROM localizacao lo, grau_urgencia ur, equipa eq, material ma, ocorrencia_material om, ocorrencia oc, operacional op WHERE oc.id_local = lo.id_local and oc.id_equipa = eq.id_equipa and oc.id_nivel = ur.id_nivel and oc.id_ocorrencia = om.id_ocorrencia and om.id_material = ma.id_material and op.id_equipa = eq.id_equipa and oc.id_ocorrencia = ?",
              id_ocorrencia,
              function (err, rows, fields) {
                res.send(rows);
              }
            );
          }
        }
      );
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

//Envia um email ao Centro de Operações com os dados de uma ocorrência terminada
function readDadosOcorrencia(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  let id_estado;
  let nome_equipa;
  let freguesia;
  let data_ocorrencia;
  let data_fim_ocorrencia;
  const query = connect.con.query("SELECT id_estado FROM ocorrencia WHERE id_ocorrencia = ? ",id_ocorrencia,
    function (err, rows, fields) {
      id_estado = rows[0].id_estado;
      if (id_estado == 2) {
        id_estado = rows[0].id_estado;
        const secondquery = connect.con.query(
          "SELECT oc.id_ocorrencia, loc.freguesia, eq.nome_equipa, oc.data_ocorrencia, oc.data_fim_ocorrencia FROM ocorrencia oc, equipa eq, localizacao loc WHERE oc.id_equipa = eq.id_equipa AND oc.id_local = loc.id_local AND oc.id_ocorrencia = ?",id_ocorrencia,
          function (err, rows, fields) {
            freguesia = rows[0].freguesia;
            nome_equipa = rows[0].nome_equipa;
            data_ocorrencia = rows[0].data_ocorrencia;
            data_fim_ocorrencia = rows[0].data_fim_ocorrencia;
            console.log(secondquery.sql);
            if (!err) {
              let transporter = nodemailer.createTransport(
                smtpTransport({
                  service: "Gmail",
                  auth: {
                    user: "Pmar.ot.2021@gmail.com",
                    pass: "pmarot2021",
                  },
                  tls: {
                    rejectUnauthorized: false,
                  },
                })
              );
              transporter.verify(function (err, success) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Email pronto a ser enviado");
                }
              });
              var mailOptions = {
                from: "Pmar.ot.2021@gmail.com",
                to: "pw.policiamaritima@gmail.com",
                cc: "Pmar.ot.2021@gmail.com",
                subject: "Dados da Ocorrência",
                text:
                  "Olá, \nVimos por este meio fornecer-vos as informações relativas à ocorrência: " +id_ocorrencia+
                  ".\nFreguesia: " +
                  freguesia +
                  " \nNome Equipa: " +
                  nome_equipa +
                  " \nData da ocorrência: " +
                  data_ocorrencia +
                  " - " +
                  data_fim_ocorrencia +
                  " \nAtenciosamente Responsavel Operações no terreno!",
              };

              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Email enviado: " + info.response);
                }
              });
            }
          }
        );
      } else {
        res.status(400).send("Ocorrência ainda se encontra em progresso");
      }
    }
  );
}

function updateCreditoOcorrencia(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  let id_estado;
  let duracao_ocorrencia;
  let id_nivel;
  let percentagem_sobrevivente;
  let creditos_ocorrencia;
  const query = connect.con.query(
    "SELECT id_estado, duracao_ocorrencia, id_nivel, percentagem_sobrevivente, creditos_ocorrencia FROM ocorrencia WHERE id_ocorrencia = ? and data_fim_ocorrencia IS NOT NULL",
    id_ocorrencia,
    function (err, rows, fields) {
      id_estado = rows[0].id_estado;
      creditos_ocorrencia = rows[0].creditos_ocorrencia;
      if (err) return res.status(500).end();
      if (id_estado == 2) {
        duracao_ocorrencia = rows[0].duracao_ocorrencia;
        id_nivel = rows[0].id_nivel;
        percentagem_sobrevivente = rows[0].percentagem_sobrevivente;
        switch (id_nivel) {
          case 1:
            creditos_ocorrencia = creditos_ocorrencia + 6;
            break;
          case 2:
            creditos_ocorrencia = creditos_ocorrencia + 12;
            break;
          case 3:
            creditos_ocorrencia = creditos_ocorrencia + 18;
            break;
          case 4:
            creditos_ocorrencia = creditos_ocorrencia + 24;
            break;
          case 5:
            creditos_ocorrencia = creditos_ocorrencia + 30;
            break;
        }
        if (duracao_ocorrencia < 60) {
          creditos_ocorrencia = creditos_ocorrencia + 20;
        }
        if (duracao_ocorrencia > 60) {
          creditos_ocorrencia = creditos_ocorrencia + 10;
        }
        if (percentagem_sobrevivente == 100) {
          creditos_ocorrencia = creditos_ocorrencia + 50;
        }
        if (percentagem_sobrevivente >= 50 && percentagem_sobrevivente < 100) {
          creditos_ocorrencia = creditos_ocorrencia + 30;
        }
        if (percentagem_sobrevivente > 0 && percentagem_sobrevivente < 50) {
          creditos_ocorrencia = creditos_ocorrencia + 10;
        }
        if (percentagem_sobrevivente == 0) {
          creditos_ocorrencia = creditos_ocorrencia + 0;
        }
        const update = [creditos_ocorrencia, id_ocorrencia];
        const query = connect.con.query(
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
          "A percentagem " +percentagem_sobrevivente + "% foi inserida com sucesso"
        );
      }
    );
  } else {
    res.send("Por favor, insira um valor entre 0 e 100...");
  }
}

function updateTempoDeslocacao(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  const tempo_deslocacao = req.body.tempo_deslocacao;
  const tempo_estimado_deslocacao = req.body.tempo_estimado_deslocacao;
  let update = [tempo_deslocacao, tempo_estimado_deslocacao, id_ocorrencia];
  const query = connect.con.query(
    "UPDATE ocorrencia SET tempo_deslocacao = ?, tempo_estimado_deslocacao = ? WHERE id_ocorrencia = ?",
    update,
    function (err, rows, fields) {
      if (!err) {
        console.log("Number of records updated: " + rows.affectedRows);
        res
          .status(200)
          .send("O tempo de deslocação real e estimado foram inseridos!");
      } else {
        res.status(400).send({ msg: err.code });
        console.log("Error while performing Query.", err);
      }
    }
  );
}

function readDiferencaTempo(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  let tempo_deslocacao;
  let tempo_estimado_deslocacao;
  let diferencaTempo;
  const query = connect.con.query(
    "SELECT tempo_deslocacao, tempo_estimado_deslocacao FROM ocorrencia WHERE id_ocorrencia = ?",
    id_ocorrencia,
    function (err, rows, fields) {
      tempo_deslocacao = rows[0].tempo_deslocacao;
      tempo_estimado_deslocacao = rows[0].tempo_estimado_deslocacao;
      diferencaTempo = tempo_estimado_deslocacao - tempo_deslocacao;
      console.log(tempo_deslocacao);
      console.log(tempo_estimado_deslocacao), console.log(diferencaTempo);
      if (!err) {
        if (rows.length == 0) {
          res.status(404).send("Data not found");
        } else {
          res.status(200).send(+diferencaTempo + "");
        }
      } else res.status(400).send({ Msg: err.code });
    }
  );
}

module.exports = {
  read: read,
  readAcabada: readAcabada,
  readOcorrenciaX: readOcorrenciaX,
  readCreditoOcorrenciaX: readCreditoOcorrenciaX,
  readOcorrenciaAtual: readOcorrenciaAtual,
  readGrafico: readGrafico,
  readDadosOcorrencia: readDadosOcorrencia,
  readDiferencaTempo: readDiferencaTempo,
  updateCreditoOcorrencia: updateCreditoOcorrencia,
  updateConfirmarPartidaOcorrencia: updateConfirmarPartidaOcorrencia,
  updateDuracaoOcorrencia: updateDuracaoOcorrencia,
  updatePercentagemSobrevivente: updatePercentagemSobrevivente,
  updateTempoDeslocacao: updateTempoDeslocacao,
};
