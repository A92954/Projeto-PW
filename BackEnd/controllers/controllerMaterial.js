const connect = require("../database");

function read(req, res) {
  const query = connect.con.query("SELECT * FROM material",
    function (err, rows, fields) {
      if (!err) {
        if (rows.length == 0) {
          res.status(404).send("Data not found");
        }
        else {
          res.status(200).send(rows);
        }
      } else
        console.log('Error while performing Query.', err);
  });
}

/*function confirmarLevantamento(req, res) {
  const id_material = req.params.id_material;
  let quantidade_saida = req.body.quantidade_saida;
  quantidade_saida = parseInt(quantidade_saida, 10);
  let quantidade_disponivel;
  const query = connect.con.query(
    "SELECT quantidade_disponivel FROM material WHERE id_material = ?",
    id_material,
    function (err, rows, fields) {
      //console.log(query.sql);
      quantidade_disponivel = rows[0].quantidade_disponivel;
      quantidade_disponivel = quantidade_disponivel - quantidade_saida;
      const update = [quantidade_disponivel, id_material];
      const secondquery = connect.con.query(
        "UPDATE material SET quantidade_disponivel = ? WHERE id_material = ?",
        update,
        function (err, rows, fields) {
          //console.log(query.sql);
          res.send("Quantidade confirmada");
        }
      );
    }
  );
}*/

function readMaterialOcorrencia(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  const query = connect.con.query('SELECT m.nome_material, om.quantidade_usada FROM material m, ocorrencia_material om WHERE om.id_ocorrencia = ? and m.id_material = om.id_material', id_ocorrencia,
    function(err, rows, fields) {
      if (!err) {
        if (rows.length == 0) {
          res.status(404).send({"msg": "data not found"});
        }
        else {
          res.status(200).send(rows);
        }
      } else
        res.status(400).send({"msg": err.code});
        console.log('Error while performing Query.', err);
  });
}

function readConfirmarMaterialUsado(req, res) {
  const id_material = req.params.id_material;
  const query = connect.con.query(
    "SELECT m.nome_material, om.quantidade_usada FROM ocorrencia_material om, material m WHERE m.id_material = ? and om.id_material = m.id_material",
    id_material,
    function (err, rows, fields) {
      if (!err) {
        if (rows.length == 0) {
          res.status(404).send({"msg": "data not found"});
        }
        else {
          res.status(200).send(rows[0]);
        }
      } else
        res.status(400).send({"msg": err.code});
        console.log('Error while performing Query.', err);
    }
  );
}

function updateConfirmarLevantamento(req, res) {
  const id_ocorrencia = req.params.id_ocorrencia;
  const id_material = req.params.id_material;
  update = [id_ocorrencia, id_material];
  const query = connect.con.query('UPDATE ocorrencia_material SET confirmado_material = 1 WHERE id_ocorrencia = ? and id_material = ?', update, 
    function(err, rows, fields) {
      if (err) return res.status(500).end();
      res.send("O material " + id_material + " foi levantado para a " + id_ocorrencia);
    });
}

module.exports = {
  read: read,
  readMaterialOcorrencia: readMaterialOcorrencia,
  readConfirmarMaterialUsado: readConfirmarMaterialUsado,
  updateConfirmarLevantamento: updateConfirmarLevantamento
};
