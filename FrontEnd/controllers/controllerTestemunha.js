/*function criaTestemunha() {
  var data = {};
  data.nome_testemunha = document.getElementById("nomeTestemunha").value;
  data.email_testemunha = document.getElementById("emailTestemunha").value;
  data.profissao_testemunha = document.getElementById("nomeTestemunha").value;
  data.localidade_testemunha = document.getElementById("emailTestemunha").value;
  data.notas_testemunha = document.getElementById("notasTestemunha").value;
 

  console.log(data); //debugging para ver os dados que foram enviados
  //chamada fetch para envio dos dados para o servior via POST
  fetch("http://127.0.0.1:3000/witnesses/registration", {
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
        document.getElementById("formTestemunha").reset(); //limpeza dos dados do form
        alert("submitted with success");
      }
    })
    .then(function (result) {
      console.log(result);
    })
    .catch(function (err) {
      alert("Submission error");
      console.error(err);
    });
}*/
document.getElementById("btn_criarTestemunha").onclick = function () {
console.log("olá testemunha");
};


function createTestemunha(opts) {
  var nometestemunha = document.getElementById("nomeTestemunha");
  var emailtestemunha = document.getElementById("emailTestemunha");
  var profissaotestemunha = document.getElementById("nomeTestemunha");
  var localidadetestemunha = document.getElementById("emailTestemunha");
  var notastestemunha = document.getElementById("notasTestemunha");
  var idocorrencia="2";
  fetch('http://127.0.0.1:3000/witnesses/registration', {  
    method: 'post',
    body: JSON.stringify({
        nome_testemunha: nometestemunha,
        email_testemunha: emailtestemunha,
        profissao_testemunha: profissaotestemunha,
        localidade_testemunha: localidadetestemunha,
        notas_testemunha: notastestemunha,
        id_ocorrencia: idocorrencia,
    })
  
  })
  .then(function(response) {
    return response.json();
  }).then(function(data) {
   console.log(data);s
  });
}