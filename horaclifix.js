/* *****************************
	HORACLIFIX.JS
	(C) QXIP BV 2017
	Based on negbie/horaclifix
   *****************************
*/

var net = require('net');
var sipfix = require('./sipfix.js')

console.log("Press CTRL-C to Exit...");

var config = require('./config.js');

if (config.hep_config) {
  var hep_client = require('./hep-client.js');
  hep_client.init(config.hep_config);
}
else {
  console.log('Must provide HEP configuration');
  exit;
}


// TEST:
// echo -ne '\x00\x0A\x00\x30\x59\x41\x37\x38\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x20\x00\x01\x00\x02\x00\xFC\x77\x31\x00\x00\x00\x1E\x00\x00\x00\x00\x43\x5A\x07\x03\x00\x06\x65\x63\x7A\x37\x33\x30' | nc localhost 4739

// SIPFIX server
var server = net.createServer(function (socket) {
    // socket.setEncoding(null);
    socket.on('data', function (data) {
	var result = sipfix.readHeader(data);
	if (result.SetID == 256) {
		console.log('GOT HANDSHAKE ID: ',result.SetID);
		var shake = sipfix.readHandshake(data);
		shake.SetID++
		console.log('REPLYING WITH ID: '+shake.SetID);
		socket.write(sipfix.writeHandshake(shake) );
	} else if (result.SetID === 258) {
		var sip = sipfix.SipIn(data);
		if (sip) {
			console.log(sip.SipMsg.toString() );
			// console.log('Type Received: ',sip.msg);
		}
	} else if (result.SetID === 259) {
		var sip = sipfix.SipOut(data);
		if (sip) {
			console.log(sip.SipMsg.toString() );
			// console.log('Type Received: ',sip.msg);
		}
	} else if (result.SetID === 0) {
			//Keep-Alive?
			return;
	} else {
		console.log('Invalid/Unsupported Type: ',result.setID );
		// console.log('DEBUG:',result);
	}
    });
})
.listen(config.ipfix_config ? config.ipfix_config.IPFIX_PORT : 4739);

console.log('HORACLIFIX.js Listening...');
