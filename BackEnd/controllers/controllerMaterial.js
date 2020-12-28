const connect = require("../database");

function read(req, res) {
  const query = connect.con.query(
    "SELECT * FROM material",
    function (err, rows, fields) {
      res.send(rows);
    }
  );
}

function confirmarLevantamento(req, res) {
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
}

function confirmarMaterialUsado(req, res) {
  const id_material = req.params.id_material;
  let quantidade_usada = req.body.quantidade_usada;
  quantidade_usada = parseInt(quantidade_usada, 10);
  const query = connect.con.query(
    "SELECT m.nome_material, om.quantidade_usada FROM ocorrencia_material om, material m WHERE id_material = ? and om.id_material = m.id_material",
    [id_material, quantidade_usada],
    function (err, rows, fields) {
      res.send("Material confirmado");
    }
  );
}
module.exports = {
  read: read,
  confirmarLevantamento: confirmarLevantamento,
  confirmarMaterialUsado: confirmarMaterialUsado,
};
