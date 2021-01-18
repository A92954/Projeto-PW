//quando inicia a página faz
window.onload = function () {
  //chama a função para atualizar a lista de pedidos
  verHistOcorrencias();
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
function verHistOcorrencias() {
  fetch("http://127.0.0.1:3000/occurrences/finished", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then((out) => {
      $("#tabela-historico-ocorrencias tbody").empty();
      $.each(out, function (index, valor) {
        $("#tabela-historico-ocorrencias tbody").append(
          "<tr>" +
            "<td>" +
            valor.id_ocorrencia +
            "</td>" +
            "<td>" +
            valor.freguesia +
            "</td>" +
            "<td>" +
            valor.id_equipa +
            "</td>" +
            "<td>" +
            valor.descricao_urgencia +
            "</td>" +
            "<td>" +
            valor.data_ocorrencia +
            "</td>" +
            "</tr>"
        );
      });
    })
    .catch((err) => {
      alert("Erro ao carregar a tabela!" + err);
    });
}
