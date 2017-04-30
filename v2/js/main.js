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


    $('.demo-code-language').selectize({
        sortField: 'text',
        hideSelected: false,
        plugins: {
            'dropdown_header': {
                title: 'Language'
            }
        }
    })


$("#search").selectize({
    options: [
        {id: 'avenger', make: 'dodge', model: 'Avenger'},
        {id: 'caliber', make: 'dodge', model: 'Caliber'},
        {id: 'caravan-grand-passenger', make: 'dodge', model: 'Caravan Grand Passenger'},
        {id: 'challenger', make: 'dodge', model: 'Challenger'},
        {id: 'ram-1500', make: 'dodge', model: 'Ram 1500'},
        {id: 'viper', make: 'dodge', model: 'Viper'},
        {id: 'a3', make: 'audi', model: 'A3'},
        {id: 'a6', make: 'audi', model: 'A6'},
        {id: 'r8', make: 'audi', model: 'R8'},
        {id: 'rs-4', make: 'audi', model: 'RS 4'},
        {id: 's4', make: 'audi', model: 'S4'},
        {id: 's8', make: 'audi', model: 'S8'},
        {id: 'tt', make: 'audi', model: 'TT'},
        {id: 'avalanche', make: 'chevrolet', model: 'Avalanche'},
        {id: 'aveo', make: 'chevrolet', model: 'Aveo'},
        {id: 'cobalt', make: 'chevrolet', model: 'Cobalt'},
        {id: 'silverado', make: 'chevrolet', model: 'Silverado'},
        {id: 'suburban', make: 'chevrolet', model: 'Suburban'},
        {id: 'tahoe', make: 'chevrolet', model: 'Tahoe'},
        {id: 'trail-blazer', make: 'chevrolet', model: 'TrailBlazer'},
        {id: 'Ca', make: 'languageA', model: 'C'},
        {id: 'Rubya', make: 'languageA', model: 'Ruby'},
        {id: 'Javaa', make: 'languageA', model: 'Java'},
        {id: 'Pythona', make: 'languageA', model: 'Python'},
        {id: 'Cb', make: 'languageB', model: 'C'},
        {id: 'Rubyb', make: 'languageB', model: 'Ruby'},
        {id: 'Javab', make: 'languageB', model: 'Java'},
        {id: 'Pythonb', make: 'languageB', model: 'Python'},
        {id: 'Cc', make: 'languageC', model: 'C'},
        {id: 'Rubyc', make: 'languageC', model: 'Ruby'},
        {id: 'Javac', make: 'languageC', model: 'Java'},
        {id: 'Pythonc', make: 'languageC', model: 'Python'},


    ],
    optgroups: [
        {$order: 6, id: 'languageC', name: 'language'},
        {$order: 5, id: 'languageB', name: 'language'},
        {$order: 4, id: 'languageA', name: 'language'},
        {$order: 3, id: 'dodge', name: 'Dodge'},
        {$order: 2, id: 'audi', name: 'Audi'},
        {$order: 1, id: 'chevrolet', name: 'Chevrolet'}
    ],
    labelField: 'model',
    valueField: 'id',
    optgroupField: 'make',
    optgroupLabelField: 'name',
    optgroupValueField: 'id',
    lockOptgroupOrder: true,
    searchField: ['model'],
    plugins: ['optgroup_columns'],
    openOnFocus: true
});
    
    // <select id="select-repo"></select>
    $('#select-repo').selectize({
        valueField: 'url',
        labelField: 'name',
        searchField: 'name',
        options: [],
        create: false,
        render: {
            option: function(item, escape) {
                return '<div>' +
                    '<span class="title">' +
                    '<span class="name"><i class="icon ' + (item.fork ? 'fork' : 'source') + '"></i>' + escape(item.name) + '</span>' +
                    '<span class="by">' + escape(item.username) + '</span>' +
                    '</span>' +
                    '<span class="description">' + escape(item.description) + '</span>' +
                    '<ul class="meta">' +
                    (item.language ? '<li class="language">' + escape(item.language) + '</li>' : '') +
                    '<li class="watchers"><span>' + escape(item.watchers) + '</span> watchers</li>' +
                    '<li class="forks"><span>' + escape(item.forks) + '</span> forks</li>' +
                    '</ul>' +
                    '</div>';
            }
        },
        score: function(search) {
            var score = this.getScoreFunction(search);
            return function(item) {
                return score(item) * (1 + Math.min(item.watchers / 100, 1));
            };
        },
        load: function(query, callback) {
            if (!query.length) return callback();
            $.ajax({
                url: 'https://api.github.com/legacy/repos/search/' + encodeURIComponent(query),
                type: 'GET',
                error: function() {
                    callback();
                },
                success: function(res) {
                    callback(res.repositories.slice(0, 10));
                }
            });
        }
    });
    /*
      $('.scroll').jscroll({
      loadingHtml: '<img src="loading.gif" alt="Loading" /> Loading...',
      padding: 20,
      nextSelector: 'a.jscroll-next:last',
      contentSelector: 'li',
      autoTriggerUntil: 3,
      autoTrigger: true
      });
    */
    //$("#search_results").trigger('autoresize').focus();
    params="year=2017&round=qr&level=a&language=c&page=7"
    gcj_api("solutions", params);
});
// HACKS here
