//TODO need to show status if online or offile, and when connected online do an automatic search of the failed one
console.log('%c | -------------------------------- |', 'background: white; color: green; display: block;');
console.log('%c | -------------------------------- |', 'background: white; color: green; display: block;');
console.log('%c | ---------   hackspree   -------- |', 'background: white; color: green; display: block;');
console.log('%c | -------------------------------- |', 'background: white; color: green; display: block;');
console.log('%c | -------------------------------- |', 'background: white; color: green; display: block;');

//TODO use history.js https://github.com/browserstate/history.js/find/master
$(document).ready(function () {
    
    // to render html select tag
    $('select').material_select();

    console.log('logging: ');

    function search(query){
        console.log('search: ' + query);

        //window.history.pushState("string", "Title", "/newUrl");
    };
    search("love is all around"); 

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
                    console.log("id:" + ajax_solutions[index].id);
                    console.log("author: " + ajax_solutions[index].author);

                    $("#solutions").append("<div id='hackspree"+ajax_solutions[index].id+"'>"+ ajax_solutions[index].id + "</div>"
                                          );
                    //console.log (Object.prototype.toString.call(problem));
                    //console.log (problem["title"]);
                    postscribe('#hackspree'+ajax_solutions[index].id,
                               '<script src="https://gist.github.com/anonymous/' + ajax_solutions[index].gist_id + '.js"></script>' +
                               //ajax_solutions[index].author +
                               "<br />" +
                               "watch on youtube modal(gitlapse)" +
                               "<br />" 
                              );
                    //*/
                });
                // Using slick now (after data arrival)
                $('.solutionslider').slick({
                    //variableWidth: true,
                    //variableWidth: true
                    // width: 270px
                    lazyLoad: 'ondemand',
                    dots: false,
                    infinite: true,
                    speed: 400,
                    slidesToShow: 1,
                    appendArrows: $('.upper_navigation'),
                    appendDots: $('.lower_navigation'),
                    prevArrow: "<i class='medium material-icons' style='cursor: pointer'>skip_previous </i>",
                    nextArrow: "<i class='medium material-icons' style='cursor: pointer'>skip_next </i>",
                    adaptiveHeight: true
                });
            },
        });
    };
    // docs: https://github.com/selectize/selectize.js/blob/master/docs/usage.md

    var problems;
    $('#search').selectize({
        //valueField: ['contest_id','id'],
        //x = 'id'+'_'+'contest_id';
        //valueField: x,
        valueField: 'id',
        labelField: 'name',
        searchField: ['name'],
        options: [],
        create: false,
        focus: true,
        closeAfterSelect: true,
        // The max number of items to render at once in the dropdown list of options.	
        maxOptions: 10,
        maxItems: 1,
        selectOnTab: true,
        render: {
            //name, site, tournament
            option: function(item, escape) {
                console.log('item is ......');
                console.log(item.name);
                return '<div>' +
                    ' <img src="img/' + item.site +'.png" alt="site" style="width:30px;height:20px;">' +
                    ' <span class="name">' +
                    escape(item.name) +
                    ' </span>' +
                    ' - ' +
                    ' <span class="contest">' +
                    escape(item.contest_name) +
                    ' </span>' +
                    ' - ' +
                    ' <span class="tournament">' +
                    escape(item.tournament_name) +
                    ' </span>' +
                    '</div>';
            }
        },
        onLoad: function(){
            console.log("its onload");
        },
        onType: function(){
            console.log("its ontype");
        },
        load: function(query, callback) {
            if (!query.length) return callback();
            $.ajax({
                //url: 'https://api.github.com/legacy/repos/search/' + encodeURIComponent(query),
                url: 'http://127.0.0.1:9393/search?query=' + encodeURIComponent(query),
                type: 'GET',
                error: function() {
                    callback();
                },
                success: function(res) {
                    //res = JSON.stringify((res));
                    res = JSON.parse(res);
                    problems = res.problems;
                    console.log(res.problems);
                    //var selected = selectizeControl.getItem(selectizeControl.getValue()).text()‌​;
                    //var selected = $('#search').selectize()[0].selectize.getValue();
                    //callback(res.problems.slice(0, 10));
                    callback(res.problems);
                }
            });
        },
        onChange: function(value) {
            console.log("selected:::::: " + value);
            //params="year=2017&round=qr&level=a&language=c&page=7"
            //selected  = $selected.val();//.selectize;
            //selected  = $selected.valueField;//.selectize;
            //console.log(problems);
            //for loop over each object in the selected till one of them id matches the value given then populate the params with the problem.id and contest_id 

            for (var i = 0; i < problems.length; i++) {
                if(problems[i].id == value){
                    console.log(problems[i]);
                    params="problem_id="+problems[i].id+"&contest_id="+problems[i].contest_id;
                    gcj_api("solutions", params);
                }
                //Do something
            }
        }
    });

    $("i").css( 'cursor', 'pointer' );

    $("#solution_toggle").click(function() {
        $("#lapse").toggle();
        $("#code").toggle();
        //$("classforgist").toggle();
        //$("classforlapse").toggle(); // make lapse by default hidden to toggle correctly
    });


    $('.tooltip').tooltipster({
        theme: 'tooltipster-light',
        position: 'relative'
    });

    
});
//$("#solutions").redraw();
// HACKS here
