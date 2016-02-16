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

  if (fan == 3 and fu == 70) or (4 <= fan and fan <= 5 and 30 <= fu)
    basePoint = 2000
  else if 6 <= fan and fan <= 7
    basePoint = 3000
  else if 8 <= fan and fan <= 10
    basePoint = 4000
  else if 11 <= fan and fan <= 12
    basePoint = 6000
  else if 13 <= fan
    basePoint = 8000
  else
    basePoint = fu * Math.pow(2, fan + 2)

  isParent = role == '親'

  if method == 'ロン'
    if isParent
      "#{ceil(basePoint * 6)}"
    else
      "#{ceil(basePoint * 4)}"
  else
    if isParent
      "#{ceil(basePoint * 2)}ALL"
    else
      "#{ceil(basePoint * 1)}-#{ceil(basePoint * 2)}"

parse = (text) ->
  text = (text || '').trim()
  [fan, fu, role, method] = text.split(/\s+/)
  [parseInt(fan), parseInt(fu), role, method]

ceil = (point) ->
  Math.ceil(point / 100) * 100
