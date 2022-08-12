module.exports = {
    name: "shutdown",
    inVoiceChannel: false,
    run: async (client, message, args) => {
        const bot = require('../config/bot');
        if (message.author.id !== '632996702202232862') {
        message.reply({content: 'you are not allowed to use this command', ephemeral: true})
        return
      } 
      message.channel.send("**Going**")
      message.channel.send('https://tenor.com/view/offline-aesthetic-vaporwave-glitch-gif-15965209')
      message.channel.send(":,(")
      client.user.setStatus('offline')
      setTimeout(() => {
      process.exit()
      }, 1000);
    },
};