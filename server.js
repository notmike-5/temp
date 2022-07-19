// Load the modules
var express = require('express'); //Express - a web application framework that provides useful utility functions like 'http'
var app = express();
var bodyParser = require('body-parser'); // Body-parser -- a library that provides functions for parsing incoming requests
app.use(bodyParser.json());              // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies
const axios = require('axios');
const qs = require('query-string');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/')); // Set the relative path; makes accessing the resource directory easier

// Home page
app.get('/', function(req, res) {
    res.render('pages/index.ejs', {
	title: "Coffee101",
	error: false,
	message: ''
    });
});

//NYT Movie Reviews Landing Page
app.get('/movie-reviews', function(req, res) {
    res.render('pages/NYTimes_home.ejs', {
	title: "Movie Reviews from the New York Times",
	items: '',
	error: false,
	message: ''
    });
});

// Handler: request data from NYT Movie Reviews API for given search criteria
app.post('/get_feed', function(req, res) {
    var title = req.body.title;

    //API keys
    //NYT
    var api_key = 'E41rCcRHiK3WmDoY27Ignvsr475bGZQf';
    
    if(title) {
	axios({
	    url: `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${title}&api-key=${api_key}`,
            method: 'GET',
            dataType:'json',
	})
            .then(items => {
		res.render('pages/NYTimes_home', {
		    title: "NYTimes - Movie Search Results",
		    items: items.data.results,
		    error: false,
		    message: ''
		})
            })
            .catch(error => {
		console.log(error);
		res.render('pages/NYTimes_home',{
		    title: "NYTimes Movie Reviews",
		    items: '',
		    error: true,
		    message: error
		})
            });
    }
    else {
	res.render('pages/NYTimes_home', {
	    title: "NYTimes Movie Reviews",
	    items: '',
	    error: true,
	    message: 'error: invalid search'
	});
    }
});

//Flickr Search Landing Page
app.get('/flickr', function(req, res) {
    res.render('pages/flickr_search', {
	title: "Flickr API Image Search",
	items: '',
	error: false,
	message: ''
    });
});

// Handler: request photos from the Flickr API for given search string
app.post('/get_fotos', function(req, res) {
    var api_key = '24d47f894a2d8ff0b504cc1ee6aa0d13'; //Flickr
    var query = req.body.query;
    var per_page = req.body.per_page;
    
    /* We're going to make an asynchronous, AJAX API call */

    console.log(per_page);
    
    //1. create an XMLHttpRequest Object
    let request = new XMLHttpRequest();

    //2. create the request
    request.open('GET', 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + api_key + '&tags=' + query + '&per_page=' + per_page + '&format=json&nojsoncallback=1');

    //3. Send the request
    request.send();

    request.addEventListener('load', function() {
	console.log(request.responseText);
    });
});

app.listen(3000);
console.log('3000 is the magic port');
