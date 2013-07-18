before 'protect from forgery', ->
  protectFromForgery 'a91777a29c2af89509964269ef4adf88290c4e48'

before 'get random reson', ->
  @rand = rand = Math.random()
  params =
    lt: 
      where: {random: {lt: rand}}
      order: 'random DESC'
      limit: 1
    gt:
      where: {random: {gt: rand}}
      order: 'random'
      limit: 1
  Reason.all params.gt, (err, reason)=>
    if err || reason.length == 0
      Reason.all params.lt, (err, reason)=>
        if err || reason.length == 0
          return send code: 404, error: 'Not found'
        else
          @reason = reason
          next()
    else
      @reason = reason
      next()


action 'index', ->
  @title = 'Got a reason to drink'
  respondTo (format) ->
    format.json ->
      send code: 200, data: @reason
    format.html ->
      render()
