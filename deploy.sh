export PATH=$HOME/.nodebrew/current/bin:$PATH
cd `dirname $0`
git fetch origin
git reset --hard origin/master
npm install
supervisorctl restart hubot
