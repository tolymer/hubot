let test = require('ava');
let calc = require('../scripts/calc').calc;

test('calc 親 ツモ', t => {
  t.is(calc('2翻 20符 親 ツモ'), '700ALL');
  t.is(calc('3翻 20符 親 ツモ'), '1300ALL');
  t.is(calc('4翻 20符 親 ツモ'), '2600ALL');

  t.is(calc('1翻 30符 親 ツモ'), '500ALL');
  t.is(calc('2翻 30符 親 ツモ'), '1000ALL');
  t.is(calc('3翻 30符 親 ツモ'), '2000ALL');
  t.is(calc('4翻 30符 親 ツモ'), '4000ALL');
  t.is(calc('5翻 30符 親 ツモ'), '4000ALL');
  t.is(calc('6翻 30符 親 ツモ'), '6000ALL');
  t.is(calc('7翻 30符 親 ツモ'), '6000ALL');
  t.is(calc('8翻 30符 親 ツモ'), '8000ALL');
  t.is(calc('9翻 30符 親 ツモ'), '8000ALL');
  t.is(calc('10翻 30符 親 ツモ'), '8000ALL');
  t.is(calc('11翻 30符 親 ツモ'), '12000ALL');
  t.is(calc('12翻 30符 親 ツモ'), '12000ALL');
  t.is(calc('13翻 30符 親 ツモ'), '16000ALL');

  t.is(calc('1翻 40符 親 ツモ'), '700ALL');
  t.is(calc('2翻 40符 親 ツモ'), '1300ALL');
  t.is(calc('3翻 40符 親 ツモ'), '2600ALL');
  t.is(calc('4翻 40符 親 ツモ'), '4000ALL');

  t.is(calc('1翻 50符 親 ツモ'), '800ALL');
  t.is(calc('2翻 50符 親 ツモ'), '1600ALL');
  t.is(calc('3翻 50符 親 ツモ'), '3200ALL');
  t.is(calc('4翻 50符 親 ツモ'), '4000ALL');

  t.is(calc('1翻 60符 親 ツモ'), '1000ALL');
  t.is(calc('2翻 60符 親 ツモ'), '2000ALL');
  t.is(calc('3翻 60符 親 ツモ'), '4000ALL');
  t.is(calc('4翻 60符 親 ツモ'), '4000ALL');

  t.is(calc('1翻 70符 親 ツモ'), '1200ALL');
  t.is(calc('2翻 70符 親 ツモ'), '2300ALL');
  t.is(calc('3翻 70符 親 ツモ'), '4000ALL');
  t.is(calc('4翻 70符 親 ツモ'), '4000ALL');
});

test('calc 親 ロン', t => {
  t.is(calc('1翻 30符 親 ロン'), '1500');
  t.is(calc('2翻 30符 親 ロン'), '2900');
  t.is(calc('3翻 30符 親 ロン'), '5800');
  t.is(calc('4翻 30符 親 ロン'), '12000');

  t.is(calc('1翻 40符 親 ロン'), '2000');
  t.is(calc('2翻 40符 親 ロン'), '3900');
  t.is(calc('3翻 40符 親 ロン'), '7700');
  t.is(calc('4翻 40符 親 ロン'), '12000');

  t.is(calc('1翻 50符 親 ロン'), '2400');
  t.is(calc('2翻 50符 親 ロン'), '4800');
  t.is(calc('3翻 50符 親 ロン'), '9600');
  t.is(calc('4翻 50符 親 ロン'), '12000');

  t.is(calc('1翻 60符 親 ロン'), '2900');
  t.is(calc('2翻 60符 親 ロン'), '5800');
  t.is(calc('3翻 60符 親 ロン'), '12000');
  t.is(calc('4翻 60符 親 ロン'), '12000');

  t.is(calc('1翻 70符 親 ロン'), '3400');
  t.is(calc('2翻 70符 親 ロン'), '6800');
  t.is(calc('3翻 70符 親 ロン'), '12000');
  t.is(calc('4翻 70符 親 ロン'), '12000');
});

