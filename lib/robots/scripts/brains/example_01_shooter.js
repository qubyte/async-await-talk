importScripts('/lib/robots/scripts/brains/cortex.js');

// Cache the current target ID.
var targetId = null;

cortex.init(function(data, callback) {
  var robot = data.robot;
  var robots = data.status.robots;
  var ids = Object.keys(robots);

  // Remove my ID from the list.
  ids.splice(ids.indexOf(robot.id), 1);

  // If the cached ID doesn't belong to a robot, pick a new index.
  if (!targetId || !robots[targetId]) {
    targetId = ids[Math.floor(Math.random() * ids.length)];
  }

  var target = robots[targetId];
  var message = {
      acceleration: { x: 0, y: 0 },
      token: data.token
  };

  // If this is our target and I have reloaded, fire at it.
  if (target && robot.timeSinceLastShot >= robot.rearmDuration) {
    message.fire = { x: target.position.x, y: target.position.y };
  }

  callback(null, message);
});
