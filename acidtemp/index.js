


const { DisTube } = require('distube')
const Discord = require('discord.js')
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES
  ]
})
const fs = require('fs')
const config = require('./config.json')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

client.config = require('./config.json')
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  nsfw: true,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ],
  youtubeDL: false
})
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji

fs.readdir('./commands/', (err, files) => {
  if (err) return console.log('Could not find any commands!')
  const jsFiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) return console.log('Could not find any commands!')
  jsFiles.forEach(file => {
    const cmd = require(`./commands/${file}`)
    console.log(`Loaded ${file}`)
    client.commands.set(cmd.name, cmd)
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  })
})

client.on('ready', () => {
  console.log(`${client.user.tag} is ready to play music.`)
  client.user.setStatus('idle');
  client.user.setPresence({ activities: [{name: 'music 🎶', type: 'LISTENING'}]})
const https = require('http')
const port = 3000

  const server = https.createServer(function(req, res) {
   res.writeHead(200, {'Content-Type' : 'text/html'  })
    fs.readFile('index.html', function(error, data) {
        if (error) {
            res.writeHead(404)
            res.write('Error: File not found!')
        } else {
         res.write(data)
        }
       res.end()
    })
    
})


server.listen(port, function(error){
    if(error) {
        console.log('something went wrong fuckign fix it you slow bollox', error)
   } else {
        console.log('server is listning on port ' + port)
    }
})








  
})

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return
  const prefix = config.prefix
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
  }
  try {
    cmd.run(client, message, args)
  } catch (e) {
    console.error(e)
    message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
  }
})

const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send({embeds: [new  Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${ song.user }\n${status(queue)}`)]}))



  .on('addSong', (queue, song) =>
    queue.textChannel.send({embeds: [new  Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)]}))


  .on('addList', (queue, playlist) =>
    queue.textChannel.send({embeds: [new  Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`${client.emotes.success} | Added \`${playlist.name}\` playlist (${ playlist.songs.length } songs) to queue\n${status(queue)}`)]}))


  .on('error', (channel, e) => {
    channel.send({embeds: [new  Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
    ]})
    console.error(e)
  })
  .on('empty', channel => channel.send({embeds: [new  Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`Leaving the voice channel because its empty :(`)
  ]}))

  .on('searchNoResult', (message, query) =>
    message.channel.send({embeds: [new  Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`${client.emotes.error} | No result found for \`${query}\`!`)
    ]})
  )
  .on('finish', queue => queue.textChannel.send({embeds: [new  Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`No songs left to play!`)
  ]}))
// // DisTubeOptions.searchSongs = true
// .on("searchResult", (message, result) => {
//     let i = 0
//     message.channel.send(
//         `**Choose an option from below**\n${result
//             .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
//             .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
//     )
// })
// .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
// .on("searchInvalidAnswer", message =>
//     message.channel.send(
//         `${client.emotes.error} | Invalid answer! You have to enter the number in the range of the results`
//     )
// )
// .on("searchDone", () => {})

client.login('YOUR_TOKEN_HERE')
