# Description:
#   mahjang
#
# Commands:
#   hubot mahjang haipai

Mahjang = require '../models/mahjang'

module.exports = (robot) ->
  robot.respond /mahjang haipai$/i, (msg) ->
    haipai = Mahjang.haipai()
    msg.send haipai
