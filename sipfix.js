// SIPFIX Functions

var Protocol = require('binary-protocol');
var protocol = new Protocol();

exports.version = "1.0.0";

exports.readHandshake = function(buffer){
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

exports.writeHandshake = function(result){
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
