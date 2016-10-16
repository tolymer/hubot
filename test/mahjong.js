let test = require('ava');
let Mahjong = require('../models/mahjong');

test('Mahjong#constructor', t => {
  let mahjong = new Mahjong(['東', '南', '西', '北', '白', '発', '中', '一萬', '二萬', '三萬', '四萬', '五萬', '六萬', '七萬'], [], '東');
  t.is(mahjong.display(), '🀀🀁🀂🀃🀆🀅🀄🀇🀈🀉🀊🀋🀌🀍');

  mahjong.discard('南');
  console.log(mahjong.display());

  mahjong.discard('西');
  console.log(mahjong.display());

  [...Array(16).keys()].forEach(() => mahjong.tsumogiri());
  console.log(mahjong.display());
});

test('Mahjong#haipai', t => {
  let mahjong = new Mahjong().haipai();
  console.log(mahjong.display());
});

test('Mahjong.getPaiCodePointFrom', t => {
  t.is(Mahjong.getPaiCodePointFrom('東'), '🀀');
  t.is(Mahjong.getPaiCodePointFrom('南'), '🀁');
  t.is(Mahjong.getPaiCodePointFrom('西'), '🀂');
  t.is(Mahjong.getPaiCodePointFrom('北'), '🀃');
  t.is(Mahjong.getPaiCodePointFrom('白'), '🀆');
  t.is(Mahjong.getPaiCodePointFrom('發'), '🀅');
  t.is(Mahjong.getPaiCodePointFrom('中'), '🀄');
});

test('Mahjong.TSUMOGIRI', t => {
  t.is(Mahjong.parseCommand('t').type, Mahjong.TSUMOGIRI);
});

test('Mahjong.normalizePai', t => {
  t.is(Mahjong.normalizePai('ton'), '東');
  t.is(Mahjong.normalizePai('tonn'), '東');
  t.is(Mahjong.normalizePai('nan'), '南');
  t.is(Mahjong.normalizePai('発'), '發');
  t.is(Mahjong.normalizePai('発'), '發');
  t.is(Mahjong.normalizePai('1m'), '一萬');
  t.is(Mahjong.normalizePai('1man'), '一萬');
  t.is(Mahjong.normalizePai('1まん'), '一萬');
  t.is(Mahjong.normalizePai('一まん'), '一萬');
  t.is(Mahjong.normalizePai('2s'), '二索');
  t.is(Mahjong.normalizePai('2sou'), '二索');
  t.is(Mahjong.normalizePai('2そう'), '二索');
  t.is(Mahjong.normalizePai('2ソウ'), '二索');
  t.is(Mahjong.normalizePai('3p'), '三筒');
  t.is(Mahjong.normalizePai('3pin'), '三筒');
  t.is(Mahjong.normalizePai('3ぴん'), '三筒');
  t.is(Mahjong.normalizePai('3ピン'), '三筒');
  t.is(Mahjong.normalizePai('3ピ'), null);
});
