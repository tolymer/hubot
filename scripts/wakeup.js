module.exports = (robot) => {
  robot.router.post('/wakeup', (req, res) => {
    robot.send({ room: req.body.channel_name }, '起きたよ');
    res.end();
  });
};
