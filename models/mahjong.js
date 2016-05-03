const PAIS = [
  '東', '南', '西', '北', '白', '発', '中',
  '一萬', '二萬', '三萬', '四萬', '五萬', '六萬', '七萬', '八萬', '九萬',
  '一索', '二索', '三索', '四索', '五索', '六索', '七索', '八索', '九索',
  '一筒', '二筒', '三筒', '四筒', '五筒', '六筒', '七筒', '八筒', '九筒',
];

class Mahjong {
  static haipai() {
    let mahjong = new Mahjong();

    while (mahjong.pais.length < 14) {
      mahjong.tsumo();
    }

    return mahjong;
  }

  constructor(pais = []) {
    this.pais = pais;
  }

  discard(pai) {
    let idx = this.pais.indexOf(pai);
    this.pais.splice(idx, 1);
  }

  tsumo() {
    if (this.pais.length >= 14) return;

    let pai = PAIS[Math.floor(Math.random() * PAIS.length)];
    if (this.pais.filter(p => p === pai).length < 4) {
      this.pais.push(pai);
    }
    else {
      this.tsumo();
    }
  }

  display() {
    return this.pais.map(pai => {
      let idx = PAIS.indexOf(pai);
      return String.fromCodePoint(0x1F000 + idx);
    }).sort().join('');
  }
}

module.exports = Mahjong;
