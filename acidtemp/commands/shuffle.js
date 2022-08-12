const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'shuffle',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    queue.shuffle()
    message.channel.send({embeds: [new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`Shuffled songs in the queue`)
    ]})
   // message.channel.send('Shuffled songs in the queue')
  }
}
