const connect = require("../database");

function read(req, res) {
  const query = connect.con.query(
    "SELECT * FROM testemunha",
    function (err, rows, fields) {
      res.send(rows);
    }
  );
}

function registo(req, res) {
  const nome_testemunha = req.body.nome_testemunha;
  const email_testemunha = req.body.email_testemunha;
  const profissao_testemunha = req.body.profissao_testemunha;
  const localidade_testemunha = req.body.localidade_testemunha;
  const notas_testemunha = req.body.notas_testemunha;
  const id_ocorrencia = req.body.id_ocorrencia;
  let id_testemunha;
  const post = [nome_testemunha, email_testemunha, profissao_testemunha, localidade_testemunha, notas_testemunha];
  const query = connect.con.query(
    "INSERT INTO testemunha  SET nome_testemunha = ?, email_testemunha = ?, profissao_testemunha = ?, localidade_testemunha = ?, notas_testemunha = ?",
    post,
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
  const query2 =
    "SELECT id_testemunha FROM testemunha WHERE nome_testemunha = ? and email_testemunha = ?";
  connect.con.query(query2, post, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      id_testemunha = rows[0].id_testemunha;
      const post2 = [id_ocorrencia, id_testemunha];
      const query3 = connect.con.query(
        "INSERT INTO depoimento SET id_ocorrencia = ?, id_testemunha = ?",
        post2,
        function (err, rows, fields) {
          if (err) {
            console.log(err);
          } else {
            res.send("Testemunha associada com sucesso");
          }
        }
      );
    }
  });
}

module.exports = {
  read: read,
  registo: registo,
};
