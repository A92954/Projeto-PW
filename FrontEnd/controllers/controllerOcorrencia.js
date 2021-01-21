//quando inicia a página faz
window.onload = function () {
  verOcorrenciaAtual();
};


//REFRESH DA TABELA
function verOcorrenciaAtual() {
  fetch('http://127.0.0.1:3000/agents/7/accurring', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
  })
      .then(res => res.json())
      .then((out) => {
         // $('#label_local tbody').empty();
          $.each(out, function (index, valor) {
         //
          document.getElementById("label_local").innerHTML = "Local da ocorrência: " + valor.freguesia;
          document.getElementById("label_urgencia").innerHTML = "Grau de urgência: " + valor.descricao_urgencia;
          document.getElementById("label_nomeEquipa").innerHTML = "Equipa: " + valor.nome_equipa;
       




          });

      }).catch(err => {

          alert("Erro!" + err);
      });
}


//REFRESH DA TABELA
function tabelaHist() {
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
            "FIller",
          ])
          .draw();
      });
    })
    .catch((err) => console.error(err));
}

$(document).ready(function () {
  $("#tabela-historico-ocorrencias").DataTable();
  tabelaHist();
});
