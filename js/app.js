
$(function() {

    $('#search-results').on('submit', function(event) {
        var term = $('#query').val();
        event.preventDefault();

        handleRequest(term);
    });

    function handleRequest(searchTerm) {
        url = 'http://api.stackexchange.com/2.2/tags/'+searchTerm+'/top-answerers/all_time';
        params = {
            page: 1,
            pagesize: 20,
            site: 'stackoverflow'
        }

        $.getJSON(url, params, function(data) {
            showResults(data.items);
        });
    }

    function showResults(results) {

        for (var i=0; i<results.length; i++) {
            var img = results[i].user.profile_image,
                name = results[i].user.display_name,
                link = results[i].user.link,
                score = results[i].score,
                numPosts = results[i].post_count;

            var template = intoTemplate(img,name,link);
            $('#results .container').append(template);
        }

        function intoTemplate(img,name,link) {
            var templ = '';
            templ+="<li class='user'>"
            templ+="<div class='left-meta'>"
            templ+="<img src='"+img+"'>"
            templ+="</div>"
            templ+="<div class='right-meta'>"
            templ+="<div class='name'>"
            templ+="<h3><a href='"+link+"'>"+name+"</a></h3>"
            templ+="</div>"
            templ+="<div class='stats'>"
            templ+="<p>post count: <span class='post-count'>"+numPosts+"</span></p>"
            templ+="<p>score: <span class='score'>"+score+"</span></p>"
            templ+="</div>"
            templ+="</div>"
            templ+="</li>"
            return templ;
        }

    }

})();