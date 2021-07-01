import * as Discord from 'discord.js';
import {bot} from '../index';


bot.on('message', async(message) => {
	if (!message.guild) return;
	if (message.channel.type === `dm`) return;

	let guild = message.guild;
	let guildOwnerTemp = await bot.users.cache.get(message.guild.ownerID);

	let prefix = process.env.BOT_PREFIX.toLowerCase()
})