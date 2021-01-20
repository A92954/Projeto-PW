window.onload() = function () {
  ocorrAtual();
};

function ocorrAtual() {
  var idEq = 6;
  var response = await fetch(`http://127.0.0.1:3000/teams/${idEq}/view_team`);
  var nomeEq = response.nome_equipa;
  var Eq = JSON.stringify(nomeEq);
  $("#nomeEquipaAtual").text(nomeEq);
 
}
