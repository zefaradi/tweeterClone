/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  // --- our code goes here ---

  $(".tweet-container").empty();
  const $container = $(".tweet-container");

  const createTweetElement = function(data) {
    let $tweet = $(`
    <article id="old-tweet-text" >
    <div class="tweet-header">
      <div class="tweeter-image-name">
        <div>
          <img src="${data.user.avatars}">
        </div>
        <div class="user-name">
          ${data.user.name}
        </div>
      </div>
      <div class="tweet-handle">
      ${data.user.handle}
      </div>
    </div>
    <div class="tweet-body">${escape(data.content.text)}</div>
    <div class="tweet-footer">
      <div class="time-stamp">
      ${timeago.format(data.created_at)}
      </div>
      <div class="symbols">
        <div class="flag">
          <i class="fa-solid fa-flag"></i>
        </div>
        <div class="re-tweet">
          <i class="fa-solid fa-retweet"></i>
        </div>
        <div class="heart">
          <i class="fa-solid fa-heart"></i>
        </div>
      </div>
    </div>
    </article>`);

    return $tweet;
  };

  //Prevent XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      const $tweetToRender = createTweetElement(tweet);
      $container.prepend($tweetToRender);
    }
    
  };

  $(".short-error").hide();
  $(".long-error").hide();
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    const tweetLength = $("#tweet-text").val().length;

    if (tweetLength === 0 || null) {
      $(".long-error").hide();
      $(".short-error").slideDown("slow");
    } else if (tweetLength > 140) {
      $(".short-error").hide();
      $(".long-error").slideDown("slow");
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data,
      }).then(function() {
        $(".long-error").hide();
        $(".short-error").hide();
        $(".counter").text("140");
        $(".tweet-container").empty();
        loadTweets();
        $("#tweet-text").val("");
      });
    }
  });

  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: "json",
    })
      .then((data) => {
        renderTweets(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  loadTweets();
  
});

