import * as Discord from 'discord.js';
import {bot, CMDManager, MusicPlayer} from '../index';
const logs = require('discord-logs');
logs(bot);

bot.on(`voiceChannelJoin`, async (member: Discord.GuildMember, channel: Discord.VoiceChannel) => {
	if(member.id == bot.user.id || member.user.bot || channel.members.size == 1 || ! channel.members ||! channel.joinable ||! channel.speakable) return;
	if(member.guild.id !== '635582459366342659') return;

	let constellation = await bot.guilds.cache.get('635582459366342659');
	let achannel = await constellation.channels.cache.get('653035130738311188');
	await (<Discord.TextChannel> achannel).messages.fetch()
	let findMSG = await (<Discord.TextChannel> achannel).messages.cache.find(msg => msg.author.id == member.user.id);
	if(!findMSG) return;
	await MusicPlayer.play(findMSG, 'https://www.youtube.com/watch?v=YN1SGS7N02U');
})