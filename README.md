<img src="http://i.imgur.com/MAPMGfe.png" />

# HEPFIX.js
**IPFIX** to **HEP/EEP**  adapter for *Oracle / ACME Packet Net-Net SBCs*

ORACLE /ACME PACKET Net-Net SBCs features a built in *"Capture Agent"* using a custom IPFIX template to export SIP messages and Statistics in realtime from the core. **HEPFIX** converts IPFIX to HEP for [HOMER](http://sipcapture.org) and [HEPIC](http://hepic.tel) without requiring port mirroring and switches/probes/agents.

#### Status
* Working prototype w/ HEP support!

#### Install
```
npm install
```
#### Configure
Configure the IPFIX port and HEP Server settings using the ```config.json``` file:
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

#### Configure SBC Monitor
Enable the IPFIX comm-monitor using the following example and pointing at the HEPFIX IP and Port:
```
comm-monitor
    state           enabled
    qos-enable      enabled
    sbc-grp-id      0
    tls-profile
    monitor-collector
        address               192.168.122.1
        port                  4739
        network-interface     wancom0:0
```

Configuration can also be performed from the SBC User-Interface:
<img src="http://i.imgur.com/Mt00OQb.png">

The SBC will send a Handshake packet and start mirroring packets to HEPFIX

------------------------------

### To-DO
* Implement TCP support
* Interpres QoS reports and other types

### Credits
Core Structures and GO version seeded by [Negbie](https://github.com/negbie) and project [horaclifix](https://github.com/negbie/horaclifix)

### LEGAL
This software is provided as-is and without any warranty what-so-ever. See LICENSE for license details.

HEPFIX is an independent implementation of an IPFIX template. HEPIX is not related, affiliated to or endorsed by ORACLE Communications in any way or form. ACME PACKET is a trademark of ORACLE Communications. All material rights reserved by their respective owners and not claimed by the author. 
