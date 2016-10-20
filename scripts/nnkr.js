// Description:
//   何切る？
//
// Commands:
//   hubot nnkr

const phantomjs = require('phantomjs');
const path = require('path');
const pify = require('pify');
const imgo = require('imgo');
const cpP = pify(require('child_process'));
const fsP = pify(require('fs'));

module.exports = (robot) => {
  robot.respond(/nnkr/i, (msg) => {
    let nnkr = path.join(__dirname, '..', 'nnkr.png');
    let room = msg.message.room;
    let token = process.env.HUBOT_SLACK_TOKEN;
    let url = 'https://slack.com/api/files.upload';

    cpP.exec(`${phantomjs.path} ${path.join(__dirname, '../nnkr-request.js')}`)
      .then(() => fsP.readFile(nnkr))
      .then(buffer => imgo(buffer, { pngquant : true }))
      .then(buffer => fsP.writeFile(nnkr, buffer))
      .then(() => cpP.exec(`curl -F file=@${nnkr} -F channels=${room} -F token=${token} ${url}`));
  });
};
