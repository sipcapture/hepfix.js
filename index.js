/* *****************************
	HORACLIFIX.JS
	(C) QXIP BV 2017
	Based on negbie/horaclifix
   *****************************
*/

// Proto Buffers
var Protocol = require('binary-protocol');
var protocol = new Protocol();
var net = require('net');

// TEST:
// echo -ne '\x00\x0A\x00\x30\x59\x41\x37\x38\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x20\x00\x01\x00\x02\x00\xFC\x77\x31\x00\x00\x00\x1E\x00\x00\x00\x00\x43\x5A\x07\x03\x00\x06\x65\x63\x7A\x37\x33\x30' | nc localhost 4739

// SIPFIX Handsharker

var readFix = function(buffer){
	var reader = protocol.createReader(buffer)
        	.Int16BE('version')
        	.Int16BE('length')
        	.Int32BE('exportTime')
        	.Int32BE('seqNum')
        	.Int32BE('observationId')
        	.Int16BE('setId')
        	.Int16BE('setLen')
        	.Int16BE('maVer')
        	.Int16BE('miVer')
        	.Int16BE('cFlags1')
        	.Int16BE('cFlags2')
        	.Int16BE('sFlags')
        	.Int16BE('timeout')
        	.Int32BE('systemId')
        	.Int16BE('product')
        	.Int8('sMaVer')
        	.Int8('sMaVer')
        	.Int32BE('hostname');
        	return reader.next();
}

writeFix = function(result){
	var writer = protocol.createWriter();
        writer
                .Int16BE(result.version)
                .Int16BE(result.length)
                .Int32BE(result.exportTime)
                .Int32BE(result.seqNum)
                .Int32BE(result.observationId)
                .Int16BE(result.setId)
                .Int16BE(result.setLen)
                .Int16BE(result.maVer)
                .Int16BE(result.miVer)
                .Int16BE(result.cFlags1)
                .Int16BE(result.cFlags2)
                .Int16BE(result.sFlags)
                .Int16BE(result.timeout)
                .Int32BE(result.systemId)
                .Int16BE(result.product)
                .Int8(result.sMaVer)
                .Int8(result.sMaVer)
	        .Int32BE(result.hostname);
	return writer.buffer;
}

// SIPFIX server
var server = net.createServer(function (socket) {
    // socket.setEncoding(null);
    socket.on('data', function (data) {
	var result = readFix(data);
	console.log('GOT FIX: ',result);
	if (result.setId == 256) {
		result.setId++
		console.log('Replying with ID: '+result.setId);
		socket.write(writeFix(result) );
	}
    });
})
.listen(4739);

console.log('HORACLIFIX Starting...');
