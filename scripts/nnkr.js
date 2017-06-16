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
    let screenshot = path.join(__dirname, '..', 'screenshot.png');
    let out = path.join(__dirname, '..', 'out.png');
    let room = msg.message.room;
    let token = process.env.HUBOT_SLACK_TOKEN;
    let url = 'https://slack.com/api/files.upload';

    cp.exec(`${process.env.GOOGLE_CHROME_BIN} --headless --no-sandbox --disable-gpu --window-size=1280,640 --screenshot http://nnkr.jp/`)
      .then(() => cp.exec(`convert -crop 740x130+270+255 ${screenshot} ${out}`))
      .then(() => fs.readFile(out))
      .then(buffer => imgo(buffer, { pngquant : true }))
      .then(buffer => fs.writeFile(out, buffer))
      .then(() => cp.exec(`curl -F file=@${out} -F channels=${room} -F token=${token} ${url}`))
      .catch(error => console.error(error));
  });
};
