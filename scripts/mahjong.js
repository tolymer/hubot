// Description:
//   mahjong
//
// Commands:
//   hubot mahjong haipai

const Mahjong = require('../models/mahjong');
let mahjong = null;

module.exports = (robot) => {
  robot.respond(/mahj[oa]ng (.*)$/i, (msg) => {
    let { type, pai } = Mahjong.parseCommand(msg.match[1]);

    const restore = () => {
      let { pais, discardedPais, doraDisplayedPai } = robot.brain.get('mahjong');
      mahjong = new Mahjong(pais, discardedPais, doraDisplayedPai);
    };

    if (process.env['DEBUG']) {
      console.log(type, pai);
    }

    switch (type) {
      case Mahjong.HAIPAI:
        mahjong = new Mahjong().haipai();
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
      pais: mahjong.pais,
      discardedPais: mahjong.discardedPais,
      doraDisplayedPai: mahjong.doraDisplayedPai,
    });
  });
};
