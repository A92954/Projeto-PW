window.onload = function () {
  document.getElementById("btnLogin").onclick = function () {
    login();
    console.log("clicado");
  };

  let username;
  // Autenticar administrador na área privada
  function login() {
    //data
    username = document.getElementById("inputUser").value;
    var data = {};
    data.username = document.getElementById("inputUser").value;
    data.password = document.getElementById("inputPassword").value;
    fetch("http://127.0.0.1:3000/signin/", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((out) => {
        localStorage.setItem("User", username);
        window.location.href =
          "http://127.0.0.1:5502/FrontEnd/Pagina-principal.html";
      })
      .catch((error) => {
        alert(error);
      });
  }
};

function atualizarUser() {
  var data = {};
  var username = "Portela_20";
  //data.username = document.getElementById("PerfilUser").value;
  data.nome = document.getElementById("PerfilNome1").value;
  data.email_utilizador = document.getElementById("PerfilEmail1").value;
  data.password = document.getElementById("password-perfil1").value;

  console.log(data); //debugging para ver os dados que foram enviados
  //chamada fetch para envio dos dados para o servior via POST

  fetch(`http://127.0.0.1:3000/users/${username}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
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
