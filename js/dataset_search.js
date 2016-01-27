function DatasetSearch(base_url, limit, offset) {
    this.base_url = base_url;
    this.limit = limit;
    this.offset = offset;
    this.version = 3;
    this.sort_field = 'lastupdate';
    this.sort_order = 'desc';

    this.theme = '';
    this.subtheme = '';
    this.groupname = '';
    this.keywords = '';

    this.start_time = '';
    this.end_time = '';
}
DatasetSearch.prototype.build_url = function () {
    query_params = [];
    if (this.limit !== 0) {
        query_params.push('limit=' + this.limit);
    }
    if (this.offset !== 0) {
        query_params.push('offset=' + this.offset);
    }
    if (this.version !== 0) {
        query_params.push('version=' + this.version);
    }
    if (this.sort_field !== '') {
        query_params.push('sort=' + this.sort_field);
    }
    if (this.sort_order !== '') {
        query_params.push('dir=' + this.sort_order);
    }

    if (this.theme !== '' && this.theme !== undefined) {
        query_params.push('theme=' + this.theme.replace(/ /g, '+'));
    }

    if (this.subtheme !== '' && this.subtheme !== undefined) {
        query_params.push('subtheme=' + this.subtheme.replace(/ /g, '+'));
    }

    if (this.groupname !== '' && this.groupname !== undefined) {
        query_params.push('groupname=' + this.groupname.replace(/ /g, '+'));
    }

    if (this.keywords !== '' && this.keywords !== undefined) {
        query_params.push('query=' + this.keywords.replace(/ /g, '+'));
    }

    ///to yyyyMMdd from mm/dd/yyyy
    if (this.start_time !== '' && this.start_time !== undefined) {
        var parts = this.start_time.split('/');
        query_params.push('start_time=' + ([parts[2], parts[0], parts[1]]).join(''));
    }  
    if (this.end_time!== '' && this.end_time !== undefined) {
        var parts = this.end_time.split('/');
        query_params.push('end_time=' + ([parts[2], parts[0], parts[1]]).join(''));
    } 

    return this.base_url + '?' + query_params.join('&');
};
DatasetSearch.prototype.to_facets = function() {
    params = [];
    var cats, cat_id;
    //to keep the panels and the selected facets in sync
    if ((this.theme !== '' && this.theme !== undefined) && 
        (this.subtheme == '' || this.subtheme === undefined)) {
            cats = this.theme;
            cat_id = this.theme;
    }

    if ((this.theme !== '' && this.theme !== undefined) && 
        (this.subtheme !== '' && this.subtheme !== undefined) && 
        (this.groupname == '' || this.groupname === undefined)) {
            cats = [this.theme, this.subtheme].join(' / ');
            cat_id = this.subtheme;
    }

    if ((this.theme !== '' && this.theme !== undefined) && 
        (this.subtheme !== '' && this.subtheme !== undefined) && 
        (this.groupname !== '' && this.groupname !== undefined)) {
            cats = [this.theme, this.subtheme, this.groupname].join(' / ');
            cat_id = this.groupname;
    }

    if (cats !== undefined && cats !== '') {
        params.push({'category': {'text': cats, 'id': cat_id}});
    }

    if (this.keywords !== '' && this.keywords !== undefined) {
        params.push({'keywords': {'text':this.keywords, 'id': 'keyword-input'}});
    }

    if (this.start_time !== '' && this.start_time !== undefined) {
        params.push({'start_time': {'text': this.start_time, 'id': 'startdate-input'}});
    }
    if (this.end_time !== '' && this.end_time !== undefined) {
        params.push({'end_time': {'text': this.end_time, 'id': 'enddate-input'}});
    }

    return {'params': params};
};
DatasetSearch.prototype.to_query = function(query_string) {
    //convert the query string from build_url to a kvp
    return parse_query(query_string);
};