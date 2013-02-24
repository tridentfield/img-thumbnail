var bg, init, page;

bg = chrome.extension.getBackgroundPage();

page = {};

init = function() {
  chrome.tabs.getSelected(null, function(tab) {
    page = bg.getPage(tab.url);
    return $('#page_title').text(page.url);
  });
  return chrome.tabs.onActivated.addListener(function(activeInfo) {
    return console.log(activeInfo.tabId);
  });
};

jQuery(function() {
  return init();
});
