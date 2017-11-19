<html>

<head>
  <title> Search Results </title>

  <!--libraries and fonts-->
  <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css">
  <link href="/vendor/skeleton/normalize.css" rel="stylesheet" type="text/css" />
  <link href="/vendor/skeleton/skeleton.css" rel="stylesheet" type="text/css" />
  <link href="/vendor/font-awesome/font-awesome.css" rel="stylesheet" type="text/css" />

  <!--other stylesheets -->
  <link href="/css/main.css" rel="stylesheet" type="text/css" />
  <link href="//cdnjs.cloudflare.com/ajax/libs/jqcloud/1.0.4/jqcloud.css" rel="stylesheet" type="text/css" />
</head>

<body onload="analyzeAndDisplay();" style="overflow: auto">
  <div id = "loadingCover">
    <br>
  </div>
  <img id = "loadingImg" src = "/img/loading_icon.png"> </img>
  <div id = "loadingText">
    <h3> Loading... </h3>
    <p> (refresh page if this takes more than a minute) </p>
  </div>
  <script>var searchQue = unescape(<?php echo "'".$_GET["searchQuery"]."'"?>);</script>
  <div class="container">
    <div class="results-title">
      <h1> Results for: <span class = "searchQuery"> </span> </h1>
      <h3> Search reliability:
        <span id="sr3" style="color:green"></span>
        <span id="sr2" style="color:orange"></span>
        <span id="sr1" style="color:red"></span>
      </h3>
    </div>

    <!-- sentiment card -->
    <div class="result-card">
      <h3 class="card-title"> Sentiment </h3>
      <hr>
      <div class="row">
        <div class="one columns"><br></div>
        <div class="ten columns">
          <canvas id="sentimentChart" width="100%" height="20"></canvas>
        </div>
        <div class="one column"><br></div>
      </div>
      <br>
      <div class="row">
        <div class="one columns"><br></div>
        <div class="ten columns">
          <p>
            The average sentiment is <code id="avgSent"></code>. This suggests a common <code class="sentCon"></code> connotation with the term association with the search. The standard deviation is <code id="stdDevi"></code>, suggesting that the results
            are <code id="checkAbnormal"></code> variable.
          </p>
        </div>
        <div class="one column"><br></div>
        <br>
      </div>
      <br>
    </div>
    <div>
      </br>
    </div>
    <div class="result-card">
      <h3 class="card-title"> Emotion </h3>
      <hr>
      <canvas id="emotionChart" width="100%" height="30%"></canvas>
      <br>
      <div class="row">
        <div class="one columns"><br></div>
        <div class="ten columns">
          <p>
            The search query <code class = "searchQuery"> </code> yields most commonly emotional response of <code id = "emStrong"> </code>. The emotion <code id = "emWeak"> </code> is found the least frequently based on data collected from the time of the search. The emotional analysis leads to the conclusion that the hashtag is most commonly associated with a <code class="sentCon"></code> connotation.
          </p>
        </div>
        <div class="one column"><br></div>
        <br>
      </div>
      <br>
    </div>
    <div>
      </br>
    </div>
    <div class="result-card">
      <div class="row">
        <h3 class="card-title"> Word, Hashtag, and Mention Frequency Analysis </h3>
      </div>
      <hr>
      <div class="row">
        <div class="four columns"><br></div>
        <div class="seven columns">
          <div id="hashCloud" style="width: 100%; height: 350px; border: 1px solid #ccc;"></div>
        </div>
        <div class="one column"><br></div>
      </div>
      <br> <br>
      <div class="row">
        <div class="one columns"><br></div>
        <div class="seven columns">
          <div id="wordCloud" style="width: 550px; height: 350px; border: 1px solid #ccc;"></div>
        </div>
        <div class="four column"><br></div>
      </div>
      <br> <br>
      <div class="row">
        <div class="four columns"><br></div>
        <div class="seven columns">
          <div id="mentionCloud" style="width: 550px; height: 350px; border: 1px solid #ccc;"></div>
        </div>
        <div class="one column"><br></div>
      </div>
      <br> <br>
    </div>
    <br><br><br>
    <div class="row">
      <div class="four columns"><br></div>
      <div class="four columns">
        <button class = "u-full-width" onClick = "window.location = 'index.html';"  style = "text-align:center"> Back </button>
      </div>
      <div class="four columns"><br></div>
    </div>
    <br><br><br>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.bundle.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jqcloud/1.0.4/jqcloud-1.0.4.min.js"></script>
  <script src="/js/testResults.js"></script>
  <script src="/js/analyze.js"></script>

</body>

</html>