test('calc 子 ツモ', t => {
  t.is(calc('2翻 20符 子 ツモ'), '400-700');
  t.is(calc('3翻 20符 子 ツモ'), '700-1300');
  t.is(calc('4翻 20符 子 ツモ'), '1300-2600');

  t.is(calc('1翻 30符 子 ツモ'), '300-500');
  t.is(calc('2翻 30符 子 ツモ'), '500-1000');
  t.is(calc('3翻 30符 子 ツモ'), '1000-2000');
  t.is(calc('4翻 30符 子 ツモ'), '2000-4000');
  t.is(calc('5翻 30符 子 ツモ'), '2000-4000');
  t.is(calc('6翻 30符 子 ツモ'), '3000-6000');
  t.is(calc('7翻 30符 子 ツモ'), '3000-6000');
  t.is(calc('8翻 30符 子 ツモ'), '4000-8000');
  t.is(calc('9翻 30符 子 ツモ'), '4000-8000');
  t.is(calc('10翻 30符 子 ツモ'), '4000-8000');
  t.is(calc('11翻 30符 子 ツモ'), '6000-12000');
  t.is(calc('12翻 30符 子 ツモ'), '6000-12000');
  t.is(calc('13翻 30符 子 ツモ'), '8000-16000');

  t.is(calc('1翻 40符 子 ツモ'), '400-700');
  t.is(calc('2翻 40符 子 ツモ'), '700-1300');
  t.is(calc('3翻 40符 子 ツモ'), '1300-2600');
  t.is(calc('4翻 40符 子 ツモ'), '2000-4000');

  t.is(calc('1翻 50符 子 ツモ'), '400-800');
  t.is(calc('2翻 50符 子 ツモ'), '800-1600');
  t.is(calc('3翻 50符 子 ツモ'), '1600-3200');
  t.is(calc('4翻 50符 子 ツモ'), '2000-4000');

  t.is(calc('1翻 60符 子 ツモ'), '500-1000');
  t.is(calc('2翻 60符 子 ツモ'), '1000-2000');
  t.is(calc('3翻 60符 子 ツモ'), '2000-4000');
  t.is(calc('4翻 60符 子 ツモ'), '2000-4000');

  t.is(calc('1翻 70符 子 ツモ'), '600-1200');
  t.is(calc('2翻 70符 子 ツモ'), '1200-2300');
  t.is(calc('3翻 70符 子 ツモ'), '2000-4000');
  t.is(calc('4翻 70符 子 ツモ'), '2000-4000');
});

test('calc 子 ロン', t => {
  t.is(calc('1翻 30符 子 ロン'), '1000');
  t.is(calc('2翻 30符 子 ロン'), '2000');
  t.is(calc('3翻 30符 子 ロン'), '3900');
  t.is(calc('4翻 30符 子 ロン'), '8000');

  t.is(calc('1翻 40符 子 ロン'), '1300');
  t.is(calc('2翻 40符 子 ロン'), '2600');
  t.is(calc('3翻 40符 子 ロン'), '5200');
  t.is(calc('4翻 40符 子 ロン'), '8000');

  t.is(calc('1翻 50符 子 ロン'), '1600');
  t.is(calc('2翻 50符 子 ロン'), '3200');
  t.is(calc('3翻 50符 子 ロン'), '6400');
  t.is(calc('4翻 50符 子 ロン'), '8000');

  t.is(calc('1翻 60符 子 ロン'), '2000');
  t.is(calc('2翻 60符 子 ロン'), '3900');
  t.is(calc('3翻 60符 子 ロン'), '8000');
  t.is(calc('4翻 60符 子 ロン'), '8000');

  t.is(calc('1翻 70符 子 ロン'), '2300');
  t.is(calc('2翻 70符 子 ロン'), '4500');
  t.is(calc('3翻 70符 子 ロン'), '8000');
  t.is(calc('4翻 70符 子 ロン'), '8000');
});
