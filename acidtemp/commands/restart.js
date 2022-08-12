module.exports = {
    name: "restart",
    inVoiceChannel: false,
    run: async (client, message, args) => {
        const bot = require('../config/bot');
          
        message.reply('Restarting...\n||(bot will say its offline untill fully restarted)||')
      client.user.setStatus('invisible')
      setTimeout(() => {
      process.exit(1)
      }, 1000);
    },
};