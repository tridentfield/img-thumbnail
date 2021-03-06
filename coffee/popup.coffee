class ImgThumbnailCore
  constructor: (@page) ->
    @currentIndex = 0

  current: ->
    @move(@currentIndex)

  next: ->
    @move(@currentIndex++)

  previous: ->
    @move(@currentIndex--)

  validateIndex: ->
    if @currentIndex < 0
      @currentIndex = 0
    else if @currentIndex > @page.imgs.length
      @currentIndex = @page.imgs.length

  move: (index) ->
    @validateIndex()
    @page.imgs[@currentIndex]

  @create: (page) ->
    new ImgThumbnailCore(page)


class ImgThumbnailUI
  constructor: (@page)->
    @core = ImgThumbnailCore.create(@page)
    @setupUI()
    @showImg()

  setupUI: ->
    $('#page_title').text(@page.title)
    $('#page_url').text(@page.url)
    @setupNext()
    @setupPrevious()
    @setupThumbnail()

  setupThumbnail: ->
    @imgContainer = $('#img_container')

  setupNext: ->
    @next = $('#next')
    @next.click($.proxy(@nextClick, @))

  setupPrevious: ->
    @previous = $('#previous')
    @previous.click($.proxy(@previousClick, @))

  nextClick: ->
    @core.next()
    @showImg()

  previousClick: ->
    @core.previous()
    @showImg()

  showImg: (img) ->
    img ?= @core.current()
    @thumbnail = $(new Image())
    @thumbnail.bind('load', $.proxy(@thumbnailLoad, @))
    @thumbnail.addClass('thumbnail')
    @thumbnail.attr('src', img.src)

  thumbnailLoad: ->
    console.log(@thumbnail.prop('naturalHeight') + ':' + @thumbnail.prop('naturalWidth'))
    imgWidth = @thumbnail.prop('naturalWidth')
    imgHeight = @thumbnail.prop('naturalHeight')
    if imgWidth > imgHeight and imgWidth > 380
      @thumbnail.attr('width', 360)
      @thumbnail.attr('heigth', imgHeight * (360 / imgWidth))
    else if imgHeight > imgWidth and imgHeight > 400
      @thumbnail.attr('width', imgWidth * (400 / imgHeight))
      @thumbnail.attr('height', 400)

    $('img').remove('.thumbnail')
    @imgContainer.append(@thumbnail)

  @create: (page)->
    new ImgThumbnailUI(page)


bg = chrome.extension.getBackgroundPage()
page = {}
imgThumbnailUI = null

init = ->
  chrome.tabs.getSelected null, (tab) ->
    page = bg.getPage(tab.url)
    imgThumbnailUI = ImgThumbnailUI.create(page)
    imgThumbnailUI.showImg()

  chrome.tabs.onActivated.addListener (activeInfo) ->
    console.log(activeInfo.tabId)


jQuery ->
  init()