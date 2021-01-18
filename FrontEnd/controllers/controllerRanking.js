window.onload = async function () {
  readRankEq();
  readRankOp();
};

async function readRankOp() {
  let table = $("#tabela-ranking-operacionais").DataTable();

  fetch("http://127.0.0.1:3000/agents/:pontos_gamificacao/ranking")
    .then((res) => res.json())
    .then((out) => {
      $.each(out, function (index, value) {
        table.row
          .add([
            value.Ranking_operacionais,
            value.pontos_gamificacao,
            value.username,
            value.id_cargo,
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

function readRankEq() {
  let table = $("#tabela-ranking-equipa").DataTable();

  fetch("http://127.0.0.1:3000/teams/:creditos_equipa/ranking")
    .then((res) => res.json())
    .then((out) => {
      $.each(out, function (index, value) {
        table.row
          .add([
            value.Ranking_equipa,
            value.creditos_equipa,
            value.id_equipa,
            "filler",
            "filler",
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
