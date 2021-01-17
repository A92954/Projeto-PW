// Call the dataTables jQuery plugin
$(document).ready(function () {
  $("#dataTable").DataTable();
});

$(document).ready(function () {
  $("#tabela-testemunhas").DataTable();
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
  "#tabela-historico-ocorrencias , #tabela-ranking-equipa , #tabela-ranking-operacionais , #tabela-testemunhas , #tabela-equipa-oco-atual , #tabela-equipa-oco-decorrer"
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

$("#tabela-historico-ocorrencias").on("click", "td", function () {
  var name = $("td", this).eq(1).text();
  $("#historico-popup").modal("show");
});

$("#tabela-historico-ocorrencias").on("keyup", function () {
  tableInstance.search(this.value).draw(); // try this easy code and check if works at first
});
