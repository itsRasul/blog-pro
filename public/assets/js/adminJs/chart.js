/*eslint-disable*/
document.addEventListener('DOMContentLoaded', function () {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'total views in month',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 70, 20, 30, 45],
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {},
  };

  const myChart = new Chart(
    document.getElementById('myChart-total-views'),
    config
  );
});
