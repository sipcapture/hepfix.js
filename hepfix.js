/* *****************************
	HEPFIX.JS
	Structures Based on negbie/horaclifix
   *****************************
*/

var net = require('net');
var sipfix = require('sipfix')

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

if (config.ipfix_config) {
	var enable_sip = config.ipfix_config.sip ? config.ipfix_config.sip : "true";
	var enable_qos = config.ipfix_config.qos ? config.ipfix_config.qos : "false";
} else {
  console.log('Must provide IPFIX configuration');
  exit;
}

// HEP Handler
var HEPit = function(message){
	// Form and Send IPFIX JSON as HEP
	hep_client.preHep( hep_client.rcinfo(message,1,'SIP') );
};

var QOSit = function(message){
	// Form and Send IPFIX JSON as HEP
	hep_client.preHep( hep_client.rcinfo(message,34,'JSON') );
};

var MOSit = function(message,mos){
	// Form and Send IPFIX JSON as HEP
	hep_client.preHep( hep_client.rcmos(message,mos) );
};

// IPFIX Type Handler
var fixHandler = function(data,socket){
   try {
	var dlen = data.byteLength;
	//var dlen = data.length;
	// Determine IPFIX Type
	var result = sipfix.readHeader(data);
	if(!result||!result.SetID){
		if (debug) console.error('UNDECODED MESSAGE: ',data);
		return;
	}
	if (result.SetID == 256) {
		if (debug) console.log('GOT HANDSHAKE ID: ',result.SetID);
		var shake = sipfix.readHandshake(data);
		shake.SetID++
		if (debug) console.log('REPLYING WITH ID: '+shake.SetID);
		socket.write(sipfix.writeHandshake(shake) );
		return;
	/* UDP */
	} else if (result.SetID === 258) {
		if (dlen > result.Length ) {
			if (debug) console.log('258: MULTI-MESSAGE');
			if (debug) console.log("Header length: "+result.Length+" < Packet length: "+dlen);

			var sip = sipfix.SipIn( data.slice(0,result.Length));
			if (sip) {
				sip.SrcIP = Array.prototype.join.call(sip.SrcIP, '.');
				sip.DstIP = Array.prototype.join.call(sip.DstIP, '.');
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
				sip.SrcIP = Array.prototype.join.call(sip.SrcIP, '.');
				sip.DstIP = Array.prototype.join.call(sip.DstIP, '.');
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
				sip.SrcIP = Array.prototype.join.call(sip.SrcIP, '.');
				sip.DstIP = Array.prototype.join.call(sip.DstIP, '.');
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
				if (debug) console.log(sip);
				sip.SrcIP = Array.prototype.join.call(sip.SrcIP, '.');
				sip.DstIP = Array.prototype.join.call(sip.DstIP, '.');

				if (debug) console.log(sip.SipMsg.toString() );
				HEPit(sip);
		   	}
			return;
		}

	/* TCP */
	} else if (result.SetID === 260) {
		if (dlen > result.Length ) {
			if (debug) console.log('260-TCP: MULTI-MESSAGE');
			if (debug) console.log("Header length: "+result.Length+" < Packet length: "+dlen);

			var sip = sipfix.SipInTCP( data.slice(0,result.Length));
			if (sip) {
				sip.SrcIP = Array.prototype.join.call(sip.SrcIP, '.');
				sip.DstIP = Array.prototype.join.call(sip.DstIP, '.');
				if (debug) console.log(sip.SipMsg.toString() );
				HEPit(sip);
			}

			// Process Next
			fixHandler(data.slice(result.Length,data.length));
			return;

		} else {
			if (debug) console.log('260-TCP: SINGLE-MESSAGE');
			var sip = sipfix.SipInTCP(data);
			if (sip) {
				sip.SrcIP = Array.prototype.join.call(sip.SrcIP, '.');
				sip.DstIP = Array.prototype.join.call(sip.DstIP, '.');
				if (debug) console.log(sip.SipMsg.toString() );
				HEPit(sip);
			}
			return;
		}

	} else if (result.SetID === 261) {
		if (dlen > result.Length ) {
			if (debug) console.log('261-TCP: MULTI-MESSAGE');
			if (debug) console.log("Header length: "+result.Length+" < Packet length: "+dlen);

			var sip = sipfix.SipOutTCP( data.slice(0,result.Length));
			if (sip) {
				sip.SrcIP = Array.prototype.join.call(sip.SrcIP, '.');
				sip.DstIP = Array.prototype.join.call(sip.DstIP, '.');
				if (debug) console.log(sip.SipMsg.toString() );
				HEPit(sip);
			}

			// Process Next
			fixHandler(data.slice(result.Length,data.length));
			return;
		} else {

			if (debug) console.log('261-TCP: SINGLE-MESSAGE');
			//var sip = sipfix.SipIn(data);
			var sip = sipfix.SipOutTCP(data);
			if (sip) {
				if (debug) console.log(sip);
				sip.SrcIP = Array.prototype.join.call(sip.SrcIP, '.');
				sip.DstIP = Array.prototype.join.call(sip.DstIP, '.');

				if (debug) console.log(sip.SipMsg.toString() );
				HEPit(sip);
		   	}
			return;
		}

	/* QOS */
	} else if (result.SetID === 268) {

			//QoS Reports
			if (debug) console.log('268: QOS REPORT');
			var qos = sipfix.StatsQos(data.slice(0,result.Length));
			if (qos) {
				qos.CallerIncSrcIP = Array.prototype.join.call(qos.CallerIncSrcIP, '.');
				qos.CallerIncDstIP = Array.prototype.join.call(qos.CallerIncDstIP, '.');
				qos.CalleeIncSrcIP = Array.prototype.join.call(qos.CalleeIncSrcIP, '.');
				qos.CalleeIncDstIP = Array.prototype.join.call(qos.CalleeIncDstIP, '.');

				qos.CallerOutSrcIP = Array.prototype.join.call(qos.CallerOutSrcIP, '.');
				qos.CallerOutDstIP = Array.prototype.join.call(qos.CallerOutDstIP, '.');
				qos.CalleeOutSrcIP = Array.prototype.join.call(qos.CalleeOutSrcIP, '.');
				qos.CalleeOutDstIP = Array.prototype.join.call(qos.CalleeOutDstIP, '.');

				MOSit( { CallID: qos.IncCallID }, qos.IncMos );
				MOSit( { CallID: qos.OutCallID }, qos.OutMos );

				if (debug) console.log('RTP-INC',sipfix.getPayloadIncRTP(qos));
				QOSit(sipfix.getPayloadIncRTP(qos) );
				if (debug) console.log('RTP-OUT',sipfix.getPayloadOutRTP(qos));
				QOSit(sipfix.getPayloadOutRTP(qos) );
				if (debug) console.log('RTCP-INC',sipfix.getPayloadIncRTCP(qos));
				QOSit(sipfix.getPayloadIncRTCP(qos) );
				if (debug) console.log('RTCP-OUT',sipfix.getPayloadOutRTCP(qos));
				QOSit(sipfix.getPayloadOutRTCP(qos) );
			}
		
			if (dlen > result.Length ) {
				if (debug) console.log('268: QOS MULTI-MESSAGE TRY NEXT');
				// Process Next
				fixHandler(data.slice(result.Length,data.length));
			}
			return;
	} else {
		if (debug) console.log('Invalid/Unsupported Type: ',result.setID );
			return;
	}
	   
   } catch(e){ if (debug) console.error(e) }

};


// SIPFIX server
var server = net.createServer(function (socket) {
    // socket.setEncoding(null);
    socket.on('error', function (err) {
	console.log(err);
    });
    socket.on('data', function (data) {
	// var result = sipfix.readHeader(data);
	fixHandler(data,socket);

    });
})
.listen(config.ipfix_config ? config.ipfix_config.IPFIX_PORT : 4739);

console.log('HEPFIX.js Listening on port '+ config.ipfix_config.IPFIX_PORT +' ...');

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
