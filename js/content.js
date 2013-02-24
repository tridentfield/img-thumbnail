var page,
  _this = this;

page = new Page($(document).attr('title'), $(location).attr('href'));

$('img').each(function(i, element) {
  var img;
  img = Img.create(element);
  return page.addImg(Img.create(element));
});

chrome.extension.sendMessage({
  "page": page
}, function(res) {
  return console.log("[" + res.url + "]");
});
