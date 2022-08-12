module.exports = {
    name: 'filterlist',
    aliases: [' '],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const { MessageEmbed } = require('discord.js')
        message.channel.send({embeds: [new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('List of all filters')
            .setDescription(`3d, bassboost, echo, karaoke, nightcore, vaporwave,\nflanger, gate, haas, reverse, surround, mcompand, phaser,\ntremolo, earwax`)
          ]})
    }
  }