 module.exports.toolShoot = {
 	shoot: function() {
	 	var fs = require('fs');
	  	var Spooky = require('spooky');
	  	// var resemble = require('/Users/alterego/0_work/test-tool/test-app/phantom/node_modules/resemblejs/resemble.js');
	  	// console.log(resemble);
	  	var imageDiff = require('image-diff');
	  	// var phantomcss = require('/Users/alterego/0_work/test-tool/test-app/phantom/phantomcss.js');

		var spooky_instance = new Spooky(
			{
				child: {
		            transport: 'http'
		        },
				casper: {
					logLevel: 'debug',
		            // verbose: true
				}
			}, function (err) {
				// NODE CONTEXT
				
		  		// phantomcss.init({
		  		// 	casper: spooky_instance
		  		// });	
			  	imageDiff({
					actualImage: 'weather.png',
					expectedImage: 'weather1.png',
					diffImage: 'weather.diff.png',
					shadow: true
				}, function (err, imagesAreSame) {
				  // error will be any errors that occurred 
				  // imagesAreSame is a boolean whether the images were the same or not 
				  // diffImage will have an image which highlights differences 
				});
				spooky_instance.start('http://nic.ua/', function(){
					
				});
				
		        spooky_instance.then(function () {
		            this.captureSelector('weather2.png', '.logo-img');

		            
	            	// this.emit('hello', 'Hello, from ' + this.evaluate(function () {
		            //     return document.title;
		            // }));
				    
		        });

		        spooky_instance.run();
			});
		// spooky_instance.on('hello', function (greeting) {
		//     console.log(greeting);
		// });

		// spooky_instance.on('log', function (log) {
		//     if (log.space === 'remote') {
		//         console.log(log.message.replace(/ \- .*/, ''));
		//     }
		// });
	}

	
 };


 