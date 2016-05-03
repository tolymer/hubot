let Mahjong = require('../models/mahjong');

{
  let mahjang = Mahjong.haipai();
  console.log(mahjang.display());
}

{
  let mahjang = new Mahjong(['東', '南', '西', '北', '白', '発', '中', '一萬', '二萬', '三萬', '四萬', '五萬', '六萬', '七萬']);
  mahjang.discard('南');
  console.log(mahjang.display());
  mahjang.tsumo();
  console.log(mahjang.display());
}
