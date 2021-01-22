//quando inicia a página faz
window.onload = function () {
  verOcorrenciaAtual();
  materialUsado();
};

document.getElementById("btnTestemunhas").onclick = function () {
  confirmarOcorrencia();
  //mudarEstadoOcorrencia();
};

document.getElementById("check-presenca").onclick = function() {
  materialUsado();
}

//let id_ocorr = getOcorr();
let id_ocorr = "7";
console.log(id_ocorr);

function confirmarOcorrencia() {
  fetch("http://127.0.0.1:3000/materials/4/material", {
    //mudar a rota do fetch
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then((out) => {
      $.each(out, function (index, valor) {
        //      document.getElementById("teste").innerHTML = "Local da ocorrência: ";

        var x = document.getElementById("exampleFormControlSelect2");
        var c = document.createElement("option");
        c.text = valor.quantidade_usada + " --> " + valor.nome_material;
        x.options.add(c, 1);
      });
    })
    .catch((err) => {
      alert("Erro!" + err);
    });
}

function mudarEstadoOcorrencia() {
  fetch('http://127.0.0.1:3000/occurrences/4/check_departure', {
    //mudar a rota do fetch
    headers: { "Content-Type": "application/json" },
    method: "PUT",
  })
    .then((res) => res.json())
    .then((out) => {
      console.log("Estado alterado");
      });
    
}

function materialUsado() {
  fetch("http://127.0.0.1:3000/materials/4/material", {
    //mudar a rota do fetch
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then((out) => {
      $.each(out, function (index, valor) {
        //      document.getElementById("teste").innerHTML = "Local da ocorrência: ";

        var x = document.getElementById("exampleFormControlSelect2");
        var c = document.createElement("option");
        c.text = valor.quantidade_usada + " --> " + valor.nome_material;
        x.options.add(c, 1);
      });
    })
    .catch((err) => {
      alert("Erro!" + err);
    });
}

//REFRESH DA TABELA
function verOcorrenciaAtual() {
  let id_ocorr = "7";
  fetch(`http://127.0.0.1:3000/agents/${id_ocorr}/accurring`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then((out) => {
      // $('#label_local tbody').empty();
      $.each(out, function (index, valor) {
        document.getElementById("label_local").innerHTML =
          "Local da ocorrência: " + valor.freguesia;
        document.getElementById("label_urgencia").innerHTML =
          "Grau de urgência: " + valor.descricao_urgencia;
        //document.getElementById("label_nomeEquipa").innerHTML =
        //"Equipa: " + valor.nome_equipa;
      });
    })
    .catch((err) => {
      alert("Erro!" + err);
    });
}

function verEqOcorrAtual() {
  let table = $("#tabela-equipa-oco-atual").DataTable();
  let id_ocorr = "4";
  fetch(`http://127.0.0.1:3000/teams/${id_ocorr}/view_team`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())

    .then((out) => {
      $.each(out, function (index, valor) {
        document.getElementById("label_nomeEquipa").innerHTML =
          "Equipa: " + valor.nome_equipa;
        var id_eq = valor.id_equipa;

        fetch(`http://127.0.0.1:3000/teams/${id_eq}/members`, {
          headers: { "Content-Type": "application/json" },
          method: "GET",
        })
          .then((res) => res.json())

          .then((out) => {
            $("#tabela-equipa-oco-atual tbody").empty();
            $.each(out, function (index, value) {
              table.row.add([value.id_equipa, value.username]).draw();
            });
          });
      });
    })

    .catch((err) => {
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
