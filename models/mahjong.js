const CHARACTERS = ['一萬', '二萬', '三萬', '四萬', '五萬', '六萬', '七萬', '八萬', '九萬'];
const DOTS = ['一筒', '二筒', '三筒', '四筒', '五筒', '六筒', '七筒', '八筒', '九筒'];
const BAMBOOS = ['一索', '二索', '三索', '四索', '五索', '六索', '七索', '八索', '九索'];
const HONORS = ['東', '南', '西', '北', '中', '發', '白'];
const PAIS = [...HONORS, ...CHARACTERS, ...BAMBOOS, ...DOTS];
const HAIPAI_COMMANDS = ['配牌', 'はいぱい', 'ハイパイ', 'haipai', 'h'];
const TSUMOGIRI_COMMANDS = ['ツモ切り', 'つも切り', 'ツモギリ', 'tsumogiri', 't'];

class Yama extends Array {
  constructor() {
    super();

    this.push(...[...PAIS, ...PAIS, ...PAIS, ...PAIS]);

    let len = this.length;
    while (len) {
      let i = Math.floor(Math.random() * len--);
      let t = this[len];
      this[len] = this[i];
      this[i] = t;
    }
  }
}

class Mahjong {
  constructor(pais = [], discardedPais = [], doraDisplayedPai = null) {
    this.yama = new Yama();
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
  }

  haipai() {
    while (this.pais.length < 14) {
      this.tsumo();
    }

    this.doraDisplayedPai = this.yama.shift();

    return this;
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

    let pai = this.yama.shift();
    if (this.pais.filter(p => p === pai).length < 4) {
      this.pais.push(pai);
    }
    else {
      this.tsumo();
    }
  }

  display() {
    let len = this.pais.length;
    let sortedPais = this.pais.slice(0, len - 1).map(Mahjong.getPaiCodePointFrom).sort().join('');
    let tsumoPai = Mahjong.getPaiCodePointFrom(this.pais[len - 1]);
    let doraPais = `🀫🀫${Mahjong.getPaiCodePointFrom(this.doraDisplayedPai)}🀫🀫🀫🀫`;
    let discardedPais = '';
    for (let i = 0, len = this.discardedPais.length; i < len; i += 6) {
      discardedPais += `${this.discardedPais.slice(i, i + 6).map(Mahjong.getPaiCodePointFrom).join('')}\n`;
    }

    return `${discardedPais.trim()}\n\n${doraPais}\n\n${sortedPais} ${tsumoPai}`;
  }
}

Mahjong.HAIPAI = 1;
Mahjong.TSUMOGIRI = 2;
Mahjong.DISCARD = 3;
Mahjong.UNKNOWN = 4;

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
