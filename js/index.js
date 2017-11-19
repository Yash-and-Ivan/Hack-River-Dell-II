function updateWindow() {
  if ($.trim($("#toAnalyze").val()) == "") {
    $("#formOut").html("You gotta enter something, man");
    return false;
  }
  window.location = "results.html?searchQuery=" + $.trim($("#toAnalyze").val());
}

function doBackgroundChart() {
  bgChart = document.getElementById("backgroundChart").getContext('2d');
  bgChart = new Chart(bgChart, {
    type: 'bar',
    data: {
      labels: arrayTo(150),
      datasets: [{
        backgroundColor: "rgba(124, 241, 255, 0.5)",
        data: randomArray(150)
      }]
    },
    options: {
      interactive: false,
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
  window.setInterval(function() {
    addData(bgChart);
  }, 1250);
}

function addData(chart, label, data) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data = kindaRandomArray(dataset.data);
  });
  chart.update();
}

function kindaRandomArray(arrayIn) {
  out = [];
  for (var i = 0; i < arrayIn.length; i++) {
    if (Math.random() <= 0.5) {
      out.push(Math.abs(arrayIn[i] + Math.random()) % 1)
    } else {
      out.push(arrayIn[i])
    }
  }
  return out;
}

function randomArray(n) {
  var foo = [];
  for (var i = 0; i < n; i++) {
    foo.push(Math.random())
  }
  return foo;
}

function arrayTo(n) {
  var foo = [];

  for (var i = 0; i < n; i++) {
    foo.push(i);
  }
  return foo;
}
