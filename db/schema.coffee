# Example of model definition:
#
#define 'User', ->
#  property 'email', String, index: true
#  property 'password', String
#  property 'activated', Boolean, default: false
#

Reason = describe 'Reason', ->
    property 'title', String
    property 'content', String
    property 'day', Date, default: Date
    property 'type', String
    property 'author', String
    property 'country', String
    property 'approved', Boolean, default: false 
    property 'random', Number, index: true, default: Math.random()
    set 'restPath', pathTo.reasons

