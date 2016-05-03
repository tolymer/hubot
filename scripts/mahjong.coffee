# Description:
#   mahjong
#
# Commands:
#   hubot mahjong haipai

Mahjong = require '../models/mahjong'

module.exports = (robot) ->
  robot.respond /mahj[oa]ng (.*)$/i, (msg) ->
    { type, pai } = Mahjong.parseCommand(msg.match[1])

    restore = ->
      { pais, discardedPais, doraDisplayedPai } = robot.brain.get('mahjong')
      mahjong = new Mahjong(pais, discardedPais, doraDisplayedPai)

    if process.env['DEBUG']
      console.log type, pai

    switch type
      when Mahjong.HAIPAI
        mahjong = new Mahjong().haipai()
      when Mahjong.TSUMOGIRI
        mahjong = restore()
        mahjong.tsumogiri()
      when Mahjong.DISCARD
        mahjong = restore()
        unless mahjong.discard(pai)
          return msg.send 'チョンボ'
      else
        msg.send 'チョンボ'
        return

    msg.send mahjong.display()
    robot.brain.set('mahjong', {
      pais: mahjong.pais,
      discardedPais: mahjong.discardedPais,
      doraDisplayedPai: mahjong.doraDisplayedPai,
    })
