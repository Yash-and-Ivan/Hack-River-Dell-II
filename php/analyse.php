<?php
  require '/../vendor/autoload.php';
  use WatsonSDK\Common\HttpClient;
  use WatsonSDK\Common\HttpClientConfiguration;
  use WatsonSDK\Common\HttpClientException;
  use WatsonSDK\Common\SimpleTokenProvider;
  use WatsonSDK\Common\SimpleTokenHelper;
  use WatsonSDK\Common\WatsonCredential;
  use WatsonSDK\Services\NaturalLanguageUnderstanding;
  use WatsonSDK\Services\NaturalLanguageUnderstanding\AnalyzeModel;

  error_reporting(E_ALL ^ E_NOTICE);

  $out = (object) null; //object we return

  $searchParams = "#DonaldTrump";
  $numTweets = 1000;

  //configure settings
  $twitterSettings = array(
    'oauth_access_token' => "894118651678392321-GlBzSvIicHYC4YhFSfqcz9TXjc2TCKw",
    'oauth_access_token_secret' => "JqmYaOvy5iNFPSyLoReruyfGfAFs3TKiH5vWtSctUW3jl",
    'consumer_key' => "2vOVfglh836HG6Yfzc0RnkNze",
    'consumer_secret' => "SJQy5uxJavdwXkK6f0Q4W4BVNh5RWJJuChd12AY9HynSIEjmeb"
  );

  $url = "https://api.twitter.com/1.1/search/tweets.json";
  $twitter = new TwitterAPIExchange($twitterSettings);

  //tweet data
  $commonHashtags = [];
  $taggedPeople = [];

  //knobs
  $maxTweetsPerBatch = 100;

  //batches for tweet analysis
  $tweetBatches = [];

  //get tweets in batches of 100
  $curMaxTweetId = "10000000000000000000000000000000";

  for($i = 0; $i < 1; $i++){
   //get tweets and decode them

   $twitterResults = $twitter->setGetfield("?lang=en&result_type=recent&count=200&q=".$searchParams."&maxId=".$curMaxTweetId)
      ->buildOauth($url, 'GET')
      ->performRequest();
   $twitterResults = json_decode($twitterResults);
   $statuses = $twitterResults->statuses;
   $temp = explode("&",$twitterResults->search_metadata->refresh_url)[0];
   $curMaxTweetId = substr($temp, 10, strlen($temp));
   $tweetIds = array();

   //go through each status in this batch
   foreach($statuses as $status){
     //make sure we're not checking a retweet
     if(!property_exists($status, 'retweeted_status')){
       $removeLinkRegex = "@(https?://([-\w\.]+[-\w])+(:\d+)?(/([\w/_\.#-]*(\?\S+)?[^\.\s])?).*$)@";
       $tweetText = $status->text;
       //remove links from tweets
       $tweetText = preg_replace($removeLinkRegex, " ", $tweetText);
       //remove dots from end of tweets
       $tweetText = str_replace("…", " ", $tweetText);

       //extract hashtags from string
       preg_match_all('/#([^\s]+)/', $tweetText, $matches);
       $commonHashtags = array_merge($matches[0], $commonHashtags);

       //extract username tags of string
       preg_match_all('/@([^\s]+)/', $tweetText, $matches);
       $taggedPeople = array_merge($matches[0], $taggedPeople);

       //remove hashtags and tags from string
       $tweetText = preg_replace('/@([^\s]+)/', " ", $tweetText);

       $tweetBatches[] = $tweetText;
     }
   }
}

//so now we have all our tweets in a list
//attach already figured out properties to the out object
$out->query = $searchParams;
$out->usedHashtags = $commonHashtags;
$out->taggedPeople = $taggedPeople;

$nlu = new NaturalLanguageUnderstanding( WatsonCredential::initWithCredentials('fdedbc34-cb43-4787-9308-4f323f3f9c11', '0ISekPiKsBDX'));
$params = ['emotion' => ['limit' => 10], 'sentiment' => ['limit' => 10]];

//array of all sentiments
$sentiments = array();
$sadness = array();
$joy = array();
$fear = array();
$disgust = array();
$anger = array();

//analyse all tweets for emotion and sentiment
for($i = 0; $i < count($tweetBatches); $i++){
  $curModel = new AnalyzeModel($tweetBatches[$i], $params);
  $result = $nlu->analyze($curModel);
  $result = json_decode($result->getContent());
  $sentiments[] = $result->sentiment->document->score;
  $sadness[] = $result->emotion->document->emotion->sadness;
  $joy[] = $result->emotion->document->emotion->joy;
  $fear[] = $result->emotion->document->emotion->fear;
  $disgust[] = $result->emotion->document->emotion->disgust;
  $anger[] = $result->emotion->document->emotion->anger;
}
//attach more values to object
$out->sentimentArr = $sentiments;
$out->sadnessArr = $sadness;
$out->joyArr = $joy;
$out->fearArr = $fear;
$out->disgustArr = $disgust;
$out->angerArr = $anger;
$out->tweetText = $tweetBatches;
echo json_encode($out);




?>
