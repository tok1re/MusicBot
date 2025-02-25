const { MessageEmbed } = require('discord.js');
module.exports = async (client, int) => {

if(!int.guild) return

    if (int.isCommand()){

    const cmd = client.commands.get(int.commandName);

    if (!cmd) return void int.reply({
        content: `Command \`${int.commandName}\` not found.`,
        ephemeral: true
    })


    const DJ = client.config.opt.DJ;
    if (cmd && ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume', 'nowplaying', 'save', 'search', 'time'].includes(int.commandName)) {
        const fetch = require("node-fetch"); // import node-fetch module
        const url = `https://top.gg/api/bots/964995884234448987/check?userId=${int.user.id}`; // api endpoint
        
        fetch(url, { method: "GET", headers: { 
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk2NDk5NTg4NDIzNDQ0ODk4NyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjUzMzE2NTU4fQ.D0cEuMzNTKZOBJc1QBIzPyBHa8Vf3Gl5BWgZiTptVO8" }
        }).then(async(res) => res.text()).then(async(json) => {
            var isVoted = JSON.parse(json).voted;
            if (isVoted == 0) {
                const embed = new MessageEmbed()
                .setColor('BLUE')
                .setTitle(client.user.username)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription("Hello, in order to use the discord bot commands mentioned below, you need to vote on the **top.gg** site for the Astra bot to develop and grow faster. Each vote is valid for 12 hours, during which time you can continue to use these commands.\n[**VOTE ASTRA**](https://top.gg/bot/964995884234448987/vote)\n"+client.config.opt.DJ.commands.map(astra => '`'+astra+'`').join(", "))
                .setTimestamp()
                .setFooter({ text: 'Music Bot - by Umut Bayraktar ❤️', iconURL: int.user.displayAvatarURL({ dynamic: true }) })
                return int.reply({ embeds: [embed], ephemeral: true})
            } else {

                if (cmd && DJ.commands.includes(int.commandName)) {
                    let djRolefind = await client.mdb.findOne({ guildID: int.guild.id }).catch(e => { });
                    let djRole = djRolefind && djRolefind.djRole
                     if(djRole){
                  const roleDJ = int.guild.roles.cache.get(djRole)
                  if(!int.member.permissions.has("MANAGE_GUILD")){
                      if(roleDJ){
                      if(!int.member.roles.cache.has(roleDJ.id)){
          
                      const embed = new MessageEmbed()
                      .setColor('BLUE')
                      .setTitle(client.user.username)
                      .setThumbnail(client.user.displayAvatarURL())
                      .setDescription("You must have the <@&"+djRole+">(DJ) role set on this server to use this command. Users without this role cannot use the "+client.config.opt.DJ.commands.map(astra => '`'+astra+'`').join(", "))
                      .addField("Invite Bot", `**[Add Me](https://bit.ly/3LIb7Zv) | [Vote](https://top.gg/bot/964995884234448987/vote) | [Support](https://discord.gg/ST89uArTdh) | [Website](https://astramusic.vercel.app) | [Source Code](https://github.com/1umutda/MusicBot)**` ,true)
                      .setTimestamp()
                      .setFooter({ text: 'Music Bot - by Umut Bayraktar ❤️', iconURL:int.user.displayAvatarURL({ dynamic: true }) });
                      return int.reply({ content: `${int.user}`, embeds: [embed], ephemeral: true}).catch(e => { })
                  }}}}
                }
        
            if (cmd && cmd.voiceChannel) {
                if (!int.member.voice.channel) return int.reply({ content: `You are not connected to an audio channel. ❌`, ephemeral: true});
                if (int.guild.me.voice.channel && int.member.voice.channel.id !== int.guild.me.voice.channel.id) return int.reply({ content: `You are not on the same audio channel as me. ❌`, ephemeral: true});
            }
            cmd.run(client, int)
            }
          })
    } else {
        if (cmd && cmd.voiceChannel) {
            if (!int.member.voice.channel) return int.reply({ content: `You are not connected to an audio channel. ❌`, ephemeral: true});
            if (int.guild.me.voice.channel && int.member.voice.channel.id !== int.guild.me.voice.channel.id) return int.reply({ content: `You are not on the same audio channel as me. ❌`, ephemeral: true});
        }
        cmd.run(client, int)    
}
    }

    if (int.isButton()){
        const queue = client.player.getQueue(int.guildId);
    switch (int.customId) {
        case 'saveTrack': {
       if (!queue || !queue.playing){
       return int.reply({ content: `No music currently playing. ❌`, ephemeral: true, components: [] });
       } else {
          const embed = new MessageEmbed()
          .setColor('BLUE')
          .setTitle(client.user.username + " - Save Track")
          .setThumbnail(client.user.displayAvatarURL())
          .addField(`Track`, `\`${queue.current.title}\``)
          .addField(`Duration`, `\`${queue.current.duration}\``)
          .addField(`URL`, `${queue.current.url}`)
          .addField(`Saved Server`, `\`${int.guild.name}\``)
          .addField(`Requested By`, `${queue.current.requestedBy}`)
          .setTimestamp()
          .setFooter({ text: 'Music Bot Commands - by Umut Bayraktar ❤️', iconURL: int.user.displayAvatarURL({ dynamic: true }) });
          int.member.send({ embeds: [embed] }).then(() => {
                return int.reply({ content: `I sent you the name of the music in a private message ✅`, ephemeral: true}).catch(e => { })
            }).catch(error => {
                return int.reply({ content: `I can't send you a private message. ❌`, ephemeral: true}).catch(e => { })
            });
        }
    }
        break
        case 'time': {
            if (!queue || !queue.playing){
                return int.reply({ content: `No music currently playing. ❌`, ephemeral: true, components: [] });
                } else {

            const progress = queue.createProgressBar();
            const timestamp = queue.getPlayerTimestamp();
    
            if (timestamp.progress == 'Infinity') return int.message.edit({ content: `This song is live streaming, no duration data to display. 🎧` }).catch(e => { })
    
            const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(queue.current.title)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
            .setDescription(`${progress} (**${timestamp.progress}**%)`)
            .setFooter({ text: 'Music Bot Commands - by Umut Bayraktar ❤️', iconURL: int.user.displayAvatarURL({ dynamic: true }) });
            int.message.edit({ embeds: [embed] }).catch(e => { })
            int.reply({ content: `**✅ Success:** Time data updated. `, ephemeral: true}).catch(e => { })
        }
    }
    }
}
};
