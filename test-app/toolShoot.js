 module.exports.toolShoot = {
 	shoot: function(url, tasks, url_key, ev) {
 		return function() {
 			console.log('Start ' + url);

		 	var fs = require('fs');
		  	var Spooky = require('spooky');
		  	var imageDiff = require('image-diff');

			var spooky_instance = new Spooky(
				{
					child: {
			            transport: 'stdio'
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
					
					taskIteration(tasks, 0, url_key);
			        function taskIteration(tasks, index, url_key) {
			        	if(typeof tasks == 'undefined' || tasks.length <= index) {
			        		// ev.emit('onTaskSuccess', url);
			        		return;
			        	}
			        	task = tasks[index];
			        	index++;
			            	switch(task.type) {
								case "screenShoot":
									var file_name = task.selector.toString().replace('.','').replace('#','') + '.png';
									spooky_instance.then([
										{
											file_name: file_name, 
											selector: task.selector,
											index: index,
											url_key: url_key
										}, 
										function(){
											if (this.exists(selector)) {
										        this.captureSelector(file_name, selector);
			                                	this.emit('onShootSuccess', {
			                                		message: selector, 
			                                		next: index,
			                                		url_key: url_key
			                                	});
			                                	this.emit('onShootNext', index);
										    } else {
										    	this.emit('onShootError', 'Not found selector' + selector);
										    }
							            }
						            ]);		
									break;
								case "click":
									spooky_instance.then([
										{
											selector: task.selector,
											index: index
										}, 
										function(){
											if (this.exists(selector)) {
										        this.click(selector);
			                                	this.emit('onShootNext', index);
										    } else {
										    	this.emit('onShootError', 'Not found selector' + selector);
										    }
							            }
						            ]);		
									break;	
								case "mouseOver":
									spooky_instance.then([
										{
											selector: task.selector,
											index: index
										}, 
										function(){
											if (this.exists(selector)) {
										        this.mouseEvent('mouseover', selector);
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
				        taskIteration(tasks, index, url_key);
			        }		
			        spooky_instance.run();
				});
			spooky_instance.on('onShootSuccess', function (message) {
			    ev.emit('onShootSuccess', message);
			});
			spooky_instance.on('onShootError', function (message) {
				ev.emit('onTaskError', message);
			    console.log(message);
			});

			// spooky_instance.on('log', function (log) {
			//     if (log.space === 'remote') {
			//         console.log(log.message.replace(/ \- .*/, ''));
			//     }
			// });
			
			// return new Promise(function(resolve, reject){
	  //           ev.on('onTaskSuccess', function(index){
			// 		resolve();
			// 	});
			// 	ev.on('onTaskError', function(index){
			// 		reject();
			// 	});
			// });
		}
	}

	
 };


 