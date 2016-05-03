let assert = require('assert');
let Mahjong = require('../models/mahjong');

{
  let mahjang = new Mahjong().haipai();
  console.log(mahjang.display());
}

{
  let mahjang = new Mahjong(['東', '南', '西', '北', '白', '発', '中', '一萬', '二萬', '三萬', '四萬', '五萬', '六萬', '七萬']);
  assert(mahjang.display(), '🀀🀁🀂🀃🀆🀅🀄🀇🀈🀉🀊🀋🀌🀍');
  mahjang.discard('南');
  console.log(mahjang.display());
  mahjang.tsumo();
  console.log(mahjang.display());
}

assert.equal(Mahjong.getPaiCodePointFrom('東'), '🀀');
assert.equal(Mahjong.getPaiCodePointFrom('南'), '🀁');
assert.equal(Mahjong.getPaiCodePointFrom('西'), '🀂');
assert.equal(Mahjong.getPaiCodePointFrom('北'), '🀃');
assert.equal(Mahjong.getPaiCodePointFrom('白'), '🀆');
assert.equal(Mahjong.getPaiCodePointFrom('發'), '🀅');
assert.equal(Mahjong.getPaiCodePointFrom('中'), '🀄');

assert.equal(Mahjong.parseCommand('t').type, Mahjong.TSUMOGIRI);

assert.equal(Mahjong.normalizePai('ton'), '東');
assert.equal(Mahjong.normalizePai('tonn'), '東');
assert.equal(Mahjong.normalizePai('nan'), '南');
assert.equal(Mahjong.normalizePai('発'), '發');
assert.equal(Mahjong.normalizePai('発'), '發');
assert.equal(Mahjong.normalizePai('1m'), '一萬');
assert.equal(Mahjong.normalizePai('1man'), '一萬');
assert.equal(Mahjong.normalizePai('1まん'), '一萬');
assert.equal(Mahjong.normalizePai('一まん'), '一萬');
assert.equal(Mahjong.normalizePai('2s'), '二索');
assert.equal(Mahjong.normalizePai('2sou'), '二索');
assert.equal(Mahjong.normalizePai('2そう'), '二索');
assert.equal(Mahjong.normalizePai('2ソウ'), '二索');
assert.equal(Mahjong.normalizePai('3p'), '三筒');
assert.equal(Mahjong.normalizePai('3pin'), '三筒');
assert.equal(Mahjong.normalizePai('3ぴん'), '三筒');
assert.equal(Mahjong.normalizePai('3ピン'), '三筒');
assert.equal(Mahjong.normalizePai('3ピ'), null);
