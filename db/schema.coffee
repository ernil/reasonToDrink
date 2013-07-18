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
    property 'random', Number, index: true, default: Math.random()
    set 'restPath', pathTo.reasons

