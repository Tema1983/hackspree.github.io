// "we can help you ..." ad component
$(function(){
  $("#ads").typed({
    loop: true,
    strings: ["have lots of <b>fun</b> with <b>Ruby</b>!", 
    "have <b>fun</b> practicing <b>domain-driven design</b> with ruby!",
    "have <b>fun</b> practicing <b>microservices</b> with ruby!",
    "have <b>fun</b> practicing <b>nosql databases</b> with ruby!",
    "<b>uplevel</b> your startup team productivity with ruby!"],
    // typing speed
    typeSpeed: 70,
    // time before typing starts
    //startDelay: 100,
    // backspacing speed
    //backSpeed: 0,
    // shuffle the strings
    shuffle: true,
    // time before backspacing
    backDelay: 4000,
    //typeSpeed: 0
    //showCursor: true,
    contentType: 'html'
  });
});



$(document).ready(function(){
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal-trigger').leanModal();
});
