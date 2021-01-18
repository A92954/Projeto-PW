window.onload = function () {
  readRankEq();
};

function readRankEq() {
  fetch("http://127.0.0.1:3000/teams/:creditos_equipa/ranking", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then((out) => {
      $("#tabela-ranking-equipa").empty();
      $.each(out, function (index, valor) {
        $("#tabela-ranking-equipa").append(
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
