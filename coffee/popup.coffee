bg = chrome.extension.getBackgroundPage()
page = {}

init = ->
  chrome.tabs.getSelected null, (tab) ->
    page = bg.getPage(tab.url)
    $('#page_title').text(page.url)

  chrome.tabs.onActivated.addListener (activeInfo) ->
    console.log(activeInfo.tabId)


jQuery ->
  init()