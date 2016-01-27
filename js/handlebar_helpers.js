//see: http://jsfiddle.net/CPrkV/32/, http://stackoverflow.com/questions/8961939/mustache-js-display-key-instead-of-value
Handlebars.registerHelper('eachkeys', function(context, options) {
    var fn = options.fn, inverse = options.inverse;
    var ret = "";

    var empty = true;
    for (key in context) { empty = false; break; }

    if (!empty) {
    for (key in context) {
        ret = ret + fn({ 'key': key, 'value': context[key]});
    }
    } else {
    ret = inverse(this);
    }
    return ret;
});

//for xif & x, see http://jsbin.com/jeqesisa/7/edit
Handlebars.registerHelper("xif", function (expression, options) {
return Handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
});
Handlebars.registerHelper("x", function (expression, options) {
    var fn = function(){}, result;

    // in a try block in case the expression have invalid javascript
    try {
    // create a new function using Function.apply, notice the capital F in Function
    fn = Function.apply(
        this,
        [
        'window', // or add more '_this, window, a, b' you can add more params if you have references for them when you call fn(window, a, b, c);
        'return ' + expression + ';' // edit that if you know what you're doing
        ]
    );
    } catch (e) {
    console.warn('[warning] {{x ' + expression + '}} is invalid javascript', e);
    }

    // then let's execute this new function, and pass it window, like we promised
    // so you can actually use window in your expression
    // i.e expression ==> 'window.config.userLimit + 10 - 5 + 2 - user.count' //
    // or whatever
    try {
    // if you have created the function with more params
    // that would like fn(window, a, b, c)
    result = fn.bind(this)(window);
    } catch (e) {
    console.warn('[warning] {{x ' + expression + '}} runtime error', e);
    }
    // return the output of that result, or undefined if some error occured
    return result;
});

// to reformat the date
Handlebars.registerHelper('displayDate', function(datestr) {
    return [datestr.substr(4, 2), datestr.substr(6), datestr.substr(0,4)].join('-');
});