//TODO need to show status if online or offile, and when connected online do an automatic search of the failed one
console.log('%c | -------------------------------- |', 'background: white; color: green; display: block;');
console.log('%c | -------------------------------- |', 'background: white; color: green; display: block;');
console.log('%c | ---------   hackspree   -------- |', 'background: white; color: green; display: block;');
console.log('%c | -------------------------------- |', 'background: white; color: green; display: block;');
console.log('%c | -------------------------------- |', 'background: white; color: green; display: block;');


$(document).ready(function () {
/*
    $( ".accordion" ).accordion({
        active: false,
        collapsible: true,
        //heightStyle: 'content'
        heightStyle: 'panel'
    });

*/
    $( ".tabs" ).tabs({
        event: "mouseover"
    });

    
    //$(".problemmodal").modal({
        // escapeClose: false,
        //clickClose: false,
     //   showClose: false
    //});

    $('.solutions').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.solutions-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        centerMode: true,
        focusOnSelect: true
    });
    


    // noty

    function nodify(type, text) {
        var n = noty({
            text        : text,
            type        : type,
            dismissQueue: true,
            layout      : 'topRight',
            //closeWith: ['click', 'hover'],
            theme       : 'relax',
            maxVisible  : 10,
            timeout: 5000,
            //modal: true,
            animation   : {
                open  : 'animated flipInX',
                close : 'animated flipOutX',
	        speed : 500
            }
        });
        console.log('html: ' + n.options.id);
    }


  // noty ends


  // scroll the results
  $('#results').on('mousewheel', function(event) {
    //console.log(event.deltaX, event.deltaY, event.deltaFactor);
    window.onwheel = function(){ return false; }
    if (event.deltaY === +1) {
      $('#results').slick("slickNext");
    };
    if (event.deltaY === -1) {
      $('#results').slick("slickPrev");
    };
  });

  // copy paste magnet

  var clipboard = new Clipboard('.btn', {
    text: function(trigger) {
      return trigger.getAttribute('id');
    }
  });

  clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    nodify('', "COPIED " + e.text);
    e.clearSelection();
  });

  // copy the magnet
  new Clipboard('.btn');
  // copy paste magnet end

  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal-trigger').leanModal();

  // prevent textbox from being affected by navigation
  //$(document).keydown(function (e) {
  // var element = e.target.nodeName.toLowerCase();
  //if ((element != 'input' && element != 'textarea') || $(e.target).attr("readonly") || (e.target.getAttribute("type") ==="checkbox")) {
  // if (e.keyCode === 8) {
  //	return false;
  //     }
  //   }
  //   // makes search gets focused whenever there is a keydown
  //  $("#search").focus();
    // });

    /*
      $("body").keydown(function(e){
      var element = e.target.nodeName.toLowerCase();
      if ((element != 'input' && element != 'textarea') || $(e.target).attr("readonly") || (e.target.getAttribute("type") ==="checkbox")) {
      $("#search").focus();
      }

      switch(e.which) {
      case 37: // left
      $('#results').slick("slickPrev");
      break;

      case 38: // up
      $('#results').slick("slickNext");
      break;

      case 39: // right
      $('#results').slick("slickNext");
      break;

      case 40: // down
      $('#results').slick("slickPrev");
      break;

      default: return; // exit this handler for other keys
      }

      e.preventDefault(); // prevent the default action (scroll / move caret)
      });
    */

  //$('.carousel.carousel-slider').carousel({full_width: true});

  //TODO this talks to the bots endpoint to get suggestions
  $('.autocomplete').autocomplete({
    data: {
      "Apple": null,
      "Aexaaaple": null,
      "Microsoft": null,
      "Google": 'http://placehold.it/250x250'
    }
  });



  // generic delay function to be used whenever it is needed
  /* delay(function(){
     code here
    }, 1000 );
    */
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();
  // end of delay function
  

    // problems API
    function problems_api(q){
        console.log("sending a query request for: " + q);
        $.ajax({


            url: "http://0.0.0.0:9393/",
            // url: "https://api.upjoy.stream/v1/bots",
            // url: "https://0.0.0.0/v1/bots",
            data: 'query=' + q,
            //data: 'query=' + q + '&bots=all',
            dataType: 'json',
            success: function (data) {
                // Show Query Stats
                //$('#queryStats').empty().append("showing best <b>" + data.tpbbot.results_count + "</b> matching results for <b>" + data.query + "</b> in " + data.tpbbot.search_time + " secs");
                // data = JSON.parse(data);
                console.log(data);
                // console.log(data.query);

                var problems = data.problems;

                $('#results').empty();

                $.each (problems, function (number) {
                    console.log (number);
                    problem = (problems[number]);
                    //console.log (Object.prototype.toString.call(problem));
                    console.log (problem["title"]);
                    // console.log(problem);

                    $('#search_results').append('<div class="accordion">'
                                                + 
                                                '<button id="" class="hvr-shadow result waves-effect waves-green white" >' + problem["title"]
                                                +
                                                " ( " + problem["tags"] + " ) "
                                                +
                                                '</button>'
                                                +
                                                // divide the contets of this into two, one for gitlapses solutions and one for problem statment
                                                '<div>'
                                                +
                                                '<table>'
                                                +
                                                '<tr>'
                                                +
                                                '<th>' + problem["statment"] + '</th>'
                                                +
                                                '<th> <b> Input </b> </br> </br>'
                                                +
                                                problem["input"]
                                                +
                                                '</th>'
                                                +
                                                '</tr>'
                                                +
                                                '<tr>'
                                                +
                                                '<th>'
                                                +
                                                problem["tags"]
                                                +
                                                '</th>'
                                                +
                                                '</tr>'
                                                +
                                                '</table>'
                                                +
                                                '</div>'
                                                + 
                                                '</div>'
                                                + 
                                                '</br>'
                                               );

                    $( ".accordion" ).accordion({
                        collapsible: true,
                        active : false,
                        heightStyle: 'panel'
                    });
                    // $( ".accordion" ).accordion("refresh");

                    //slideIndex++;
                    // $('#results').slick('slickAdd',
                    //                     '<div class="result">' + 
                      //                   '<div class="details">' + 
                        //                 'Name: ' + torrent.name + 
                          //               ' </br> Seeders: ' + torrent.seeders + ' </br> Size:' + torrent.total_size + ' </br> </br>' +
                              //           '</div>' + 
                            //             '<button id="' + torrent.name + '" class="magnet btn waves-effect waves-yellowish white" data-clipboard-text="' +  torrent.magnet_link  + '"> copy magnet </button>' +
                                        //'<a id= "' + number + '"class="show btn waves-effect waves-yellowish white modal-trigger" href="#theater" data-target="#theater">watch</a>'  +
                                //         '</br> </br></div>');
                    //console.log (a[bb].TEST1);
                });



                //$('#results').append('</br>')
                //$('#results').append('</br>')
	        // $('#tpbbot').empty().append("<b>" + data.tpbbot.torrents[0].name + "</b> </br>" );
	        //$('.greeting-content').append(data.content);

	        $('#query_done').get(0).volume=0.1;
	        $('#query_done').get(0).play();
            },
        });
    };

    $("#search_results").trigger('autoresize').focus();

    var timerid;	
    $("#search").on("input",function(e){
        var value = $(this).val();
    if($(this).data("lastval")!= value){
      $(this).data("lastval",value);
      clearTimeout(timerid);
      timerid = setTimeout(function() {
	var q = $("#search").val();
	problems_api(q);
      },1000);
    };
  });

  // end of search functionality

  var slider = $('#results');
  // Slides
  function initSlides(){
    slider.slick({
      arrows: false,
      dots: true,
      speed: 300,
      fade: false,
      lazyLoad: 'ondemand',

      // it fucksup the modal calls as it returns undefined between cycle-end\cycle-start(just don't use it)
      centerMode: false,
      infinite: false, 

      slidesToShow: 3,
      slidesToScroll: 3,

      autoplay: true,
      //autoplay: false,
      autoplaySpeed: 8000,
      pauseOnHover: true,

      accessibility: true,
      cssEase: 'linear',

      swipe: true,
      swipeToSlide: true,
      touchMove:true

    });
  };

  // Initiate the slides
  initSlides();


  // On before slide change
  $('#results').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    // can be used as torrents[nextSlide] to get the choice of the result and send it to WATCH 
    console.log(nextSlide);
  });


});

// HACKS here
