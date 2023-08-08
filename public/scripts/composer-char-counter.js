$(document).ready(function() {
  // --- our code goes here ---
  console.log("ready!");
  $("#tweet-text").on("input", function() {
    let $words = $(this).val().length;
    const $counter = $('output.counter');
    let $totalWords = 140 - $words;
    $counter.text($totalWords);

    if($words > 140) {
      $counter.addClass("error");
    } else {
      $counter.removeClass("error");
    }
  });

});