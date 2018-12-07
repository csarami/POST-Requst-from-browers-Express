var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    exphbs  = require('express-handlebars'),
    router = require('./routes/index'),
    routes = require('./routes');

app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use("/styles", express.static(__dirname + '/public/styles'));
app.use(express.static(__dirname + '/public'));

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}
//  Connect all our routes to our application
app.use('/', router);


app.use(errorHandler);

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});
