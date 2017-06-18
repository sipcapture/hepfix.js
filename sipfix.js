// SIPFIX Functions

var Protocol = require('binary-protocol');
var protocol = new Protocol();

// Functions
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

// define a type called `String`, which is encoded as a length 
// prefixed series of bytes. 
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

// Exports

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
