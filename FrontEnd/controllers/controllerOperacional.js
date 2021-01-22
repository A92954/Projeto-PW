window.onload() = function () {
  ocorrAtual();
  //mostraNome();
};

/*function ocorrAtual() {
  var idEq = 6;
  var response = await fetch(`http://127.0.0.1:3000/teams/${idEq}/view_team`);
  var nomeEq = response.nome_equipa;
  document.getElementById("nomeEquipaAtual").innerHTML
 
}*/
function mostraNome() {
  fetch("http://127.0.0.1:3000/agents/7/agent", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then((out) => {
      $.each(out, function (index, valor) {
        //
        document.getElementById("span_nome").innerHTML = valor.username;
      });
    })
    .catch((err) => {
      alert("Erro!" + err);
    });
}

$(document).ready(function () {
  mostraNome();
});
