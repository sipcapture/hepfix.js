// QoS Handling for HEPFIX.JS
// Exports

exports.version = "1.0.0";

/* RTP PAYLOAD INC/OUT */

exports.getPayloadIncRTP = function(qos){

  return {
	"CORRELATION_ID": qos.IncCallID ,
	"RTP_SIP_CALL_ID": qos.IncCallID ,
	"REPORT_TS": qos.BeginTimeSec,
	"TL_BYTE": qos.IncRtpBytes,
	"SKEW":0.000,
	"TOTAL_PK": qos.IncRtpPackets,
	"EXPECTED_PK":   (qos.IncRtpPackets+qos.IncRtpLostPackets) ,
	"PACKET_LOSS":  qos.IncRtpLostPackets,
	"SEQ":0,
	"JITTER": qos.IncRtpAvgJitter,
	"MAX_JITTER": qos.IncRtpMaxJitter,
	"MEAN_JITTER": qos.IncRtpAvgJitter,
	"DELTA":0.000,
	"MAX_DELTA": 0.000,
	"MAX_SKEW":0.000,
	"MIN_MOS": qos.IncMos, 
	"MEAN_MOS": qos.IncMos, 
	"MOS":  qos.IncMos,
	"RFACTOR": qos.IncrVal,
	"MIN_RFACTOR": qos.IncrVal,
	"MEAN_RFACTOR": qos.IncrVal,
	"SRC_IP": qos.CallerIncSrcIP , 
	"SRC_PORT": qos.CallerIncSrcPort, 
	"DST_IP": qos.CallerIncDstIP ,
	"DST_PORT": qos.CallerIncSrcPort,
	"SRC_MAC":"00-00-00-00-00-00",
	"DST_MAC":"00-00-00-00-00-00",
	"OUT_ORDER":0,
	"SSRC_CHG":0,
	"CODEC_PT": qos.Type, 
	"CLOCK":8000,
	"CODEC_NAME": qos.Type ,
	"DIR":0,
	"REPORT_NAME": "RTP:"+qos.IncRealm+':'+ qos.OutRealm ,
	"PARTY":0,
	"TYPE":"PERIODIC"
  }
};

exports.getPayloadOutRTP = function(qos){
  return {
	"CORRELATION_ID": qos.OutCallID ,
	"RTP_SIP_CALL_ID": qos.OutCallID ,
	"REPORT_TS": qos.BeginTimeSec,
	"TL_BYTE": qos.OutRtpBytes,
	"SKEW":0.000,
	"TOTAL_PK": qos.OutRtpPackets,
	"EXPECTED_PK":  (qos.OutRtpPackets+qos.OutRtpLostPackets),
	"PACKET_LOSS":  qos.OutRtpLostPackets,
	"SEQ":0,
	"JITTER": qos.OutRtpAvgJitter,
	"MAX_JITTER": qos.OutRtpMaxJitter,
	"MEAN_JITTER": qos.OutRtpAvgJitter,
	"DELTA":0.000,
	"MAX_DELTA": 0.000,
	"MAX_SKEW":0.000,
	"MIN_MOS": qos.OutMos, 
	"MEAN_MOS": qos.OutMos, 
	"MOS":  qos.OutMos,
	"RFACTOR": qos.OutrVal,
	"MIN_RFACTOR": qos.OutrVal,
	"MEAN_RFACTOR": qos.OutrVal,
	"SRC_IP": qos.CalleeOutSrcIP , 
	"SRC_PORT": qos.CalleeOutSrcPort, 
	"DST_IP": qos.CalleeOutDstIP ,
	"DST_PORT": qos.CalleeOutDstPort,
	"SRC_MAC":"00-00-00-00-00-00",
	"DST_MAC":"00-00-00-00-00-00",
	"OUT_ORDER":0,
	"SSRC_CHG":0,
	"CODEC_PT": qos.Type, 
	"CLOCK":8000,
	"CODEC_NAME": qos.Type ,
	"DIR":1,
	"REPORT_NAME": "RTP:"+qos.OutRealm+':'+ qos.IncRealm ,
	"PARTY":1,
	"TYPE":"PERIODIC"
  }
};



