<img src="http://i.imgur.com/MAPMGfe.png" />

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



### LEGAL
HEPFIX is an independent implementation of an IPFIX template. HEPIX is not related, affiliated to or endorsed by ORACLE Communications in any way or form. ACME PACKET is a trademark of ORACLE Communications. All rights reserved by their respective owners.
