// Description:
//   点数計算やっちゃうよ
//
// Commands:
//   hubot calc 2翻 70符 親 ツモ
//   hubot calc 3翻 40符 子 ロン

const normalizeFu = (fu) => fu > 110 ? 110 : fu;

const isMangan = (fan, fu) => {
  if (fan == 3 && fu >= 60) {
    return true;
  }
  else if (4 <= fan && fan <= 5 && 30 <= fu) {
    return true
  }

  return false
};

const isHaneman = (fan, fu) => 6 <= fan && fan <= 7;

const isBaiman = (fan, fu) => 8 <= fan && fan <= 10;

const isSanbaiman = (fan, fu) => 11 <= fan && fan <= 12;

const isYakuman = (fan, fu) => 13 <= fan;

const parse = (text = '') => {
  let [fan, fu, role, method] = text.trim().split(/\s+/);
  return [parseInt(fan), parseInt(fu), role, method];
};

const ceil = (point) => Math.ceil(point / 100) * 100;

const calc = (text) => {
  let [fan, fu, role, method] = parse(text);

  fu = normalizeFu(fu)

  let basePoint = fu * Math.pow(2, fan + 2);
  if (isMangan(fan, fu)) {
    basePoint = 2000;
  } else if (isHaneman(fan, fu)) {
    basePoint = 3000;
  } else if (isBaiman(fan, fu)) {
    basePoint = 4000;
  } else if (isSanbaiman(fan, fu)) {
    basePoint = 6000;
  } else if (isYakuman(fan, fu)) {
    basePoint = 8000;
  }

  let isParent = role === '親'

  if (method === 'ロン') {
    return isParent ? `${ceil(basePoint * 6)}` : `${ceil(basePoint * 4)}`;
  } else {
    return isParent ? `${ceil(basePoint * 2)}ALL` : `${ceil(basePoint * 1)}-${ceil(basePoint * 2)}`;
  }
};

module.exports = (robot) => {
  robot.respond(/calc (.+)$/i, (msg) => msg.send(calc(msg.match[1])));
};

module.exports.calc = calc;
