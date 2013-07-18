load 'application'

before 'set random', ->
  body.Reason.random = Math.random()
  next()
, only: ['create']

before 'load reason', ->
  Reason.find params.id, (err, reason) =>
    if err || !reason
      if !err && !reason && params.format == 'json'
        return send code: 404, error: 'Not found'
      redirect pathTo.reasons
    else
      @reason = reason
      next()
, only: ['show', 'edit', 'update', 'destroy']

action 'new', ->
  @reason = new Reason
  @title = 'New reason'
  render()

action 'create', ->
  Reason.create body.Reason, (err, reason) =>
    respondTo (format) =>
      format.json ->
        if err
          send code: 500, error: reason.errors || err
        else
          send code: 200, data: reason.toObject()
      format.html =>
        if err
          flash 'error', 'Reason can not be created'
          @reason = reason
          @title = 'New reason'
          render 'new'
        else
          flash 'info', 'Reason created'
          redirect pathTo.reasons

action 'index', ->
  Reason.all (err, reasons) =>
    @reasons = reasons
    @title = 'Reason index'
    respondTo (format) ->
      format.json ->
        send code: 200, data: reasons
      format.html ->
        render reasons: reasons

action 'show', ->
  @title = 'Reason show'
  respondTo (format) =>
    format.json =>
      send code: 200, data: @reason
    format.html ->
      render()

action 'edit', ->
  @title = 'Reason edit'
  respondTo (format) =>
    format.json =>
      send code: 200, data: @reason
    format.html ->
      render()

action 'update', ->
  @reason.updateAttributes body.Reason, (err) =>
    respondTo (format) =>
      format.json =>
        if err
          send code: 500, error: @reason.errors || err
        else
          send code: 200, data: @reason
      format.html =>
        if !err
          flash 'info', 'Reason updated'
          redirect path_to.reason(@reason)
        else
          flash 'error', 'Reason can not be updated'
          @title = 'Edit reason details'
          render 'edit'

action 'destroy', ->
  @reason.destroy (error) ->
    respondTo (format) ->
      format.json ->
        if error
          send code: 500, error: error
        else
          send code: 200
      format.html ->
        if error
          flash 'error', 'Can not destroy reason'
        else
          flash 'info', 'Reason successfully removed'
        send "'" + path_to.reasons + "'"
