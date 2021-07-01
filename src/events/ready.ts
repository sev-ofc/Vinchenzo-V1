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


})