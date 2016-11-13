const page = require('webpage').create();

page.open('http://nnkr.jp/', () => {
  const clipRect = page.evaluate(() => {
    return document.querySelector('#random-pickup').getBoundingClientRect();
  });
  page.clipRect = {
    top: clipRect.top,
    left: clipRect.left,
    width: clipRect.width,
    height: clipRect.height
  };
  page.render('nnkr.png');
  setTimeout(() => phantom.exit(), 2000);
});
