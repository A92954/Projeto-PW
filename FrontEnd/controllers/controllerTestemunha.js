


function getTestemunhas() {
  fetch("http://127.0.0.1:3000/agents/7/accurring")
    .then((res) => res.json())
    .then((out) => {
      /*$.each(out, function (index, valor) {
        console.log(valor.id_ocorrencia);
        return valor.id_ocorrencia;
      });*/
      let id_ocorr;
      id_ocorr = out[0].id_ocorrencia;
      document.getElementById("btnTestemunhas").onclick = function () {
        confirmarOcorrencia(id_ocorr);
      };
      materialUsado(id_ocorr);
    })
    .catch((err) => console.error(err));
}

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
createTestemunha();
console.log("clicado");
};


function createTestemunha() {
  /*var nometestemunha = document.getElementById("nomeTestemunha");
  var emailtestemunha = document.getElementById("emailTestemunha");
  var profissaotestemunha = document.getElementById("nomeTestemunha");
  var localidadetestemunha = document.getElementById("emailTestemunha");
  var notastestemunha = document.getElementById("notasTestemunha");
 // var idocorrencia="4";   ${idocorrencia}

  fetch('http://127.0.0.1:3000/witnesses/4/registration', {  
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
        nome_testemunha: nometestemunha,
        email_testemunha: emailtestemunha,
        profissao_testemunha: profissaotestemunha,
        localidade_testemunha: localidadetestemunha,
        notas_testemunha: notastestemunha,
       // id_ocorrencia: idocorrencia,
    })*/
    var data = {};
   data.nome_testemunha = document.getElementById("nomeTestemunha").value;
    data.email_testemunha = document.getElementById("emailTestemunha").value;
     data.profissao_testemunha = document.getElementById("nomeTestemunha").value;
    data.localidade_testemunha = document.getElementById("emailTestemunha").value;//alterar
     data.notas_testemunha = document.getElementById("notasTestemunha").value;
   // var idocorrencia="4";   ${idocorrencia}
  console.log(data);
    fetch('http://127.0.0.1:3000/witnesses/4/registration', {  
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(
        data
         // id_ocorrencia: idocorrencia,
      )


  })
  .then(function(response) {
    return response.json();
  }).then(function(data) {
   console.log(data);
  });
}

/*
function createTestemunha() {
  let data = {'http://127.0.0.1:3000/witnesses/4/registration'};
  data.nometestemunha = document.getElementById("nomeTestemunha");
  data.emailtestemunha = document.getElementById("emailTestemunha");
  data.profissaotestemunha = document.getElementById("nomeTestemunha");
  data.localidadetestemunha = document.getElementById("emailTestemunha");
  data.notastestemunha = document.getElementById("notasTestemunha");
  
  try{
    fetch(, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data),
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
    })
} catch(err){
    console.log({msg: err});
}
}*/

/*
function registerMaterial() {
    let data = {`http://127.0.0.1:3000/witnesses/4/registration`};
    data.nome_material = document.getElementById('nomeInput').value;
    data.descricao_material = document.getElementById('descricaoInput').value;
    data.quantidade_total = document.getElementById('quantidadeInput').value;
    data.quantidade_disponivel = document.getElementById('quantidadeInput').value;

    try{
        fetch(, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data),
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
        })
    } catch(err){
        console.log({msg: err});
    }
}*/