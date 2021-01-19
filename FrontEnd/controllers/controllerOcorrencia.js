//quando inicia a página faz
window.onload = function () {
  //chama a função para atualizar a lista de pedidos
  //adicionar função de validação ao formulário
  /*  validator();
    document.getElementById("formNewPedidoAjuda").onsubmit = function (e) {
        //validação do formulário ao submeter
        validator();*/
};

//função de validação
function validator() {
  let validator = new Validator(
    document.querySelector('form[name="formNewPedidoAjuda"]'),
    function (err, res) {
      if (res) {
        registarPedido();
      }
    },
    {
      messages: {
        en: {
          /*password: {
                    incorrect: "Password didn't match"
                    }*/
        },
      },
    }
  );
}
//REFRESH DA TABELA
function listUsers() {
  let table = $("#tabela-historico-ocorrencias").DataTable();

  fetch("http://127.0.0.1:3000/occurrences/finished")
    .then((res) => res.json())
    .then((out) => {
      $.each(out, function (index, value) {
        table.row
          .add([
            value.id_ocorrencia,
            value.freguesia,
            value.id_equipa,
            value.descricao_urgencia,
            value.data_ocorrencia,
            value.id_equipa,
          ])
          .draw();
      });
    })
    .catch((err) => console.error(err));
}

$(document).ready(function () {
  $("#tabela-historico-ocorrencias").DataTable();
  listUsers();
});
