import * as Discord from 'discord.js';
import {bot, CMDManager} from '../index';
import CommandHandler from '../CommandHandler';
import Spliterator from '../util/Spliterator';
import {dictionary, dmDictionary, AmongusCock} from '../modules/Dictionary';
import {ReplierModule} from '../modules/Replier';
import {GuildMastero} from './ready';
import {GuildConfigFile} from "../modules/GuildConfigManager";

let AutoReplier = new ReplierModule(dictionary, dmDictionary);

bot.on('message', async(message) => {
	if (!message.guild) return;
	if (message.channel.type === `dm`) return;

	let guild: Discord.Guild = message.guild;
	let guildOwnerTemp: Discord.User = await bot.users.cache.get(message.guild.ownerID);

	let prefix: string = process.env.BOT_PREFIX.toLowerCase()
	let args: string[] = [];

	let LowerCaseMessage = message.content.toLowerCase()


	let thisConfig = await GuildMastero.getConfig(message.guild.id);
	
	if(thisConfig.autoresponder && message.author.id !== bot.user.id &&! message.content.toLowerCase().startsWith(prefix.toLowerCase())){ 
		let reply = await AutoReplier.checkReply(message.content.toLowerCase());
		let dmReply = await AutoReplier.checkDMReply(message.content.toLowerCase());
		if(dmReply &&! message.content.toLowerCase().includes(prefix)) message.author.send(dmReply).catch(e => {console.log(e);});
		if(reply &&! message.content.toLowerCase().includes(prefix)) message.channel.send(reply);

		let randomInt = Math.random();
		if(randomInt < 0.02 && thisConfig.randomdms) message.author.send(AmongusCock + `\n THROBBING NEAR YOU`);

		// Exclusive Feature
		if(message.content.toLowerCase().includes('sus') || message.content.toLowerCase().replace(' ', '').includes('amongus')){
			if(message.guild.id !== "635582459366342659") return; 
			let susRole = message.guild.roles.cache.find(role => role.name.toLowerCase() == "sus");
			message.member.setNickname('Sussy Boy');
			message.member.roles.add(susRole);

			let thisTimeStamp = Date.now();
			thisConfig.sussyusers[thisTimeStamp] = message.member.user.id;
			GuildMastero.updateConfig(message.guild.id, thisConfig);
			/* Deprecated by the new Sus Timer!
			setTimeout(async function(){
				message.member.roles.remove(susRole);
				message.member.setNickname(message.author.username);
			}, 2 * 60 * 1000)
			*/
		}
	}

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

