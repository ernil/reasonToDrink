module.exports = (compound, Reason) ->
  # define Reason here
  Reason.findRandom = (callback)->
    rand = Math.random()
    params =
      lt: 
        where: {random: {lt: rand}}
        order: 'random DESC'
        limit: 1
      gt:
        where: {random: {gt: rand}}
        order: 'random'
        limit: 1
    Reason.findOne params.gt, (err, reason)=>
      if err || reason.length == 0
        Reason.findOne params.lt, (err, reason)=>
          if err || reason.length == 0
            return send code: 404, error: 'Not found'
          else
            callback reason
      else
        callback reason