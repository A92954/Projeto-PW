window.onload = async function () {
  readRankEq();
  readRankOp();
};

async function readRankOp() {
  fetch("http://127.0.0.1:3000/agents/:pontos_gamificacao/ranking", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then((out) => {
      $("#tabela-ranking-operacionais tbody").empty();
      $.each(out, function (index, valor) {
        $("#tabela-ranking-operacionais tbody").append(
          "<tr>" +
            "<td>" +
            valor.Ranking_operacionais +
            "</td>" +
            "<td>" +
            valor.pontos_gamificacao +
            "</td>" +
            "<td>" +
            valor.id_operacional +
            "</td>" +
            "</tr>"
        );
      });
    })
    .catch((err) => {
      alert("Erro ao carregar a tabela!" + err);
    });
}

async function readRankEq() {
  fetch("http://127.0.0.1:3000/teams/:creditos_equipa/ranking", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then((out) => {
      $("#tabela-ranking-equipa tbody").empty();
      $.each(out, function (index, valor) {
        $("#tabela-ranking-equipa tbody").append(
          "<tr>" +
            "<td>" +
            valor.Ranking_equipa +
            "</td>" +
            "<td>" +
            valor.creditos_equipa +
            "</td>" +
            "<td>" +
            valor.id_equipa +
            "</td>" +
            "</tr>"
        );
      });
    })
    .catch((err) => {
      alert("Erro ao carregar a tabela!" + err);
    });
}
