const router = require('express').Router();


router.get('/', function(req, res, next) {
    res.render('colorPicker', { 'colors' : [ 'blue', 'orange', 'red', 'pink', 'green','black' ].sort() });
});

router.post('/favorite_color', function(req, res, next) {
    var favorite = req.body.color;
    if (typeof favorite == 'undefined') {
        next('Please choose a color!');
    }
    else {
        //var sty = '"style="color:'+favorite+';margin-left:20px;';
        
        res.render('chosenColor', {favorite_color: favorite, 
            message: `Your favorite color is <font color="${favorite}">${favorite}.`+'</font>' +`<br/> <br/><a class='button'  href='/' style='background-color:${favorite};'>back</a>`});
    }
});
module.exports = router;