# Description:
#   何切る？
#
# Commands:
#   hubot nnkr

phantomjs = require('phantomjs')
binPath = phantomjs.path
exec = require('child_process').exec
path = require('path')

module.exports = (robot) ->
  robot.respond /nnkr/i, (msg) ->
    exec "#{binPath} #{path.join(__dirname, '../nnkr-request.js')}", ->
      exec "curl -F file=@#{path.join(__dirname, '..', 'nnkr.png')} -F channels=#{msg.message.room} -F token=#{process.env.HUBOT_SLACK_TOKEN} https://slack.com/api/files.upload"
