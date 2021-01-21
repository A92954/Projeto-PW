window.onload = function () {
  mostraNome();
};

function atualizarUser() {
  var data = {};
  //data.username = document.getElementById("PerfilUser").value;
  data.nome = document.getElementById("PerfilNome").value;
  data.email_utilizador = document.getElementById("PerfilEmail").value;
  data.password = document.getElementById("password-perfil").value;

  console.log(data); //debugging para ver os dados que foram enviados
  //chamada fetch para envio dos dados para o servior via POST
  fetch("http://127.0.0.1:3000/utilizador/Portela_20", {
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    //Then with the data from the response in JSON...
    .then((data) => {
      console.log("Success:", data);
    })
    //Then with the error genereted...
    .catch((error) => {
      console.error("Error:", error);
    });
}

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
