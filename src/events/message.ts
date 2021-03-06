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
	
	if(thisConfig.autoresponder &&! message.author.bot &&! message.content.toLowerCase().startsWith(prefix.toLowerCase())){ 
		let reply = await AutoReplier.checkReply(message.content.toLowerCase());
		let dmReply = await AutoReplier.checkDMReply(message.content.toLowerCase());
		if(dmReply &&! message.content.toLowerCase().includes(prefix)) message.author.send(dmReply).catch(e => {console.log(e);});
		if(reply &&! message.content.toLowerCase().includes(prefix)) message.channel.send(reply);

		let randomInt = Math.random();
		
		let randomInt2 = Math.random();
		if(randomInt < 0.02 && thisConfig.randomdms) message.author.send(AmongusCock + `\n THROBBING NEAR YOU`);

		async function fard(){
			let amongASSEmote: Discord.Emoji = await bot.emojis.cache.get('878505518258348033');
			if(!amongASSEmote) return;

			if(randomInt2 < 0.1 && thisConfig.randomdms) message.react(amongASSEmote.id);
		};

		if(((message.attachments.size > 0 && message.attachments.first().name.toLowerCase().includes('gif')) || message.content.toLowerCase().includes('.gif')) && thisConfig.autoresponder) fard();
		if(message.content.toLowerCase().includes('tenor') && thisConfig.autoresponder) fard();
		// Exclusive Feature
		if(message.content.toLowerCase().includes('sus') || message.content.toLowerCase().replace(' ', '').includes('amongus')){
			if(message.guild.id !== "635582459366342659") return; 
			let susRole = message.guild.roles.cache.find(role => role.name.toLowerCase() == "sus");
			if(!susRole) return;
			let thisTimeStamp = Date.now();
			let userIsAlreadySus;
			for(var prop in thisConfig.sussyusers){
				if(thisConfig.sussyusers[prop] == message.author.id && message.member.roles.cache.has(susRole.id)){
					delete thisConfig.sussyusers[prop]
					thisConfig.sussyusers[thisTimeStamp] = message.member.user.id;
					GuildMastero.updateConfig(message.guild.id, thisConfig);
					userIsAlreadySus = true;
					return;
				}
				else if(thisConfig.sussyusers[prop] == message.author.id){
					delete thisConfig.sussyusers[prop]
					GuildMastero.updateConfig(message.guild.id, thisConfig);
					userIsAlreadySus = true
					return;
				}
			}

			if(userIsAlreadySus) return;
			
			if(message.member.manageable) message.member.setNickname('Sussy Boy');
			message.member.roles.add(susRole);

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

