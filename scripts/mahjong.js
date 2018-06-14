// Description:
//   mahjong
//
// Commands:
//   hubot mahjong haipai

const Mahjong = require('../models/mahjong');
const MAX_COUNT = 18;
let mahjong = null;

module.exports = (robot) => {
  robot.respond(/(mahj[oa]ng|mj) (.*)$/i, (msg) => {
    let { type, pai } = Mahjong.parseCommand(msg.match[1]);

    const restore = () => {
      let { yama, pais, discardedPais, doraDisplayedPai } = robot.brain.get('mahjong');
      return new Mahjong({yama, pais, discardedPais, doraDisplayedPai});
    };

    if (process.env['DEBUG']) {
      console.log(type, pai);
    }

    switch (type) {
      case Mahjong.HAIPAI:
        mahjong = Mahjong.haipai();
        break;
      case Mahjong.TSUMOGIRI:
        mahjong = restore();
        mahjong.tsumogiri()
        break;
      case Mahjong.DISCARD:
        mahjong = restore();
        if (!mahjong.discard(pai)) {
          return msg.send('チョンボ');
        }
        break;
      default:
        msg.send('チョンボ');
        return;
    }

    msg.send(mahjong.display());
    robot.brain.set('mahjong', {
      yama: mahjong.yama,
      pais: mahjong.pais,
      discardedPais: mahjong.discardedPais,
      doraDisplayedPai: mahjong.doraDisplayedPai,
    });
  });
};
