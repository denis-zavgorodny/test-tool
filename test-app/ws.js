var WebSocketServer = require('ws').Server, 
	wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
	console.log('yep');
	var toolShoot = require('./toolShoot');
	
	ws.on('message', function incoming(message) {
		var data = JSON.parse(message);
		// Разбираем данные от клиента
		console.log(data);
		ws.send(message);	
	});

	
});