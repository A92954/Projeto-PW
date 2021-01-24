var id_ocorr = "4";

function confirmarOcorrencia() {
    console.log(id_ocorr);
    fetch(`http://127.0.0.1:3000/occurrences/${id_ocorr}/check_departure`, {
      //mudar a rota do fetch
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.text())
      .then((out) => {
       alert(out);
       window.location.href=("http://127.0.0.1:5501/FrontEnd/Relatorio.html");
        
      })
      .catch((error) => {
        alert(error);
      });
  }