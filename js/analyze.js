function analyzeAndDisplay() {
  $.post("/php/analyse.php", {
    query: searchQue
  }, function(result) {
    displayResults(JSON.parse(result));
    $("#loadingCover").remove();
    $("#loadingImg").remove();
    $("#loadingText").remove();
  })
}

function displayResults(analyzed) {
  //first show what we are analyzing and calculate reliability
  $(".searchQuery").html(analyzed.query);


  if (analyzed.tweetText.length <= 20) {
    $("#sr1").html("Poor");
  } else if (analyzed.tweetText.length <= 50) {
    $("#sr2").html("Medium");
  } else {
    $("#sr3").html("Good");
  };
  //paste sentiment stuff
  sentAvg = Math.floor(getAvg(analyzed.sentimentArr) * 100) / 100;
  $("#avgSent").html(sentAvg);
  if (sentAvg < 0) {
    $(".sentCon").html("negative");
  } else {
    $(".sentCon").html("positive");
  }
  stdDev = Math.floor(analyzed.sentimentArr.standartDeviation() * 100) / 100;
  $("#stdDevi").html(stdDev);

  if (stdDev > 0.66) {
    $('#checkAbnormal').html("highly");
  } else {
    $('#checkAbnormal').html("not particularly");
  }
  emotionData = generateEmotionData(analyzed);
  emotionNames = ['Happiness', 'Sadness', 'Anger', 'Disgust', 'Fear'];

  //find largest and smallest emotion index
  largestEmIndex = emotionData.indexOf(Math.max(...emotionData));
  $("#emStrong").html(emotionNames[largestEmIndex]);
  smallestEmIndex = emotionData.indexOf(Math.min(...emotionData));
  $("#emWeak").html(emotionNames[smallestEmIndex]);
  //sentiment chart
  var sentimentChart = document.getElementById("sentimentChart").getContext('2d');
  var sentChart = new Chart(sentimentChart, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Negative',
        data: generateScatterData(analyzed, -1),
        pointRadius: 40,
        pointBackgroundColor: "rgba(255, 0, 0, 0.05)",
        pointBorderColor: "rgba(255, 0, 0, 0.05)",
        backgroundColor: "rgba(255, 0, 0, 0.5)"
      }, {
        label: 'Neutral',
        data: generateScatterData(analyzed, 0),
        pointRadius: 40,
        pointBackgroundColor: "rgba(100, 100, 100, 0.05)",
        pointBorderColor: "rgba(100, 100, 0, 0.05)",
        backgroundColor: "rgba(100, 100, 0, 0.5)"
      }, {
        label: 'Positive',
        data: generateScatterData(analyzed, 1),
        pointRadius: 40,
        pointBackgroundColor: "rgba(0, 255, 0, 0.05)",
        pointBorderColor: "rgba(0, 255, 0, 0.05)",
        backgroundColor: "rgba(0, 255, 0, 0.5)"
      }]
    },
    options: {
      pointStyle: "circle",
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          ticks: {
            min: -1.1,
            max: 1.1
          }
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

  //creating word clouds, but we have to clean everything up first
  hashtagData = (analyzed.usedHashtags).join(" ");
  hashtagData = hashtagData.toLowerCase();
  textData = (analyzed.tweetText).join(" ");
  textData = textData.toLowerCase();
  textData = textData.replaceAll("-", "");
  textData = textData.replaceAll("?", "");
  textData = textData.replaceAll(".", "");
  textData = textData.replaceAll("!", "");
  textData = textData.replaceAll(",", "");
  textData = textData.replaceAll("#", "");
  textData = textData.replaceAll('"', "");
  textData = textData.replaceAll("'", "");
  textData = textData.replaceAll("#", "");
  textData = textData.replaceAll(")", "");
  textData = textData.replaceAll("(", "");
  textData = textData.replaceAll("[", "");
  textData = textData.replaceAll("]", "");
  textData = textData.replaceAll("{", "");
  textData = textData.replaceAll("}", "");
  textData = textData.replaceAll("+", "");
  textData = textData.replaceAll("-", "");
  textData = textData.replaceAll("&", "");
  mentionData = (analyzed.taggedPeople).join(" ");
  mentionData = mentionData.toLowerCase();
  $("#hashCloud").jQCloud(wordFreq(hashtagData), {
    shape: "spiral",
    autoResize: true
  });
  $("#wordCloud").jQCloud(wordFreq(textData), {
    shape: "spiral",
    autoResize: true
  });
  $("#mentionCloud").jQCloud(wordFreq(mentionData), {
    shape: "spiral",
    autoResize: true
  });
}
//FUNCTIONS
Array.prototype.standartDeviation = function() {
  var i, j, total = 0,
    mean = 0,
    diffSqredArr = [];
  for (i = 0; i < this.length; i += 1) {
    total += this[i];
  }
  mean = total / this.length;
  for (j = 0; j < this.length; j += 1) {
    diffSqredArr.push(Math.pow((this[j] - mean), 2));
  }
  return (Math.sqrt(diffSqredArr.reduce(function(firstEl, nextEl) {
    return firstEl + nextEl;
  }) / this.length));
};

function getAvg(listIn) {
  return listIn.reduce(function(p, c) {
    return p + c;
  }) / listIn.length;
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
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

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
