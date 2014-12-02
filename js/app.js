
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

})();