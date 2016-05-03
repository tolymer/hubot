class Mahjang {
  static getAllPais() {
    let start = 0x1F000; // 東
    let end   = 0x1F021; // 九筒
    let length = end - start + 1;

    return Array.from({ length }, (_, i) => String.fromCodePoint(start + i));
  }

  static haipai() {
    let result = [];
    let pais = this.getAllPais();

    while (result.length < 14) {
      let pai = pais[Math.floor(Math.random() * pais.length)];
      if (result.filter(p => p === pai).length < 4) {
        result.push(pai);
      }
    }

    return result.sort().join('');
  }
}

module.exports = Mahjang;
