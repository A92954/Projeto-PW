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

$(document).ready(function () {
  $("#tabela-historico-ocorrencias").DataTable();
  $("#tabela-historico-ocorrencias tbody").on("click", "tr", function () {
    $("#historico-popup").modal("show");
    var id_ocorr = $("td", this).eq(0).text(); //eq(2) increase the value inside eq() will display the txt column wise.
    $("#id_ocorr_selec").text(id_ocorr);
    var credito_equipa = $("td", this).eq(5).text();
    $("#credito_ocorr").text(credito_equipa);
  });
});
$("#tabela-historico-ocorrencias").on("keyup", function () {
  tableInstance.search(this.value).draw(); // try this easy code and check if works at first
});
