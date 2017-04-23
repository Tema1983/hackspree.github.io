//TODO need to show status if online or offile, and when connected online do an automatic search of the failed one
console.log('%c | -------------------------------- |', 'background: white; color: green; display: block;');
console.log('%c | -------------------------------- |', 'background: white; color: green; display: block;');
console.log('%c | ---------   hackspree   -------- |', 'background: white; color: green; display: block;');
console.log('%c | -------------------------------- |', 'background: white; color: green; display: block;');
console.log('%c | -------------------------------- |', 'background: white; color: green; display: block;');


$(document).ready(function () {
    // to render html select tag
    $('select').material_select();

    console.log('logging: ');

    // problems API
    function gcj_api(endpoint, params){
        console.log("sending GET request with params: " + params);
        $.ajax({


            // url: "https://hackspree.com/gcj/problems",
            // url: "https://hackspree.com/gcj/solutions",
            url: "http://0.0.0.0:9393/gcj/" + endpoint ,

            data: params,
            dataType: 'json',
            success: function (data) {
                // Show Query Stats
                //$('#queryStats').empty().append("showing best <b>" + data.tpbbot.results_count + "</b> matching results for <b>" + data.query + "</b> in " + data.tpbbot.search_time + " secs");
                // data = JSON.parse(data);
                console.log(data);
                // console.log(data.query);

                var ajax_solutions = data.solutions;

                $('#solutions').empty();

                $.each (ajax_solutions, function(index) {
                    //problem = (solution[id]);
                    //console.log (Object.prototype.toString.call(problem));
                    //console.log (problem["title"]);
                    console.log("id:" + ajax_solutions[index].id);
                    console.log("author: " + ajax_solutions[index].author);

                    postscribe('#solutions',
                               '<script src="https://gist.github.com/anonymous/' + ajax_solutions[index].gist_id + '.js"></script>' +
                               //ajax_solutions[index].author +
                               "<br />" +
                               "watch on youtube modal(gitlapse)" +
                               "<br />" +
                               "hackspree ad"
                              );
                });
            },
        });
    };

    $('.scroll').jscroll({
        loadingHtml: '<img src="loading.gif" alt="Loading" /> Loading...',
        padding: 20,
        nextSelector: 'a.jscroll-next:last',
        contentSelector: 'li',
        autoTriggerUntil: 3,
        autoTrigger: true
    });

   
    //$("#search_results").trigger('autoresize').focus();

    params="year=2017&round=qr&level=a&language=c&page=7"
    //gcj_api("solutions", params);
    
});

// HACKS here
