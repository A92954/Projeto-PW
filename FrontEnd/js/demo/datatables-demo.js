// Call the dataTables jQuery plugin
$(document).ready(function () {
  $("#dataTable").DataTable();
});

$(document).ready(function () {
  $("#tabela-testemunha-acabado").DataTable();
});

$(document).ready(function () {
  $("#tabela-testemunhas").DataTable();
});

$(document).ready(function () {
  $("#tabela-equipa-relatorio").DataTable();
});

$(document).ready(function () {
  $("#tabela-historico-ocorrencias").DataTable();
});

$(document).ready(function () {
  $("#tabela-ranking-operacionais").DataTable();
});

$(document).ready(function () {
  $("#tabela-ranking-equipa").DataTable();
});

$(document).ready(function () {
  $("#tabela-equipa-oco-atual").DataTable();
});

$(document).ready(function () {
  $("#tabela-equipa-oco-decorrer").DataTable();
});

$(
  "#tabela-testemunha-acabado , #tabela-historico-ocorrencias , #tabela-ranking-equipa , #tabela-ranking-operacionais , #tabela-testemunhas , #tabela-equipa-oco-atual , #tabela-equipa-oco-decorrer , #tabela-equipa-relatorio"
).DataTable({
  language: {
    sprocessing: "Tratamento em curso...",
    search: "Procurar",
    lengthMenu: "Ver elementos _MENU_",
    info: "Mostrando _START_ de _END_ entradas",
    infoEmpty: "",
    infoFiltered: "(De um total de _MAX_)",
    infoPostFix: "",
    loadingRecords: "Carregamento em curso...",
    zeroRecords: "Não foi encontrado nenhum registo correspondente.",
    emptyTable: "Não existe dados disponíveis na tabela",
    paginate: {
      first: "Primeiro",
      previous: "Anterior",
      next: "Seguinte",
      last: "Ultimo",
    },
    aria: {
      sortAscending: ": Ordenar por ordem crescente",
      sortDescending: ": Ordenar por ordem decrescente",
    },
  },
});

$(document).ready(function () {
  $("#tabela-historico-ocorrencias").DataTable();
  $("#tabela-historico-ocorrencias tbody").on("click", "tr", function () {
    $("#historico-popup").modal("show");
    var id_ocorr = $("td", this).eq(0).text(); //eq(2) increase the value inside eq() will display the txt column wise.
    $("#id_ocorr_selec").text(id_ocorr);

    var response = fetch(
      `http://127.0.0.1:3000/materials/${id_ocorr}/material`
    );
    var mat_usado = JSON.stringify(response);
    $("#material_usado").text(mat_usado);

    $(document).ready(function () {
      $("#tabela-testemunha-acabado").DataTable();
      getTestemunha();
    });

    var credito_equipa = $("td", this).eq(5).text();
    $("#credito_ocorr").text(credito_equipa);
  });
});
$("#tabela-historico-ocorrencias").on("keyup", function () {
  tableInstance.search(this.value).draw(); // try this easy code and check if works at first
});

function getTestemunha() {
  let table = $("#tabela-testemunha-acabado").DataTable();
  var par = id_ocorr;

  fetch(`http://127.0.0.1:3000/occurrences/${par}/witnesses`)
    .then((res) => res.json())
    .then((out) => {
      console.log(out);
      $.each(out, function (index, value) {
        console.log(value),
          table.row
            .add([
              value.nome_testemunha,
              value.profissao_testemunha,
              value.localidade_testemunha,
            ])
            .draw();
      });
    })
    .catch((err) => console.error(err));
}

function getEquipa() {
  let table = $("#tabela-equipa-oco-decorrer").DataTable();
  var par = id_ocorr;

  fetch(`http://127.0.0.1:3000/teams/${par}/members`)  
    .then((res) => res.json())
    .then((out) => {
      console.log(out);
      $.each(out, function (index, value) {
        console.log(value),
          table.row
            .add([
              value.id_operacional,
              value.username,
            ])
            .draw();
      });
    })
    .catch((err) => console.error(err));
}

// TENTAR SUBLINHAR A LINHA DO RANKING DO GAJO (acho q está só da para fazer qd der o login, para sabermos quem está ligado)
/*
$(document).ready(function () {
  $("#tabela-ranking-operacionais").DataTable();
  $("#taabela-ranking-operacionais tbody").on("click", "tr", function () {
    var id_ocorr = $("td", this).eq(0).text();
    $("#id_ocorr_selec").text(id_ocorr);

    var response = fetch(
      `http://127.0.0.1:3000/materials/${id_ocorr}/material`
    );
    var mat_usado = JSON.stringify(response);
    $("#material_usado").text(mat_usado);

    var credito_equipa = $("td", this).eq(5).text();
    $("#credito_ocorr").text(credito_equipa);
  });
});
$("#tabela-ranking-operacionais").on("keyup", function () {
  tableInstance.search(this.value).draw(); 
});
*/
