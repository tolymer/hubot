# Description:
#   deploy
#
# Commands:
#   hubot deploy hubot

{exec} = require 'child_process'
{readdirSync} = require 'fs'

module.exports = (robot) ->
  robot.respond /deploy (.+)$/i, (msg) ->
    appName = msg.match[1]
    dirs = readdirSync '/app'
    if dirs.indexOf(appName) == -1
      return msg.send "Error: #{appName} is invalid"

    msg.send "deploying #{appName} :rocket:"

    exec "/app/#{appName}/deploy.sh", (err) ->
      if err
        msg.send ":bomb::bomb::bomb: Error: #{err.message}"
      else
        msg.send "deployed #{appName} :shipit:"
