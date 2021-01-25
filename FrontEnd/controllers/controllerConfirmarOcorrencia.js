//const { updateDuracaoOcorrencia } = require("../../BackEnd/controllers/controllerOcorrencia");

document.getElementById("btn_ConcluirOperacao").onclick = function () {
  update_DataFim();
};

var id_ocorr = "4";


function update_DataFim() {
    console.log(id_ocorr);
    fetch(`http://127.0.0.1:3000/occurrences/${id_ocorr}/finishdate`, {
      //mudar a rota do fetch
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.text())
      .then((out) => {
        alert("1");
        update_PercentagemSobreviventes();
      })
      .catch((error) => {
        alert(error);
      });
  }


  function update_PercentagemSobreviventes() {
    console.log(id_ocorr);
    fetch(`http://127.0.0.1:3000/occurrences/${id_ocorr}/survival`, {
      //mudar a rota do fetch
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.text())
      .then((out) => {
       alert("2");
        update_DuracaoOcorrencia();
      })
      .catch((error) => {
        alert(error);
      });
  }


  function update_DuracaoOcorrencia() {
    console.log(id_ocorr);
    fetch(`http://127.0.0.1:3000/occurrences/${id_ocorr}/duration`, {
      //mudar a rota do fetch
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.text())
      .then((out) => {
       alert("3");
        update_CreditoOcorrencia();
      })
      .catch((error) => {
        alert(error);
      });
  }


  function update_CreditoOcorrencia() {
    console.log(id_ocorr);
    fetch(`http://127.0.0.1:3000/occurrences/${id_ocorr}/credit`, {
      //mudar a rota do fetch
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.text())
      .then((out) => {
       alert("4");
        update_CreditoEquipa();
      })
      .catch((error) => {
        alert(error);
      });
  }


  function update_CreditoEquipa() {
    console.log(id_ocorr);
    fetch(`http://127.0.0.1:3000/occurrences/${id_ocorr}/credit_team`, {
      //mudar a rota do fetch
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.text())
      .then((out) => {
       alert("5");
        update_CreditoOperacional();
      })
      .catch((error) => {
        alert(error);
      });
  }


  function update_CreditoOperacional() {
    console.log(id_ocorr);
    fetch(`http://127.0.0.1:3000/occurrences/${id_ocorr}/put_credit`, {
      //mudar a rota do fetch
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.text())
      .then((out) => {
       alert("6");
        
      })
      .catch((error) => {
        alert(error);
      });
  }

//mostrar materiais no relatorio
function enviaDados() {   
  fetch(`http://127.0.0.1:3000/occurrences/${ler}/sendmail`, {
    //mudar a rota do fetch
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then((out) => {
     alert("7");
      });
    
}
 