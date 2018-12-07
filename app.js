var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    exphbs  = require('express-handlebars');;

app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true })); 

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}

app.get('/', function(req, res, next) {
    res.render('colorPicker', { 'colors' : [ 'blue', 'orange', 'red', 'pink', 'green','black' ].sort() });
});

app.post('/favorite_color', function(req, res, next) {
    var favorite = req.body.color;
    if (typeof favorite == 'undefined') {
        next('Please choose a color!');
    }
    else {
        
        res.send("Your favorite color is " + favorite +"<br/><a href='/'>back</a>");
    }
});

app.use(errorHandler);

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});
