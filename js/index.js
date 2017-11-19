function updateWindow(){
  if($.trim($("#toAnalyze").val()) == ""){
    $("#formOut").html("You gotta enter something, man");
    return false;
  }
  window.location = "results.html?searchQuery=" + $.trim($("#toAnalyze").val());
}
