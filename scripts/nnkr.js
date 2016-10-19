// Description:
//   何切る？
//
// Commands:
//   hubot nnkr

const phantomjs = require('phantomjs');
const cp = require('child_process');
const path = require('path');

module.exports = (robot) => {
  robot.respond(/nnkr/i, (msg) => {
    cp.exec(`${phantomjs.path} ${path.join(__dirname, '../nnkr-request.js')}`, => {
      let nnkr = path.join(__dirname, '..', 'nnkr.png');
      let room = msg.message.room;
      let token = process.env.HUBOT_SLACK_TOKEN;
      let url = 'https://slack.com/api/files.upload';
      cp.exec(`curl -F file=@${nnkr)} -F channels=${room} -F token=${token} ${url}`);
    });
  });
};
