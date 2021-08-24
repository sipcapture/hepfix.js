var config = {
  ipfix_config: {
    debug: true,
    qos: true,
    sip: true,
    IPFIX_PORT: 4739
  },
  hep_config: {
    debug: false,
    HEP_SERVER: '127.0.0.1',
    HEP_PORT: 9063,
    HEP_ID: 2263,
    HEP_PASS: 'oracme'
  }
};

module.exports = config;

