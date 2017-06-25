/*
 IPFIX Parser for ACME types
 (c) 2017 QXIP BV
 Author: L. Mangani
*/

// SIPFIX Functions
var r = require('restructure');

// Structs

var Header = new r.Struct({
  Version: 	r.uint16,
  Length: 	r.uint16,
  ExportTime: 	r.uint32,
  SeqNum: 	r.uint32,
  ObservationID: r.uint32,
  SetID: 	r.uint16,
  SetLen: 	r.uint16
});

var HandShake = new r.Struct({
  Version: 	r.uint16,
  Length: 	r.uint16,
  ExportTime: 	r.uint32,
  SeqNum: 	r.uint32,
  ObservationID: r.uint32,
  SetID: 	r.uint16,
  SetLen: 	r.uint16,
  MaVer:	r.uint16,
  MiVer:	r.uint16,
  CFlags1:	r.uint16,
  CFlags1:	r.uint16,
  SFlags:	r.uint16,
  Timeout:	r.uint16,
  SystemID:	r.uint32,
  Product:	r.uint16,
  Major:	r.uint8,
  Minor:	r.uint8,
  Revision:	r.uint8,
  HostnameLen:	r.uint8,
  Hostname:	new r.String('HostnameLen', 'utf8')
});


var SipOut = new r.Struct({
  Version: 	r.uint16,
  Length: 	r.uint16,
  ExportTime: 	r.uint32,
  SeqNum: 	r.uint32,
  ObservationID: r.uint32,
  SetID: 	r.uint16,
  SetLen: 	r.uint16,
  TimeSec:	r.uint32,
  TimeMic:	r.uint32,
  IntSlot:	r.uint8,
  IntPort:	r.uint8,
  IntVlan:	r.uint16,
  CallIDLen:	r.uint8,
  CallID:	new r.String('CallIDLen', 'utf8'),
  CallIDEnd:	r.uint8,
  IPlen:	r.uint16,
  VLan:		r.uint8,
  Tos:		r.uint8,
  Tlen:		r.uint16,
  TID:		r.uint16,
  TFlags:	r.uint16,
  TTL:		r.uint8,
  TProto:	r.uint8,
  TPos:		r.uint16,
  SrcIP:	new r.Array(r.uint8, 4),
  DstIP:	new r.Array(r.uint8, 4),
  DstPort:	r.uint16,
  SrcPort:	r.uint16,
  UDPLen:	r.uint16,
  SipMsgLen:	r.uint16,
  SipMsg:	new r.String('SipMsgLen', 'utf8')
});

var SipIn = new r.Struct({
  Version: 	r.uint16,
  Length: 	r.uint16,
  ExportTime: 	r.uint32,
  SeqNum: 	r.uint32,
  ObservationID: r.uint32,
  SetID: 	r.uint16,
  SetLen: 	r.uint16,
  TimeSec:	r.uint32,
  TimeMic:	r.uint32,
  IntSlot:	r.uint8,
  IntPort:	r.uint8,
  IntVlan:	r.uint16,
  CallIDEnd:	r.uint8,
  IPlen:	r.uint16,
  VLan:		r.uint8,
  Tos:		r.uint8,
  Tlen:		r.uint16,
  TID:		r.uint16,
  TFlags:	r.uint16,
  TTL:		r.uint8,
  TProto:	r.uint8,
  TPos:		r.uint16,
  SrcIP:	new r.Array(r.uint8, 4),
  DstIP:	new r.Array(r.uint8, 4),
  DstPort:	r.uint16,
  SrcPort:	r.uint16,
  UDPLen:	r.uint16,
  SipMsgLen:	r.uint16,
  SipMsg:	new r.String('SipMsgLen', 'utf8')
});

// Exports

exports.version = "1.0.1";

exports.readHeader = function(buffer){
	var stream = new r.DecodeStream(buffer);
	return Header.decode(stream);
}

exports.writeHeader = function(result){
	var stream = new r.EncodeStream();
	Header.encode(stream, result);
	return stream.buffer;
}

exports.readHandshake = function(buffer){
	var stream = new r.DecodeStream(buffer);
	return HandShake.decode(stream);
}

exports.writeHandshake = function(result){
	var stream = new r.EncodeStream();
	HandShake.encode(stream, result);
	return stream.buffer;
}

exports.SipIn = function(buffer){
	var stream = new r.DecodeStream(buffer);
	return SipIn.decode(stream);
}

exports.SipOut = function(buffer){
	var stream = new r.DecodeStream(buffer);
	return SipOut.decode(stream);
}

