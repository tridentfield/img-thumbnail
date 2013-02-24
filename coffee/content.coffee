page = new Page($(document).attr('title'), $(location).attr('href'))
$('img').each (i, element) =>
  img = Img.create(element)
  page.addImg Img.create(element)


chrome.extension.sendMessage {"page": page}, (res) ->
  console.log("[" + res.url + "]")
