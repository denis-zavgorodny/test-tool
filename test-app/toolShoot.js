 module.exports.toolShoot = {
 	shoot: function(url, tasks, ev) {
	 	var fs = require('fs');
	  	var Spooky = require('spooky');
	  	var imageDiff = require('image-diff');

		var spooky_instance = new Spooky(
			{
				child: {
		            transport: 'http'
		        },
				casper: {
					logLevel: 'debug',
					viewportSize: {
						width: 1280, 
						height: 900
					}
		            // verbose: true
				}
			}, function (err) {
			 //  	imageDiff({
				// 	actualImage: 'weather.png',
				// 	expectedImage: 'weather1.png',
				// 	diffImage: 'weather.diff.png',
				// 	shadow: true
				// }, function (err, imagesAreSame) {
				//   // error will be any errors that occurred 
				//   // imagesAreSame is a boolean whether the images were the same or not 
				//   // diffImage will have an image which highlights differences 
				// });
				// spooky_instance.start(url, function(){
					
				// });
				spooky_instance.start(url, function(){
				});
				
				taskIteration(tasks, 0);
		        function taskIteration(tasks, index) {
		        	if(typeof tasks == 'undefined' || tasks.length <= index)
		        		return;
		        	task = tasks[index];
		        	index++;
		        		console.log(task);
		            
		            	switch(task.type) {
							case "screenShoot":
								var file_name = task.selector.toString().replace('.','').replace('#','') + '.png';
								spooky_instance.then([
									{
										file_name: file_name, 
										selector: task.selector,
										index: index
									}, 
									function(){
										if (this.exists(selector)) {
									        this.captureSelector(file_name, selector);
		                                	this.emit('onShootSuccess', {message: selector, next: index});
		                                	this.emit('onShootNext', index);
									    } else {
									    	this.emit('onShootError', 'Not found selector' + selector);
									    }
						            }
					            ]);		
					            
								break;
							default:
								break;	
						}
			        taskIteration(tasks, index);   
		        }		
		        spooky_instance.run();
			});
		spooky_instance.on('onShootSuccess', function (message) {
		    console.log(message);
		    console.log('============================================');
		    ev.emit('responseWS', message);
		});
		spooky_instance.on('onShootError', function (message) {
		    console.log(message);
		});

		// spooky_instance.on('log', function (log) {
		//     if (log.space === 'remote') {
		//         console.log(log.message.replace(/ \- .*/, ''));
		//     }
		// });
	}

	
 };


 