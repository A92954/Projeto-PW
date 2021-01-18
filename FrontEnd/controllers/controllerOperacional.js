window.onload = function () {
  readRankOp();
};

function readRankOp() {
  fetch("http://127.0.0.1:3000/agents/:pontos_gamificacao/ranking", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then((out) => {
      $("#tabela-ranking-operacionais").empty();
      $.each(out, function (index, valor) {
        $("#tabela-ranking-operacionais").append(
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
