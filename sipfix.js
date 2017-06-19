// SIPFIX Functions

var Protocol = require('binary-protocol');
var protocol = new Protocol();

// Functions

// Handshake Parsing
protocol.define('Bytes', {
  read: function (propertyName) {
    this
    .pushStack({length: null, value: null}) // allocate a new object to read the data into. 
    .Int8('length') // read a 32 bit integer into the `length` property. 
    .tap(function (data) {
      if (data.length === -1) {
        // if the length is -1, then there are no bytes and the value is null. 
        data.value = null;
        return;
      }
      this.raw('value', data.length); // read N bytes into a property called `value` 
    })
    .popStack(propertyName, function (data) {
      // pop the interim value off the stack and insert the real value into `propertyName` 
      return data.value;
    });
  },
  write: function (value) {
    if (value === null) {
      this.Int8(-1); // a length of -1 indicates a null value. 
    }
    else {
      // value is a buffer 
      this
      .Int8(value.length) // write the buffer length 
      .raw(value); // write the raw buffer 
    }
  }
});

protocol.define('String', {
  read: function (propertyName) {
    this
    .Bytes(propertyName) // read `Bytes` into the property name. 
    .collect(function (data) {
      // collect the final data to return 
      if (data[propertyName] !== null) {
        data[propertyName] = data[propertyName].toString('utf8');
      }
      return data;
    });
  },
  write: function (value) {
    this.Bytes(new Buffer(value, 'utf8'));
  }
});

// SIP Parsing

protocol.define('LongMsg', {
  read: function (propertyName) {
    this
    .pushStack({length: null, value: null}) // allocate a new object to read the data into. 
    .Int16BE('length')
    .tap(function (data) {
      if (data.length === -1 ) {
        // if the length is -1, then there are no bytes and the value is null. 
        data.value = null;
        return;
      } else {
        return this.raw('value', data.length); // read N bytes into a property called `value` 
      }
    })
    .popStack(propertyName, function (data) {
      // pop the interim value off the stack and insert the real value into `propertyName` 
      return data.value;
    });
  },
  write: function (value) {
    if (value === null) {
      this.Int16BE(-1); // a length of -1 indicates a null value. 
    }
    else {
      // value is a buffer 
      this
      .Int16BE(value.length) // write the buffer length 
      .raw(value); // write the raw buffer 
    }
  }
});

protocol.define('SipString', {
  read: function (propertyName) {
    this
    .LongMsg(propertyName)
    .collect(function (data) {
      // collect the final data to return 
      if (data[propertyName] !== null) {
        data[propertyName] = data[propertyName].toString('utf8');
      }
      return data;
    });
  },
  write: function (value) {
    this.Bytes(new Buffer(value, 'utf8'));
  }
});

// Exports

exports.version = "1.0.0";

exports.readHeader = function(buffer){
	var reader = protocol.createReader(buffer)
        	.Int16BE('version')
        	.Int16BE('length')
        	.Int32BE('exportTime')
        	.Int32BE('seqNum')
        	.Int32BE('observationId')

        	.Int16BE('setId')
        	.Int16BE('setLen')
        	return reader.next();
}

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
        	.Int8('sMiVer')
        	.Int8('revision')
        	.String('hostname');
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
                .Int8(result.sMiVer)
                .Int8(result.revision)
	        .String(result.hostname);
	return writer.buffer;
}

exports.readIn = function(buffer){
	var reader = protocol.createReader(buffer)
        	.Int16BE('version')
        	.Int16BE('length')
        	.Int32BE('exportTime')
        	.Int32BE('seqNum')
        	.Int32BE('observationId')
        	.Int16BE('setId')
        	.Int16BE('setLen')

        	.Int32BE('timeSec')
        	.Int32BE('timeMic')
        	.Int8('intSlot')
        	.Int8('intPort')
        	.Int16BE('intVlan')

        	.String('callId')

        	.Int32BE('srcIp')
        	.Int32BE('dstIp')
        	.Int16BE('dstPort')
        	.Int16BE('srcPort')

        	.Int16BE('UDPlen')
       // 	.Int16BE('msgLen')
        	.SipString('msg');
        	return reader.next();
}

exports.readOut = function(buffer){
	var reader = protocol.createReader(buffer)
        	.Int16BE('version')
        	.Int16BE('length')
        	.Int32BE('exportTime')
        	.Int32BE('seqNum')
        	.Int32BE('observationId')
        	.Int16BE('setId')
        	.Int16BE('setLen')

        	.Int32BE('timeSec')
        	.Int32BE('timeMic')
        	.Int8('intSlot')
        	.Int8('intPort')
        	.Int16BE('intVlan')

        	.String('callId')
		// .Int8('cidEnd')

        	.Int16BE('ipLen')
        	.Int8('vl')
        	.Int8('tos')
        	.Int16BE('tLen')
        	.Int16BE('tId')
        	.Int16BE('tFlags')
        	.Int8('ttl')
        	.Int8('tProto')
        	.Int16BE('tPos')

        	.Int32BE('srcIp')
        	.Int32BE('dstIp')

        	.Int16BE('dstPort')
        	.Int16BE('srcPort')
        	.Int16BE('UDPlen')
       		// .Int16BE('msgLen')
        	.SipString('msg');
        	return reader.next();
}
