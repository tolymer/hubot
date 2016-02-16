# Description:
#   点数計算やっちゃうよ
#
# Commands:
#   hubot calc 2翻 70符 親 ツモ
#   hubot calc 3翻 40符 子 ロン

module.exports = (robot) ->
  robot.respond /calc (.+)$/i, (msg) ->
    msg.send calc(msg.match[1])

calc = (text) ->
  [fan, fu, role, method] = parse(text)
  basePoint = fu * Math.pow(2, fan + 2)
  isParent = role == '親'

  if method == 'ロン'
    ceil(basePoint * (if isParent then 6 else 4)).toString()
  else if isParent
    "#{ceil(basePoint * 2)}ALL"
  else
    "#{ceil(basePoint * 1)}-#{ceil(basePoint * 2)}"

parse = (text) ->
  text = (text || '').trim()
  [fan, fu, role, method] = text.split(/\s+/)
  [parseInt(fan), parseInt(fu), role, method]

ceil = (point) ->
  Math.ceil(point / 100) * 100
