/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/
var phantomcss = require('./../phantomcss.js');

phantomcss.init(/*{
	screenshotRoot: '/screenshots',
	failedComparisonsRoot: '/failures'
	casper: specific_instance_of_casper,
	libraryRoot: '/phantomcss',
	fileNameGetter: function overide_file_naming(){},
	onPass: function passCallback(){},
	onFail: function failCallback(){},
	onTimeout: function timeoutCallback(){},
	onComplete: function completeCallback(){},
	hideElements: '#thing.selector',
	addLabelToFailedImage: true,
	outputSettings: {
		errorColor: {
			red: 255,
			green: 255,
			blue: 0
		},
		errorType: 'movement',
		transparency: 0.3
	}
}*/);


/*
	The test scenario
*/
//var urlPrefix = 'http://macbook-pro-alterego.local:8000/';
var urlPrefix = 'http://demo.alterego-russia.ru/bosco/';
var urlArray = [
	"index.html",
	// "2_catalogue.html",
	// "3_item_donna_2.html",
	// "404.html",
	// "THX.html",
	// "about_us.html",
	// "brands.html",
	// "cart_step_1-few.html",
	// "cart_step_1.html",
	// "cart_step_2.html",
	// "cart_step_3.html",
	// "lookbooks-1.html",
	// "lookbooks.html",
	// "personal-popup-mailwishlist.html",
	// "personal.html",
	// "personal_adress.html",
	// "personal_cards.html",
	// "personal_data.html",
	// "personal_history.html",
	// "search-result.html",
	// "utility.html",
	
];
var i = 0;
casper.start(urlPrefix);
casper.viewport(1366, 2000);
casper.then(function() {
    this.each(urlArray, function() { 
        var _page = urlArray[i];
        (function(_page, _this){
			_this.thenOpen((urlPrefix + _page), function() {
	            _this.echo(_this.getTitle()); // display the title of page
				_this.wait(1000, function() {
			        phantomcss.screenshot('html', 'page_' + _page);
			        console.log(_page + ' shooooot!');
			    });
	        });
        })(_page, this)
        i++;
    });
});


casper.then( function now_check_the_screenshots(){
	// compare screenshots
	phantomcss.compareAll();
});
casper.then( function end_it(){
	casper.test.done();
});


/*
Casper runs tests
*/
casper.run(function(){
	console.log('\nTHE END.');
	phantom.exit(phantomcss.getExitStatus());
});

