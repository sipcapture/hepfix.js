<img src="http://i.imgur.com/SUJ3UFJ.jpg?1" height="50px" /><img src="https://avatars2.githubusercontent.com/u/6690913?v=3&s=400" height="50px" />

# HEPfix.js
IPFIX to HOMER/HEP  adapter for Oracle SBCs Types

NodeJS port of https://github.com/negbie/horaclifix

#### Status
* working prototype w/ HEP support! Feedback needed

#### Install
```
npm install
```
#### Configure
```
{
  ipfix_config: {
    debug: false,
    IPFIX_PORT: 4739
  },
  hep_config: {
    debug: false,
    HEP_SERVER: '10.0.0.176',
    HEP_PORT: 9063,
    HEP_ID: 2017,
    HEP_PASS: 'oracme'
  }
}
```

#### Run
```
nodejs hepfix.js
```

#### Configure SBC
ORACLE or ACME PACKET SBCs have a built in "capture agent" using a custom IPFIX template to export SIP messages and Statistics in realtime to [HOMER](http://sipcapture.org) and [HEPIC](http://hepic.tel). Enable the IPFIX comm-monitor using the following example and pointing at the HEPFIX IP and Port:
```
comm-monitor
    state           enabled
    qos-enable      enabled
    sbc-grp-id      0
    tls-profile
    monitor-collector
        address               10.0.0.100
        port                  4739
        network-interface     wancom0:0
```

The SBC will send a Handshake packet and start mirroring packets to HEPFIX


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
