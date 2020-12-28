function atualizarUser() {
  var data = {};
  data.username = document.getElementById("PerfilUser").value;
  data.nome = document.getElementById("PerfilNome").value;
  data.email_utilizador = document.getElementById("PerfilEmail").value;
  data.password = document.getElementById("PerfilPass").value;

  console.log(data); //debugging para ver os dados que foram enviados
  //chamada fetch para envio dos dados para o servior via POST
  fetch("http://127.0.0.1:3000/user/:username", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (!response.ok) {
        console.log(response.status); //=> number 100–599
        console.log(response.statusText); //=> String
        console.log(response.headers); //=> Headers
        console.log(response.url); //=> String
        if (response.status === 409) {
          alert("Duplicated Email");
        } else {
          throw Error(response.statusText);
        }
      } else {
        document.getElementById("FormPerfil").reset(); //limpeza dos dados do form
        alert("submitted with success");
        refreshUsers();
      }
    })
    .then(function (result) {
      console.log(result);
    })
    .catch(function (err) {
      alert("Submission error");
      console.error(err);
    });
}
