import * as Discord from 'discord.js';
import {bot, CMDManager} from '../index';
import CommandHandler from '../CommandHandler';

bot.on('message', async(message) => {
	if (!message.guild) return;
	if (message.channel.type === `dm`) return;

	let guild: Discord.Guild = message.guild;
	let guildOwnerTemp: Discord.User = await bot.users.cache.get(message.guild.ownerID);

	let prefix: string = process.env.BOT_PREFIX.toLowerCase()
	let args: string[] = [];

	let LowerCaseMessage = message.content.toLowerCase()
	if(!LowerCaseMessage.startsWith(prefix)) return;

	args = message.content.replace(`${prefix}`, ``).replace(`${prefix.toUpperCase()}`, ``).split(" ")
	if(!CMDManager.findCommand(args[0].toLowerCase().replace(`${prefix.toUpperCase()}`, ``).replace(`${prefix}`, ``))) return message.reply(`:x: That is not a valid command!`);
	else CMDManager.runCommand(args[0].toLowerCase().replace(`${prefix.toUpperCase()}`, ``).replace(`${prefix}`, ``), message, args.splice(0, 1));
})

