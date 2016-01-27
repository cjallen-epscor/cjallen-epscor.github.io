function CategorySearch(base_url, element_id) {
    this.base_url = base_url;
    this.version = 3;
    this.theme = '';
    this.subtheme = '';
    this.groupname = '';

    this.element_id = element_id;
}
CategorySearch.prototype.build_url = function() {
    //?node=theme__|__subtheme__|__groupname
    var parts = [];
    if (this.theme !== '') {
        parts.push(this.theme.replace(/ /g, '+'));
    }
    if (this.theme !== '' && this.subtheme !== '') {
        parts.push(this.subtheme.replace(/ /g, '+'));
    }
    if (this.theme !== '' && this.subtheme !== '' && this.groupname !== '') {
        parts.push(this.groupname.replace(/ /g, '+'));
    }

    return this.base_url + '?version='+this.version+'&node=' + parts.join('__|__');
}
CategorySearch.prototype.update_options = function(theme, subtheme, groupname) {
    this.theme = (theme !== undefined) ? theme : '';
    this.subtheme = (subtheme !== undefined) ? subtheme : '';
    this.groupname = (groupname !== undefined) ? groupname : '';
}
CategorySearch.prototype.search = function(tmpl) {
    var theme = this.theme;
    var subtheme = this.subtheme;

    var to_append = {};
    if (theme !== '' && theme != undefined) {
        to_append['theme'] = theme;
    }
    if (subtheme !== '' && subtheme != undefined) {
        to_append['subtheme'] = subtheme;
    }
    this.execute_search(this.build_url(), tmpl, to_append, $(this.element_id));
}

CategorySearch.prototype.execute_search = function(url, tmpl, to_append, elem) {
    $.getJSON(url, function() {
    })
    .success(function(data) {
                            
    })
    .error(function(jq, err) {
        console.log(err);
    }).done(function(data) {
        //add the theme, subtheme to the response for the template
        var all = $.extend({}, data, to_append);

        execute_template(tmpl, all, elem, false);

        //init the remove button
        $('.category-remove').bind('click', remove_category);
    });
}