window.onload() = function () {
  let user = localStorage.User;
  console.log(user);
  document.getElementById("btnAtualiza").onclick = function () {
    atualizarUser(user);
  };
};

function atualizarUser(user) {
  var data = {};
  //data.username = document.getElementById("PerfilUser").value;
  data.nome = document.getElementById("PerfilNome1").value;
  data.email_utilizador = document.getElementById("PerfilEmail1").value;
  data.password = document.getElementById("password-perfil1").value;

  console.log(data);

  fetch(`http://127.0.0.1:3000/users/${user}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    //Then with the data from the response in JSON...
    .then((data) => {
      console.log("Success:", data);
      alert(user);
    })
    //Then with the error genereted...
    .catch((error) => {
      console.error("Error:", error);
    });
}
