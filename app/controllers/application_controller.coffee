before 'protect from forgery', ->
  protectFromForgery 'a91777a29c2af89509964269ef4adf88290c4e48'

action 'index', ->
  @title = 'Got a reason to drink'
  Reason.findRandom (reason)->
    @reason = reason
    respondTo (format) ->
      format.json ->
        send code: 200, data: @reason
      format.html ->
        render()
