

function verificarTempos() {
    var data = {};
    data.tempo_estimado_deslocacao = document.getElementById("tempoEstimado").value;
    data.tempo_deslocacao = document.getElementById("tempoReal").value;
    fetch('http://127.0.0.1:3000/occurrences/4/times', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
     
    })
      .then((res) => res.text())
      .then((out) => {
       alert(out);
      
        
      })
      .catch(error => {
        alert(error);
    });
  }