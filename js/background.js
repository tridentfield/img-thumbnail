var getPage, getPageContainer, pageContainer;

pageContainer = new PageContainer();

getPageContainer = function() {
  return pageContainer;
};

getPage = function(url) {
  return pageContainer.get(url);
};

chrome.extension.onMessage.addListener(function(req, sender, res) {
  pageContainer.add(req.page);
  return res({
    "url": req.page.url
  });
});
