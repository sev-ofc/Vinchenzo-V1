import * as Discord from 'discord.js';
import {bot} from '../index';

// Define the activity
async function activityToSet(){
	await bot.user.setStatus('online');
	await bot.user.setActivity('you shower', {
		'type': "WATCHING"
	});
}

// Start the bot
bot.on('ready', async() => {
	let botOwner = await bot.users.cache.get(process.env.BOT_OWNERID);
	console.log(`Logged into ${bot.user.tag}\n${bot.user.username} by ${botOwner.tag}\nOnline in ${bot.guilds.cache.size} Servers:`);
	// Log all of the servers the bot is in
	let i = 1
	bot.guilds.cache.forEach(async guild => {
		let guildOwner = await bot.users.fetch(guild.ownerID);
		console.log(`${i}: ${guild.name} owned by ${guildOwner.tag}`);
		i++
	})

	activityToSet()
	bot.channels.cache.forEach(channel => {
		if(channel.type == 'text'){
			(<Discord.TextChannel> channel).stopTyping();
		}
	})
	bot.voice.connections.forEach(voiceConnection => {
		voiceConnection.disconnect();
	});

	
	let constellation = await bot.guilds.cache.get('635582459366342659');
	let susRole = await constellation.roles.cache.get('860078704038248458')
	
	constellation.members.cache.forEach(member => {
		if(member.nickname == "Sussy boy") member.setNickname('');
		if(member.roles.highest == susRole) member.roles.remove(susRole);
	})
})