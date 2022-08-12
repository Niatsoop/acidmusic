const {MessageEmbed } = require('discord.js')
module.exports = {
  name: 'queue',
  aliases: ['q'],
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .slice(0, 5).join('\n') + `\n\n${queue.songs.length > 5 ? `And **${queue.songs.length - 5}** other songs...` : `In the playlist **${queue.songs.length}** song(s)...`}`
      message.channel.send({embeds: [new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`${client.emotes.queue} | **Server Queue**\n${q}`)
      ]})
  }
}




// (queue.tracks.map((track, i) => {
//   return `**#${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`
// }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 20}** other songs...` : `In the playlist **${queue.tracks.length}** song(s)...`}`));