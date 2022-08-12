module.exports = {
    name: "ping",
    aliases: [""],
    inVoiceChannel: true,
    run: async (client, message, args) => {
                                  message.channel.send(":ping_pong: Pong!")
                        .then((msg)=> {
                        setTimeout(function(){
                         msg.edit(`${client.emotes.success} - Ping : **${client.ws.ping}ms** !`);
                        }, 1000)
});    
    }
}




