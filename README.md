<img src="https://i.imgur.com/scqdu3p.png" width="300">

<img src="http://i.imgur.com/MAPMGfe.png" />

# HEPFIX.js
**IPFIX** to **HEP/EEP**  adapter for *Oracle / ACME Packet Net-Net SBCs*

ORACLE / ACME PACKET Net-Net SBCs features a built in *"Capture Agent"* using a custom IPFIX template to export SIP messages and Statistics in realtime from the core. **HEPFIX** handles and converts IPFIX binary formats to HEP equivalents for using with [HOMER](http://sipcapture.org) and [HEPIC](http://hepic.tel) without requiring port mirroring and switches/probes/agents.

#### Status
* Working prototype w/ HEP support!
* UDP/TCP Relay, RTP/RTCP QoS Reports

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

The SBC will send a Handshake packet and start mirroring enabled interface packets to HEPFIX

```
sh comm-monitor
 
Client                     State                 Protocol
===========================================================
192.168.122.1:4739         Connected             TCP      

```
###### WARNING: AN SBC REBOOT/SWITCHOVER MIGHT BE REQUIRED IF FIRST TIME USAGE SHOWS NO HANDSHAKES

------------------------------

<img src="http://i.imgur.com/Erkji9P.png"/>

------------------------------

### IPFIX Types
|Type   |Description   | Support |
|-- |-- |-- |
| 256 |Handshake Recv | x |
| 257 |Handshake Send | x |
| 258 |SIP UDP Recv Msg Sent | x |
| 259 |SIP UDP Send Msg Sent | x |
| 260 |SIP TCP Recv Msg Sent | x |
| 261 |SIP TCP Send Msg Sent | x |
|   |SIP SCTP Recv Msg Sent |   |
|   |SIP SCTP Send Msg Sent |   |
|   |ENUM Recv Msg Sent |   |
|   |ENUM Send Msg Sent |   |
| 268 |QOS RTP/RTCP | x |
|   0 |Keep Alive | x |


### To-DO
* TEST, TEST, TEST!
* Convert QoS Reports to RTPAgent reports

### Credits
Core Structures and GO version seeded by [Negbie](https://github.com/negbie) and project [horaclifix](https://github.com/negbie/horaclifix)

### LEGAL
This software is provided as-is and without any warranty what-so-ever. See LICENSE for license details.

HEPFIX is an independent implementation of a generic IPFIX template with custom types based on open standards and definitions and permitted by EU Directive 2009/24/EC. HEPIX is not related, affiliated to or endorsed by ORACLE Communications in any way, form or shape. 

ACME PACKET, PALLADION, OCOM are a trademarks of ORACLE Communications. All material rights reserved by their respective owners and not claimed by the author. 
