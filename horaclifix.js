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
if (config.ipfix_config) {
	var debug = config.ipfix_config.debug;
}

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

// HEP Handler
var HEPit = function(message){
	// Form and Send IPFIX JSON as HEP
	hep_client.preHep( hep_client.rcinfo(message) );
};

// IPFIX Type Handler
var fixHandler = function(data,socket){
	var dlen = data.byteLength;
	//var dlen = data.length;
	// Determine IPFIX Type
	var result = sipfix.readHeader(data);
	if (result.SetID == 256) {
		if (debug) console.log('GOT HANDSHAKE ID: ',result.SetID);
		var shake = sipfix.readHandshake(data);
		shake.SetID++
		if (debug) console.log('REPLYING WITH ID: '+shake.SetID);
		socket.write(sipfix.writeHandshake(shake) );
		return;

	} else if (result.SetID === 258) {
		if (dlen > result.Length ) {
			if (debug) console.log('258: MULTI-MESSAGE');
			if (debug) console.log("Header length: "+result.Length+" < Packet length: "+dlen);

			var sip = sipfix.SipOut( data.slice(0,result.Length));
			if (sip) {
				sip.SrcIP = sip.SrcIP.join('.');
				sip.DstIP = sip.DstIP.join('.');
				if (debug) console.log(sip.SipMsg.toString() );
				HEPit(sip);
			}

			// Process Next
			fixHandler(data.slice(result.Length,data.length));
			return;

		} else {
			if (debug) console.log('258: SINGLE-MESSAGE');
			var sip = sipfix.SipIn(data);
			if (sip) {
				sip.SrcIP = sip.SrcIP.join('.');
				sip.DstIP = sip.DstIP.join('.');
				if (debug) console.log(sip.SipMsg.toString() );
				HEPit(sip);
			}
			return;
		}

	} else if (result.SetID === 259) {
		if (dlen > result.Length ) {
			if (debug) console.log('259: MULTI-MESSAGE');
			if (debug) console.log("Header length: "+result.Length+" < Packet length: "+dlen);

			var sip = sipfix.SipOut( data.slice(0,result.Length));
			if (sip) {
				sip.SrcIP = sip.SrcIP.join('.');
				sip.DstIP = sip.DstIP.join('.');
				if (debug) console.log(sip.SipMsg.toString() );
				HEPit(sip);
			}

			// Process Next
			fixHandler(data.slice(result.Length,data.length));
			return;
		} else {

			if (debug) console.log('259: SINGLE-MESSAGE');
			//var sip = sipfix.SipIn(data);
			var sip = sipfix.SipOut(data);
			if (sip) {
				sip.SrcIP = sip.SrcIP.join('.');
				sip.DstIP = sip.DstIP.join('.');
				if (debug) console.log(sip.SipMsg.toString() );
				HEPit(sip);
		   	}
			return;
		}
	} else if (result.SetID === 0) {
			//Keep-Alive?
			return;
	} else {
		if (debug) console.log('Invalid/Unsupported Type: ',result.setID );
			return;
	}

};


// SIPFIX server
var server = net.createServer(function (socket) {
    // socket.setEncoding(null);
    socket.on('data', function (data) {
	// var result = sipfix.readHeader(data);
	fixHandler(data,socket);

    });
})
.listen(config.ipfix_config ? config.ipfix_config.IPFIX_PORT : 4739);

console.log('HORACLIFIX.js Listening on port '+ config.ipfix_config.IPFIX_PORT +' ...');

var exit = false;
process.on('SIGINT', function() {
  console.log();
  console.log('Stats:', hep_client.getStats());
  if (exit) {
    console.log("Exiting...");
    process.exit();
  } else {
    console.log("Press CTRL-C within 2 seconds to Exit...");
    exit = true;
    setTimeout(function () {
      exit = false;
    }, 2000)
  }
});
