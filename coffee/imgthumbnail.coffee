
class Img
  constructor: (element) ->
    @src = element.src
    @nWidth = element.naturalWidth
    @nHeight = element.naturalHeight

  @create:(element) ->
    new Img(element)

class Page
  constructor: (@title, @url) ->
    @imgs = []

  addImg: (img) ->
    @imgs.push(img)


class PageContainer
  constructor: ->
    @pages = {}

  add: (page) ->
    @pages[page.url] = page

  get: (url) ->
    @pages[url]
