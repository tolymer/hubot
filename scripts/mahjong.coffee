# Description:
#   mahjong
#
# Commands:
#   hubot mahjong haipai

Mahjong = require '../models/mahjong'

module.exports = (robot) ->
  robot.respond /mahj[oa]ng (.*)$/i, (msg) ->
    command = msg.match[1]
    if command == 'haipai'
      mahjong = Mahjong.haipai()
    else
      { pais } = robot.brain.get('mahjong')
      mahjong = new Mahjong(pais)
      mahjong.discard(command)
      mahjong.tsumo()

    robot.brain.set('mahjong', { pais: mahjong.pais })
    msg.send mahjong.display()
