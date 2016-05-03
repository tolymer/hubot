# Description:
#   mahjong
#
# Commands:
#   hubot mahjong haipai

Mahjong = require '../models/mahjong'

module.exports = (robot) ->
  robot.respond /mahj[oa]ng haipai$/i, (msg) ->
    haipai = Mahjong.haipai()
    msg.send haipai
