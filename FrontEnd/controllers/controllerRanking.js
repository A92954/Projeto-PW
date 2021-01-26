//imprime o ranking dos operacionais
function readRankOp() {
  let table = $("#tabela-ranking-operacionais").DataTable();

  fetch("https://a92954.github.io/agentsRanking")
    .then((res) => res.json())
    .then((out) => {
      $.each(out, function (index, value) {
        table.row
          .add([
            value.Ranking_Operacionais,
            value.pontos_gamificacao,
            value.username,
            value.descricao_cargo,
          ])
          .draw();
      });
    })
    .catch((err) => console.error(err));
}

$(document).ready(function () {
  $("#tabela-ranking-operacionais").DataTable();
  readRankOp();
});

//imprime o ranking da equipa
function readRankEq() {
  let table = $("#tabela-ranking-equipa").DataTable();

  fetch("https://a92954.github.io/teamsRanking")
    .then((res) => res.json())
    .then((out) => {
      $.each(out, function (index, value) {
        table.row
          .add([
            value.Ranking_equipa,
            value.creditos_equipa,
            value.id_equipa,
            value.Numero_Ocorrencias,
          ])
          .draw();
      });
    })
    .catch((err) => console.error(err));
}

$(document).ready(function () {
  $("#tabela-ranking-equipa").DataTable();
  readRankEq();
});
