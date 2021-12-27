const updateNotifier = require("update-notifier")
const pkg = require("../package.json")
updateNotifier({ pkg }).notify()

module.exports = {
    version: pkg.version,
    Rubrik: require("./Rubrik"),
}

/*
Hi, welcome to looking in my code.
Any questions? Shoot me a message on any of the following
Discord: TheShadow#8124
Telegram: @wizardshadow

or just shoot me
that too
*/
