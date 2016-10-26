const CHARACTERS = ['一萬', '二萬', '三萬', '四萬', '五萬', '六萬', '七萬', '八萬', '九萬'];
const DOTS = ['一筒', '二筒', '三筒', '四筒', '五筒', '六筒', '七筒', '八筒', '九筒'];
const BAMBOOS = ['一索', '二索', '三索', '四索', '五索', '六索', '七索', '八索', '九索'];
const HONORS = ['東', '南', '西', '北', '中', '發', '白'];
const PAIS = [...HONORS, ...CHARACTERS, ...BAMBOOS, ...DOTS];
const HAIPAI_COMMANDS = ['配牌', 'はいぱい', 'ハイパイ', 'haipai', 'h'];
const TSUMOGIRI_COMMANDS = ['ツモ切り', 'つも切り', 'ツモギリ', 'tsumogiri', 't'];

class Mahjong {
  constructor({yama, pais, discardedPais, doraDisplayedPai}) {
    this.yama = yama;
    this.pais = pais;
    this.discardedPais = discardedPais;
    this.doraDisplayedPai = doraDisplayedPai;

    for (let pai of this.pais) {
      let idx = this.yama.indexOf(pai);
      this.yama.splice(idx, 1);
    }

    for (let discardedPai of this.discardedPais) {
      let idx = this.yama.indexOf(discardedPai);
      this.yama.splice(idx, 1);
    }

    if (this.yama.includes(doraDisplayedPai)) {
      let idx = this.yama.indexOf(doraDisplayedPai);
      this.yama.splice(idx, 1);
    }
  }

  discard(pai) {
    let p = Mahjong.normalizePai(pai);
    let idx = this.pais.indexOf(p);
    if (idx === -1) return false;

    this.pais.splice(idx, 1);
    this.discardedPais.push(p);
    this.tsumo();

    return true;
  }

  tsumogiri() {
    this.discardedPais.push(this.pais.pop());
    this.tsumo();

    return true;
  }

  tsumo() {
    if (this.pais.length >= 14) return;

    this.pais.push(this.yama.shift());
  }

  get sutehai() {
    let sutehai = '';
    for (let i = 0, len = this.discardedPais.length; i < len; i += 6) {
      let line = this.discardedPais
        .slice(i, i + 6)
        .map(Mahjong.getPaiCodePointFrom)
        .join('');
      sutehai += `${line}\n`;
    }
    return sutehai.trim();
  }

  get wanpai() {
    return `🀫🀫${Mahjong.getPaiCodePointFrom(this.doraDisplayedPai)}🀫🀫🀫🀫`;
  }

  get tehai() {
    return this.pais
      .slice(0, this.pais.length - 1)
      .map(Mahjong.getPaiCodePointFrom)
      .sort()
      .join('');
  }

  get tsumohai() {
    return Mahjong.getPaiCodePointFrom(this.pais[this.pais.length - 1]);
  }

  display() {
    return `${this.sutehai}\n\n${this.wanpai}\n\n${this.tehai} ${this.tsumohai}`;
  }
}

Mahjong.HAIPAI = 1;
Mahjong.TSUMOGIRI = 2;
Mahjong.DISCARD = 3;
Mahjong.UNKNOWN = 4;

Mahjong.generateYama = () => {
  let yama = [...PAIS, ...PAIS, ...PAIS, ...PAIS];

  let len = yama.length;
  while (len) {
    let i = Math.floor(Math.random() * len--);
    let t = this[len];
    this[len] = this[i];
    this[i] = t;
  }

  return yama;
};

Mahjong.haipai = () => {
  let yama = Mahjong.generateYama();
  let pais = [];
  let discardedPais = [];
  let doraDisplayedPai = yama.shift();

  while (pais.length < 14) {
    pais.push(yama.shift());
  }

  return new Mahjong({yama, pais, discardedPais, doraDisplayedPai});
};

Mahjong.getPaiCodePointFrom = (pai) => {
  let idx = PAIS.indexOf(pai);
  if (idx === -1) return null;

  return String.fromCodePoint(0x1F000 + idx);
};

Mahjong.parseCommand = (command) => {
  command = command.trim();

  if (HAIPAI_COMMANDS.includes(command)) {
    return { type: Mahjong.HAIPAI };
  }

  if (TSUMOGIRI_COMMANDS.includes(command)) {
    return { type: Mahjong.TSUMOGIRI };
  }

  let pai = Mahjong.normalizePai(command);

  if (pai) {
    return { type: Mahjong.DISCARD, pai };
  }

  return { type: Mahjong.UNKNOWN };
};

Mahjong.normalizePai = (pai) => {
  pai = pai
    .replace(/^1/, '一')
    .replace(/^2/, '二')
    .replace(/^3/, '三')
    .replace(/^4/, '四')
    .replace(/^5/, '五')
    .replace(/^6/, '六')
    .replace(/^7/, '七')
    .replace(/^8/, '八')
    .replace(/^9/, '九')
    .replace(/(m|man|マン|まん)$/, '萬')
    .replace(/(s|sou|ソウ|そう)$/, '索')
    .replace(/(p|pin|ピン|ぴん)$/, '筒')
    .replace(/^tonn?$/, '東')
    .replace(/^nann?$/, '南')
    .replace(/^sya$/, '西')
    .replace(/^pei$/, '北')
    .replace(/^haku$/, '白')
    .replace(/^(hats?u|発)$/, '發')
    .replace(/^(chunn?|tyunn?)$/, '中');

  if (PAIS.includes(pai)) {
    return pai;
  }

  return null;
};

module.exports = Mahjong;
