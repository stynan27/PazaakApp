// todo: this should be implemented in VueJS

let peer = new Peer({
	host: location.hostname,
	port: location.port || (location.protocol === 'https:' ? 443 : 80),
	path: '/peerjs'
});

// todo: get destId from UI
let connection = peer.connect(destId);

/// send data to peer
conn.send('hello');

conn.on(‘data’, function(data) {
	// data === 'hello'
});