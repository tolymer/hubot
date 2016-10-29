const page = require('webpage').create();

page.open('http://nnkr.jp/', function () {
  const clipRect = page.evaluate(function () {
    return document.querySelector('#random-pickup').getBoundingClientRect();
  });
  page.clipRect = {
    top:    clipRect.top,
    left:   clipRect.left,
    width:  clipRect.width,
    height: clipRect.height
  };
  page.render('nnkr.png');
  setTimeout(function() {
    phantom.exit();
  }, 2000);
});
