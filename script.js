/*jslint browser: true plusplus: true*/
/*global $, jQuery, alert, console*/

$(document).ready(function () {
        "use strict";
        var tweetQuote;
        var quoteArray = [];
        var authorArray =[]
        var quote = $('#quote');
        var author = $('#author');
        var tweet = $('#tweet');
        var generate = $('#generate');
        var currentQuote = $('.currentQuote');
        var generateButton = $('#generateButton');


        function getQuote(){
            $.ajax({
                jsonp: "jsonp",
                dataType: "jsonp",
                url: 'http://api.forismatic.com/api/1.0/',
                contentType: 'application/jsonp',
                data: {
                    lang: "en",
                    method: "getQuote",
                    format: "jsonp"
                },
                success: function(data){
                    //fade in/out on quote
                    currentQuote.fadeOut(150, function(){
                        quote.text(data.quoteText);

                        //'Unknown' if author is empty
                        if(data.quoteAuthor === ""){
                            author.text('Unknown');
                        } else {
                            author.text('By: ' + data.quoteAuthor);
                        }
                    }).fadeIn(150);

                    quoteHistoryUpdate(data.quoteText + '<b> By: </b> ' + '<b>'+ data.quoteAuthor + '</b>');
                    sendTweet(data.quoteText + ' By: ' + data.quoteAuthor);

                },
                error: function(data){
                    quote.text("Error Loading Quote");
                    author.text("Error Loading Author");
                }
            });
        }

        function quoteHistoryUpdate(data){
            quoteArray.push(data);

            if(quoteArray.length > 5){
                quoteArray.shift();
            }

            $('.quoteHistory p').remove();
            for(var i=0; i< quoteArray.length; i++){
                $('.quoteHistory').prepend('<p>' + quoteArray[i] + '</p>');
            }
        }

    function sendTweet(text){
        tweetQuote = encodeURIComponent(text);
        tweet.attr("href", "https://twitter.com/intent/tweet?text=" + tweetQuote);
    }



    generateButton.click(function () {
            getQuote().fadeIn('slow');
            alert("hi");
        });

});
