# horaclifix.js
IPFIX/SIPFIX adapter for HOMER/HEP and Oracle SBCs

<img src="http://i.imgur.com/SUJ3UFJ.jpg?1" />

#### Status
* work in progress
* loosely based on [RFC5101](https://www.rfc-editor.org/rfc/rfc5101.txt)

#### Install
```
npm install
```
#### Run
```
nodejs horaclifix.js
```
##### Handshake Test
```
echo -ne '\x00\x0A\x00\x30\x59\x41\x37\x38\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x20\x00\x01\x00\x02\x00\xFC\x77\x31\x00\x00\x00\x1E\x00\x00\x00\x00\x43\x5A\x07\x03\x00\x06\x65\x63\x7A\x37\x33\x30' | nc localhost 4739
```
##### Handshake Output
```
{ version: 10,
  length: 48,
  exportTime: 1497446200,
  seqNum: 0,
  observationId: 0,
  setId: 256,
  setLen: 32,
  maVer: 1,
  miVer: 2,
  cFlags1: 252,
  cFlags2: 30513,
  sFlags: 0,
  timeout: 30,
  systemId: 0,
  product: 17242,
  sMaVer: 7,
  sMiVer: 3,
  revision: 0,
  hostname: 'ecz730' 
}
```
