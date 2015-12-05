var WebSocketServer = require('ws').Server, 
	wss = new WebSocketServer({ port: 8080 });
var EventEmitter = require('events').EventEmitter;
var ev = new EventEmitter();
var Promise = require('promise');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');


wss.on('connection', function connection(ws) {
	var toolShoot = require('./toolShoot');
	var taskStack = [];
	var data;
	ws.on('message', function incoming(message) {
		var taskStack = [];
		data = JSON.parse(message);
		// Разбираем данные от клиента
		if(typeof data.tasks != 'undefined') {
		    data.tasks.forEach(function(task, key, ar){
		    	console.log(key);
		    	if(typeof data.tasks[key].uid == 'undefined') {
		    		var hash = task.url + new Date().getTime();
					hash = crypto.createHash('md5').update(hash).digest("hex");
		    		data.tasks[key].uid = hash;
		    	}
		    	data.tasks[key].status = 1;
				// taskStack.push(toolShoot.toolShoot.shoot(task.url, task.actions, ev));
				toolShoot.toolShoot.shoot(task.url, task.actions, key, ev)();
			});	
		}
		ws.send(JSON.stringify(data));

		// Promise.all(taskStack)
		// .then(function(res){
		// 	console.log('Yeeee! We did it!');
		// 	console.log(res);
		// });
		
	});

	ev.on('onTaskSuccess', function(message){
		// ws.send(message);
		console.log(message);
	});
	ev.on('onShootSuccess', function(message){
		
		data.tasks[message.url_key].status = 0;
		ws.send(JSON.stringify(data));
		console.log('onShootSuccess!!!');
		// console.log(message);
		// console.log(data);
	});

	ev.on('responseWS', function(message){
		// console.log('from socket');
		// console.log(message);
		ws.send(message);	
	});

	
});