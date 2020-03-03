var Xbox = require('xbox-on');
module.exports = function(RED) {
    function XboxOnNode(config) {
        RED.nodes.createNode(this, config);
        this.ip = this.credentials.ip;
        this.deviceId = this.credentials.deviceId;
        this.numTries = config.numTries;
        this.delay = config.delay;
        var node = this;
        node.on('input', function(msg) {
            (new Xbox(node.ip, node.deviceId)).powerOn({
              tries: node.numTries,
              delay: node.delay,
              waitForCallback: true
            }, function(err) {
              // If an error is hit, report it to the runtime
              if (err) {
                if (done) {
                  // Node-RED 1.0 compatible
                  done(err);
                } else {
                  // Node-RED 0.x compatible
                  node.error(err, msg);
                }
              } else if (done) {
                done(); // Node-RED 1.0 compatible
              }
              // Just return, Node-RED 0.x compatible
            });
        });
    }
    RED.nodes.registerType("xbox-on", XboxOnNode, {
      credentials: {
        ip: {type: "text", required: true},
        deviceId: {type: "text", required: true}
      }
    });
}
