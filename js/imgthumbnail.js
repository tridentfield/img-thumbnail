var Img, Page, PageContainer;

Img = (function() {

  function Img(element) {
    this.src = element.src;
    this.nWidth = element.naturalWidth;
    this.nHeight = element.naturalHeight;
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
    return this.pages[page.url] = page;
  };

  PageContainer.prototype.get = function(url) {
    return this.pages[url];
  };

  return PageContainer;

})();
