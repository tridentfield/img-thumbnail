pageContainer = new PageContainer()

getPageContainer = ->
  pageContainer

getPage = (url) ->
  pageContainer.get(url)

chrome.extension.onMessage.addListener (req, sender, res) ->
  pageContainer.add(req.page)
  res({"url":req.page.url})