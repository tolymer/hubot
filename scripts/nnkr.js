// Description:
//   何切る？
//
// Commands:
//   hubot nnkr

const phantomjs = require('phantomjs');
const path = require('path');
const pify = require('pify');
const imgo = require('imgo');
const cp = pify(require('child_process'));
const fs = pify(require('fs'));

module.exports = (robot) => {
  robot.respond(/nnkr/i, (msg) => {
    let nnkr = path.join(__dirname, '..', 'nnkr.png');
    let room = msg.message.room;
    let token = process.env.HUBOT_SLACK_TOKEN;
    let url = 'https://slack.com/api/files.upload';

    cp.exec(`${phantomjs.path} ${path.join(__dirname, '../nnkr-request.js')}`)
      .then(() => fs.readFile(nnkr))
      .then(buffer => imgo(buffer, { pngquant : true }))
      .then(buffer => fs.writeFile(nnkr, buffer))
      .then(() => cp.exec(`curl -F file=@${nnkr} -F channels=${room} -F token=${token} ${url}`))
      .catch(error => console.error(error));
  });
};
