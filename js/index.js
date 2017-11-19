function updateWindow() {
  if ($.trim($("#toAnalyze").val()) == "") {
    $("#formOut").html("You gotta enter something, man");
    return false;
  }
  window.location = "results.php?searchQuery=" + escape($.trim($("#toAnalyze").val()));
}

function doBackgroundChart() {
  suggestions = ["#donaldtrump", "#life", "#cars", "#republican", "#democrat", "#russia",
                 "#food", "#potus", "#hillary", "#bringbackobama", "#america", "#school",
                 "#work", "#hack"]
  suggestions = shuffle(suggestions);
  $("#res1").html(suggestions[0]);
  $("#res2").html(suggestions[1]);
  $("#res3").html(suggestions[2]);

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
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
