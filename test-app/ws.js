var WebSocketServer = require('ws').Server, 
	wss = new WebSocketServer({ port: 8080 });
var EventEmitter = require('events').EventEmitter;
var ev = new EventEmitter();

wss.on('connection', function connection(ws) {
	var toolShoot = require('./toolShoot');
	
	ws.on('message', function incoming(message) {
		var data = JSON.parse(message);
		// Разбираем данные от клиента
		if(typeof data.tasks != 'undefined') {
		    data.tasks.forEach(function(task, key, ar){
		    	// console.log(task);
				toolShoot.toolShoot.shoot(task.url, task.actions, ev);
			});	
		}
		
	});
	ev.on('responseWS', function(message){
		console.log('from socket');
		console.log(message);
		ws.send(message);	
	});

	
});