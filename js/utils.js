function parse_query(partial_url) {
    //convert to kvp (via http://stackoverflow.com/a/2880929)
    var params = {};
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };

    var query = partial_url !== undefined ? partial_url : window.location.search.substring(1) 
        
    while (match = search.exec(query))
       params[decode(match[1])] = decode(match[2]);

    return params;
}

function redirect(event) {
    //redirect to the dataset/collection description page (or any other page with this data tag)
    var url = this.getAttribute('data-ref');
    window.location.href=url;
}