// Description:
//   何切る？
//
// Commands:
//   hubot nnkr

const path = require('path');
const pify = require('pify');
const imgo = require('imgo');
const cp = pify(require('child_process'));
const fs = pify(require('fs'));

module.exports = (robot) => {
  robot.respond(/nnkr/i, (msg) => {
    let nnkr = path.join(__dirname, '..', 'screenshot.png');
    let room = msg.message.room;
    let token = process.env.HUBOT_SLACK_TOKEN;
    let url = 'https://slack.com/api/files.upload';

    cp.exec(`${process.env.GOOGLE_CHROME_BIN} --headless --no-sandbox --disable-gpu --screenshot http://nnkr.jp/`)
      .then(() => fs.readFile(nnkr))
      .then(buffer => imgo(buffer, { pngquant : true }))
      .then(buffer => fs.writeFile(nnkr, buffer))
      .then(() => cp.exec(`curl -F file=@${nnkr} -F channels=${room} -F token=${token} ${url}`))
      .catch(error => console.error(error));
  });
};
