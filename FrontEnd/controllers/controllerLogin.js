function login() {
  var data = {};
  data.nome_testemunha = document.getElementById("inputUser").value;
  data.email_testemunha = document.getElementById("inputPassword").value;
  console.log(data);
  fetch("https://a92954.github.io/signin", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(
      data
      // id_ocorrencia: idocorrencia,
    ),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