/* RTCP PAYLOAD INC/OUT: */

exports.getPayloadIncRTCP = function(qos){

  return {
	"CORRELATION_ID": qos.IncCallID ,
	"RTP_SIP_CALL_ID": qos.IncCallID ,
	"REPORT_TS": qos.BeginTimeSec,
	"TL_BYTE": qos.IncRtcpBytes,
	"SKEW":0.000,
	"TOTAL_PK": qos.IncRtcpPackets,
	"EXPECTED_PK":  (qos.IncRtcpPackets+qos.IncRtcpLostPackets),
	"PACKET_LOSS":  qos.IncRtcpLostPackets,
	"SEQ":0,
	"JITTER": qos.IncRtcpAvgJitter,
	"MAX_JITTER": qos.IncRtcpMaxJitter,
	"MEAN_JITTER": qos.IncRtcpAvgJitter,
	"DELTA": qos.IncRtcpAvgLat,
	"MAX_DELTA":  qos.IncRtcpMaxLat,
	"MAX_SKEW":0.000,
	"MIN_MOS": qos.IncMos, 
	"MEAN_MOS": qos.IncMos, 
	"MOS":  qos.IncMos,
	"RFACTOR": qos.IncrVal,
	"MIN_RFACTOR": qos.IncrVal,
	"MEAN_RFACTOR": qos.IncrVal,
	"SRC_IP": qos.CallerIncSrcIP , 
	"SRC_PORT": qos.CallerIncSrcPort, 
	"DST_IP": qos.CallerIncDstIP ,
	"DST_PORT": qos.CallerIncSrcPort,
	"SRC_MAC":"00-00-00-00-00-00",
	"DST_MAC":"00-00-00-00-00-00",
	"OUT_ORDER":0,
	"SSRC_CHG":0,
	"CODEC_PT": qos.Type, 
	"CLOCK":8000,
	"CODEC_NAME": qos.Type ,
	"DIR":0,
	"REPORT_NAME": "RTCP:"+qos.IncRealm+':'+ qos.OutRealm ,
	"PARTY":0,
	"TYPE":"PERIODIC"
  }
};

exports.getPayloadOutRTCP = function(qos){

  return {
	"CORRELATION_ID": qos.OutCallID ,
	"RTP_SIP_CALL_ID": qos.OutCallID ,
	"REPORT_TS": qos.BeginTimeSec,
	"TL_BYTE": qos.OutRtcpBytes,
	"SKEW":0.000,
	"TOTAL_PK": qos.OutRtcpPackets,
	"EXPECTED_PK":  (qos.OutRtcpPackets+qos.OutRtcpLostPackets),
	"PACKET_LOSS":  qos.OutRtcpLostPackets,
	"SEQ":0,
	"JITTER": qos.OutRtcpAvgJitter,
	"MAX_JITTER": qos.OutRtcpMaxJitter,
	"MEAN_JITTER": qos.OutRtcpAvgJitter,
	"DELTA": qos.OutRtcpAvgLat,
	"MAX_DELTA":  qos.OutRtcpMaxLat,
	"MAX_SKEW":0.000,
	"MIN_MOS": qos.OutMos, 
	"MEAN_MOS": qos.OutMos, 
	"MOS":  qos.OutMos,
	"RFACTOR": qos.OutrVal,
	"MIN_RFACTOR": qos.OutrVal,
	"MEAN_RFACTOR": qos.OutrVal,
	"SRC_IP": qos.CalleeOutSrcIP , 
	"SRC_PORT": qos.CalleeOutSrcPort, 
	"DST_IP": qos.CalleeOutDstIP ,
	"DST_PORT": qos.CalleeOutDstPort,
	"SRC_MAC":"00-00-00-00-00-00",
	"DST_MAC":"00-00-00-00-00-00",
	"OUT_ORDER":0,
	"SSRC_CHG":0,
	"CODEC_PT": qos.Type, 
	"CLOCK":8000,
	"CODEC_NAME": qos.Type ,
	"DIR":1,
	"REPORT_NAME": "RTCP:"+qos.OutRealm+':'+ qos.IncRealm ,
	"PARTY":1,
	"TYPE":"PERIODIC"
  }
};




