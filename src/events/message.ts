import * as Discord from 'discord.js';
import {bot, CMDManager} from '../index';
import CommandHandler from '../CommandHandler';
import Spliterator from '../util/Spliterator';

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
	//Split the incoming command using the spliterator
	let messageArgs:string[] = (await Spliterator.split(message.content));

	//Check if the message args begins with the configured prefix
		if(LowerCaseMessage.startsWith(prefix.toLowerCase())){
			//Slice the prefix out of the first array element
			messageArgs[0] = (await messageArgs[0].slice(prefix.length));
		}
		else {
			//Slice the first array element entirely
			messageArgs = (await messageArgs.slice(1, (messageArgs.length)));
		}
	
		//Get the base command
		let baseCommand:string = messageArgs[0];

		let finalSearchCMD = await CMDManager.findCommand(messageArgs[0].toLowerCase());

		if(!finalSearchCMD) return message.reply(`:x: That is not a valid command!`);
		messageArgs.shift()
		//Pass the command arguments to the interpreter
		await CMDManager.runCommand(finalSearchCMD.toLowerCase(), message, messageArgs);
})

