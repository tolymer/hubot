# Description:
#   点数計算やっちゃうよ
#
# Commands:
#   hubot calc 2翻 70符 親 ツモ
#   hubot calc 3翻 40符 子 ロン

module.exports = (robot) ->
  robot.respond /calc (.+)$/i, (msg) ->
    msg.send calc(msg.match[1])

normalizeFu = (fu) ->
  if fu > 110
    return 110
  return fu

isMangan = (fan, fu) ->
  if (fan == 3 and fu >= 60)
    return true
  else if (4 <= fan and fan <= 5 and 30 <= fu)
    return true
  return false

isHaneman = (fan, fu) ->
  if 6 <= fan and fan <= 7
    return true
  return false

isBaiman = (fan, fu) ->
  if 8 <= fan and fan <= 10
    return true
  return false

isSanbaiman = (fan, fu) ->
  if 11 <= fan and fan <= 12
    return true
  return false

isYakuman = (fan, fu) ->
  if 13 <= fan
    return true
  return false

calc = (text) ->
  [fan, fu, role, method] = parse(text)

  fu = normalizeFu(fu)

  if isMangan(fan, fu)
    basePoint = 2000
  else if isHaneman(fan, fu)
    basePoint = 3000
  else if isBaiman(fan, fu)
    basePoint = 4000
  else if isSanbaiman(fan, fu)
    basePoint = 6000
  else if isYakuman(fan, fu)
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
