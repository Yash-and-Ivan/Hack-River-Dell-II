function analyzeAndDisplay() {
  displayResults(testResults);

}

function displayResults(analyzed) {
  //first show what we are analyzing
  $("#searchQuery").replaceWith(analyzed.query);


  //sentiment chart
  var sentimentChart = document.getElementById("sentimentChart").getContext('2d');
  var sentChart = new Chart(sentimentChart, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Negative',
        data: generateScatterData(analyzed, -1),
        pointRadius: 40,
        pointBackgroundColor: "rgba(255, 0, 0, 0.1)",
        pointBorderColor: "rgba(255, 0, 0, 0.1)",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        backgroundBorderColor: "rgba(255, 0, 0, 1)"
      }, {
        label: 'Neutral',
        data: generateScatterData(analyzed, 0),
        pointRadius: 40,
        pointBackgroundColor: "rgba(100, 100, 100, 0.1)",
        pointBorderColor: "rgba(100, 100, 0, 0.1)",
        backgroundColor: "rgba(100, 100, 0, 0.5)"
      }, {
        label: 'Positive',
        data: generateScatterData(analyzed, 1),
        pointRadius: 40,
        pointBackgroundColor: "rgba(0, 255, 0, 0.1)",
        pointBorderColor: "rgba(0, 255, 0, 0.1)",
        backgroundColor: "rgba(0, 255, 0, 0.5)"
      }]
    },
    options: {
      pointStyle: "circle",
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom'
        }],
        yAxes: [{
          display: false
        }]
      }
    }
  });

  //emotion chart
  var emotionChart = document.getElementById("emotionChart").getContext('2d');
  var emChar = new Chart(emotionChart, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: generateEmotionData(analyzed),
        backgroundColor: ["rgba(200, 200, 0, 1)",
          "rgba(0, 0, 150, 1)",
          "rgba(150, 50, 50, 1)",
          "rgba(0, 150, 0, 1)",
          "rgba(100, 200, 200, 1)"
        ]
      }],
      labels: [
        'Happiness',
        'Sadness',
        'Anger',
        'Disgust',
        'Fear'
      ]
    },
    options: {
      tooltips: {
        enabled: false
      }
    }
  });

  //creating word clouds
  $("#my_favorite_latin_words").jQCloud(wordFreq((testResults.usedHashtags).join(" ")), {
    shape: "rectangular",
    autoResize: true
  });
}

function wordFreq(string) {
  var words = string.replace(/[.]/g, '').split(/\s/);
  var freqMap = {};
  words.forEach(function(w) {
    if (!freqMap[w]) {
      freqMap[w] = 0;
    }
    freqMap[w] += 1;
  });

  out = [];
  console.log
  for (var key in freqMap) {
    temp = {};
    temp.text = key;
    temp.weight = freqMap[key];
    out.push(temp);
  }
  return out;
}

function generateEmotionData(dataIn) {
  function getSum(total, num) {
    return total + num;
  }
  out = [dataIn.joyArr.reduce(getSum), dataIn.sadnessArr.reduce(getSum),
    dataIn.joyArr.reduce(getSum), dataIn.disgustArr.reduce(getSum),
    dataIn.fearArr.reduce(getSum)
  ];
  return out;
}

function generateScatterData(dataIn, which) {
  out = [];
  scatterData = dataIn.sentimentArr;
  for (var i = 0; i < scatterData.length; i++) {
    tempJson = {};
    if (scatterData[i] != null) {
      if (which == -1 && scatterData[i] < 0) {
        tempJson.y = 0;
        tempJson.x = scatterData[i];
        out.push(tempJson);
      }
      if (which == 0) {
        tempJson.y = 0;
        tempJson.x = scatterData[i];
        out.push(tempJson);
      }
      if (which == 1 && scatterData[i] > 0) {
        tempJson.y = 0;
        tempJson.x = scatterData[i];
        out.push(tempJson);
      }
    }
  }
  return out;
}
