
window.onload = function () {
  getTestemunhas();
  materialUsadoNoLocal();
  document.getElementById("btn_criarTestemunha").onclick = function () {
    createTestemunha();
    };
};

function getTestemunhas() {
  let table = $("#tabela-testemunhas").DataTable();
  fetch('http://127.0.0.1:3000/occurrences/4/witnesses')
          .then((res) => res.json())

          .then((out) => {
            console.log(out);
            $("#tabela-testemunhas tbody").empty();
            $.each(out, function (index, value) {
              console.log(value);
              table.row.add([value.nome_testemunha, 
                            value.localidade_testemunha,
                            value.profissao_testemunha,
                            value.email_testemunha,
                            value.notas_testemunha]).draw();
            });
          });
}



function createTestemunha() {
console.log("Adicionado com sucesso!");
    var data = {};
   data.nome_testemunha = document.getElementById("nomeTestemunha").value;
    data.email_testemunha = document.getElementById("emailTestemunha").value;
     data.profissao_testemunha = document.getElementById("nomeTestemunha").value;
    data.localidade_testemunha = document.getElementById("localTestemunha").value;
     data.notas_testemunha = document.getElementById("notasTestemunha").value;
   // var idocorrencia="4";   ${idocorrencia}
  console.log(data);
    fetch('http://127.0.0.1:3000/witnesses/4/registration', {  
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data)
})
  .then(function(response) {
    return response.json();
  }).then(function(data) {
   console.log(data);
  });
  window.location.reload();
}

function materialUsadoNoLocal() {
  fetch('http://127.0.0.1:3000/materials/4/confirm', {
    //mudar a rota do fetch
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then((out) => {
      $.each(out, function (index, valor) {
        var x = document.getElementById("listaMatUtilizadoNoLocal");
        var c = document.createElement("option");
        c.text = valor.quantidade_usada + " --> " + valor.nome_material;
        x.options.add(c, 1);
      });
    });
}
