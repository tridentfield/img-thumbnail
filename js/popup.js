var ImgThumbnailCore, ImgThumbnailUI, bg, imgThumbnailUI, init, page;

ImgThumbnailCore = (function() {

  function ImgThumbnailCore(page) {
    this.page = page;
    this.currentIndex = 0;
  }

  ImgThumbnailCore.prototype.current = function() {
    return this.move(this.currentIndex);
  };

  ImgThumbnailCore.prototype.next = function() {
    return this.move(this.currentIndex++);
  };

  ImgThumbnailCore.prototype.previous = function() {
    return this.move(this.currentIndex--);
  };

  ImgThumbnailCore.prototype.validateIndex = function() {
    if (this.currentIndex < 0) {
      return this.currentIndex = 0;
    } else if (this.currentIndex > this.page.imgs.length) {
      return this.currentIndex = this.page.imgs.length;
    }
  };

  ImgThumbnailCore.prototype.move = function(index) {
    this.validateIndex();
    return this.page.imgs[this.currentIndex];
  };

  ImgThumbnailCore.create = function(page) {
    return new ImgThumbnailCore(page);
  };

  return ImgThumbnailCore;

})();

ImgThumbnailUI = (function() {

  function ImgThumbnailUI(page) {
    this.page = page;
    this.core = ImgThumbnailCore.create(this.page);
    this.setupUI();
    this.showImg();
  }

  ImgThumbnailUI.prototype.setupUI = function() {
    $('#page_title').text(this.page.title);
    $('#page_url').text(this.page.url);
    this.setupNext();
    this.setupPrevious();
    return this.setupThumbnail();
  };

  ImgThumbnailUI.prototype.setupThumbnail = function() {
    return this.thumbnail = $('#thumbnail');
  };

  ImgThumbnailUI.prototype.setupNext = function() {
    this.next = $('#next');
    return this.next.click($.proxy(this.nextClick, this));
  };

  ImgThumbnailUI.prototype.setupPrevious = function() {
    this.previous = $('#previous');
    return this.previous.click($.proxy(this.previousClick, this));
  };

  ImgThumbnailUI.prototype.nextClick = function() {
    this.core.next();
    return this.showImg();
  };

  ImgThumbnailUI.prototype.previousClick = function() {
    this.core.previous();
    return this.showImg();
  };

  ImgThumbnailUI.prototype.showImg = function(img) {
    if (img == null) {
      img = this.core.current();
    }
    return this.thumbnail.attr('src', img.src);
  };

  ImgThumbnailUI.create = function(page) {
    return new ImgThumbnailUI(page);
  };

  return ImgThumbnailUI;

})();

bg = chrome.extension.getBackgroundPage();

page = {};

imgThumbnailUI = null;

init = function() {
  chrome.tabs.getSelected(null, function(tab) {
    page = bg.getPage(tab.url);
    return imgThumbnailUI = ImgThumbnailUI.create(page);
  });
  return chrome.tabs.onActivated.addListener(function(activeInfo) {
    return console.log(activeInfo.tabId);
  });
};

jQuery(function() {
  return init();
});
