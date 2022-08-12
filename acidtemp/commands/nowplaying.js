const { MessageEmbed } = require('discord.js')
const createBar = require('string-progressbar')
const { toColonNotation } = require('colon-notation')
module.exports = {
    name: 'nowplaying',
    aliases: ['np', 'currentsong'],
    description: 'Show the currently playing song.',
    run: async(client, message) => {
      const bot = client
        const queue = bot.distube.getQueue(message)
        if(!queue) return message.channel.send({embeds: [new MessageEmbed()
        .setDescription('there is no song playing right now')
        .setColor('RANDOM')]})
        if(!queue && !bot.distube.isPlaying(message)) return message.channel.send({embeds: [new MessageEmbed()
            .setDescription('there is no song playing right now')
            .setColor('RANDOM')]})
        const song = queue.songs[0]
        const name = song.name
        const user = song.user.tag
        const avatar = song.user.displayAvatarURL({ dynamic: true, format: "png" })
        const link = song.url
        const time = song.duration * 1000
        const currenttime = queue.currentTime * 1000
        const tn = song.thumbnail
        const remaining = (time - currenttime < 0 ? "◉ LIVE" : time - currenttime)
        const bar = require(`stylish-text`)

    function toReadableTime(given){
        var time = given;
        var minutes = "0" + Math.floor(time / 60);
        var seconds = "0" + (time - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }

    const current = Math.floor(currenttime / 1000) //ms --> seconds //ms --> seconds
    const end = song.duration //video in seconds
    
    const value = (current * (100 / end) / 5)
    
    bar.default.full = "█";
    bar.default.empty = " - ";
    bar.default.start = "";
    bar.default.end = "";
    bar.default.text = "{bar}";

//`${toReadableTime(current)} - [${bar.progress(20, value)}] - ${toReadableTime(end)}` //This would go in your embed


        try {
            const embed = new MessageEmbed()
            .setTitle(name)
            .setAuthor(user, avatar)
            .setURL(link)
            .setDescription(`${toReadableTime(current)} - [${bar.progress(20, value)}] - ${toReadableTime(end)}`)
            .setColor('#c1abff')
            .setThumbnail(`${tn}`)
             message.channel.send({embeds: [embed]})//.then((message) => {
            //     var countdown = 10;
            //     const interval = setInterval(() => {
            //         if (countdown < 0) clearInterval(interval);
            //         const embed = new MessageEmbed()
            //         .setTitle(name)
            //         .setAuthor(user, avatar)
            //         .setURL(link)
            //         .setDescription(`${toReadableTime(current)} - [${bar.progress(20, value)}] - ${toReadableTime(end)}`)
            //         .setColor('#c1abff')
            //         .setThumbnail(`${tn}`)
            //         message.edit({embeds: [embed]})
            //     }, 7000)
            // })
        } catch (e) {
            message.channel.send(`There was an issue: \n\`${e}\``)
        }
    }
}