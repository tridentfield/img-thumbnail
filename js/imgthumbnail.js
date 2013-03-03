var Img, Page, PageContainer;

Img = (function() {

  function Img(element) {
    this.src = element.src;
  }

  Img.create = function(element) {
    return new Img(element);
  };

  return Img;

})();

Page = (function() {

  function Page(title, url) {
    this.title = title;
    this.url = url;
    this.imgs = [];
  }

  Page.prototype.addImg = function(img) {
    return this.imgs.push(img);
  };

  return Page;

})();

PageContainer = (function() {

  function PageContainer() {
    this.pages = {};
  }

  PageContainer.prototype.add = function(page) {
    var _base, _name, _ref;
    return (_ref = (_base = this.pages)[_name = page.url]) != null ? _ref : _base[_name] = page;
  };

  PageContainer.prototype.get = function(url) {
    return this.pages[url];
  };

  return PageContainer;

})();
