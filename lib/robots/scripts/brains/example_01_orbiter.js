importScripts('/lib/robots/scripts/brains/cortex.js');

cortex.init(function(data, callback) {
  var robot = data.robot;
  var dx = Math.floor(data.status.field.width / 2) - robot.position.x;
  var dy = Math.floor(data.status.field.height / 2) - robot.position.y;

  var dh = Math.sqrt(dx * dx + dy * dy);

  var message = {
    token: data.token,
    acceleration: {
      x: dx / dh * robot.maxAcceleration,
      y: dy / dh * robot.maxAcceleration
    }
  };

  callback(null, message);
});
