let yNivel = [];
//chartPie();
// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#858796";

/*async function getValue() {
  fetch(`http://127.0.0.1:3000/occurrencesLevel`)
    .then((res) => res.json())
    .then((out) => {
      yNivel.push(out[0].Numero_Ocorrencias);
      yNivel.push(out[1].Numero_Ocorrencias);
      yNivel.push(out[2].Numero_Ocorrencias);
      yNivel.push(out[3].Numero_Ocorrencias);
      yNivel.push(out[4].Numero_ocorrencias);
      console.log(yNivel);
    })
    .catch((err) => console.error(err));
}*/

// Pie Chart Example
/*function chartPie() {
  fetch(`http://127.0.0.1:3000/occurrencesLevel`)
    .then((res) => res.json())
    .then((out) => {
      yNivel.push(out[0].Numero_Ocorrencias);
      yNivel.push(out[1].Numero_Ocorrencias);
      yNivel.push(out[2].Numero_Ocorrencias);
      yNivel.push(out[3].Numero_Ocorrencias);
      yNivel.push(/*out[4].Numero_ocorrencias 8);
      console.log(yNivel);
    })
    .catch((err) => console.error(err));
  console.log(yNivel);
  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Nível 1", "Nível 2", "Nível 3", "Nível 4", "Nível 5"],
      datasets: [
        {
          backgroundColor: [
            "#4e73df",
            "#1cc88a",
            "#36b9cc",
            "#1cc88a",
            "#1cc88a",
          ],
          hoverBackgroundColor: [
            "#2e59d9",
            "#17a673",
            "#2c9faf",
            "#1cc88a",
            "#1cc88a",
          ],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
          data: yNivel,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: "#dddfeb",
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false,
      },
      cutoutPercentage: 80,
    },
  });
}*/
