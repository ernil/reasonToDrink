###
  Add your application's coffee-script code here
###

$(document).ready ()->
  console.log 'ready'
  $('#get-next').click (e)->
    console.log 'click'
    e.preventDefault()
    $.ajax
      dataType: 'json'
      url: '/application/index.json'
      success: (data)->
        $('.reason-title').text data.data.title
        $('.reason-rand').text data.data.random