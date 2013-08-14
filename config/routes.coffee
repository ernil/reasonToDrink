exports.routes = (map)->
  map.resources 'reasons'

  # Generic routes. Add all your routes below this line
  # feel free to remove generic routes]
  map.root 'application#index'
  map.get '/application/index.:format?', 'application#index'
  
  map.all ':controller/:action'
  map.all ':controller/:action/:id'