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
                                                '<button id="" class="hvr-shadow result waves-effect white" >' + problem["title"]
                                                +
                                                " ( " + problem["tags"] + " ) "
                                                +
                                                '</button>'
                                                +
                                                // divide the contets of this into two, one for gitlapses solutions and one for problem statment
                                                '<div>'
                                                +
                                                '<div class="grid-stack">'
                                                +
                                                '<div class="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-width="12" data-gs-height="8" data-gs-locked="true" data-gs-no-resize="true" data-gs-no-move="true" >'
                                                +
                                                '<div class="grid-stack-item-content">'
                                                +
                                                problem["tags"]
                                                +
                                                '</div>' // grid-stack-item-content
                                                +
                                                '</div>' // grid-stack-item
                                                +
                                                
                                                '<div class="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-width="12" data-gs-height="8" data-gs-locked="true" data-gs-no-resize="true" data-gs-no-move="true" >'
                                                +
                                                '<div class="grid-stack-item-content">'
                                                +
                                                problem["output"]
                                                +
                                                '</div>' // grid-stack-item-content
                                                +
                                                '</div>' // grid-stack-item

                                                +
                                                '<div class="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-width="12" data-gs-height="8" data-gs-locked="true" data-gs-no-resize="true" data-gs-no-move="true" >'
                                                +
                                                '<div class="grid-stack-item-content">'
                                                +
                                                problem["input"]
                                                +
                                                '</div>' // grid-stack-item-content
                                                +
                                                '</div>' // grid-stack-item
                                                +

                                                '<div class="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-width="12" data-gs-height="8" data-gs-locked="true" data-gs-no-resize="true" data-gs-no-move="true" >'
                                                +
                                                '<div class="grid-stack-item-content">'
                                                +
                                                problem["statment"]
                                                +
                                                '</div>' // grid-stack-item-content
                                                +
                                                '</div>' // grid-stack-item
                                                +
                                                // here end of gridser div
                                                '</div>'
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

                    // the gridstack 
/*
                    var serialization = [
                        {x: 0, y: 0, width: 2, height: 2},
                        {x: 3, y: 1, width: 1, height: 2},
                        {x: 4, y: 1, width: 1, height: 1},
                        {x: 2, y: 3, width: 3, height: 1},
                        {x: 1, y: 4, width: 1, height: 1},
                        {x: 1, y: 3, width: 1, height: 1},
                        {x: 2, y: 4, width: 1, height: 1},
                        {x: 2, y: 5, width: 1, height: 1}
                    ];

                    serialization = GridStackUI.Utils.sort(serialization);

                    var grid = $('.grid-stack').data('gridstack');
                    grid.removeAll();

                    _.each(serialization, function (node) {
                        grid.addWidget($('<div><div class="grid-stack-item-content" /></div>'),
                                       node.x, node.y, node.width, node.height);
                    });
*/
                    $(function () {
                        var options = {
                            cellHeight: 20,
                            verticalMargin: 5 // 10
                        };

                        $('.grid-stack').gridstack(options);
                    });
                    
                    // End of the gridstack 
                });



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


});

// HACKS here
