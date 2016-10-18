// Description:
//   deploy
//
// Commands:
//   hubot deploy hubot

const cp = require('child_process');
const fs = require('fs');

module.exports = (robot) => {
  robot.respond(/deploy (.+)$/i, (msg) => {
    let appName = msg.match[1];
    let dirs = fs.readdirSync('/app');

    if (dirs.indexOf(appName) === -1) {
      return msg.send(`Error: ${appName} is invalid`);
    }

    msg.send(`deploying ${appName} :rocket:`);

    if (appName === 'hubot') {
      msg.send('自害 :ghost::gun:');
    }

    cp.exec(`/app/${appName}/deploy.sh`, (err) => {
      if (err) {
        msg.send(`:bomb::bomb::bomb: Error: ${err.message}`);
      } else {
        msg.send(`deployed ${appName} :shipit:`);
      }
    });
  });
};
