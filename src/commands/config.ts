import { Player } from "discord-player";
import { Message, MessageEmbed } from "discord.js";
import {bot, MusicPlayer} from '../index';
import {GuildMastero} from '../events/ready';
import {GuildConfigFile} from "../modules/GuildConfigManager";

export let commandProps = {
	'name': 'config',
	'usage': '[prefix]config [settingToAdjust] [newValue]',
	'aliases': ['adjustconfig', 'adjustc', 'settings']
}

export async function cmd(message: Message, args: string[]){
	let thisGuildConfig = await GuildMastero.getConfig(message.guild.id);
	
	if(!args[0] ||! args[1]) return message.reply(`:x: Invalid usage! Proper usage: \`${commandProps.usage.replace(`[prefix]`, process.env.BOT_PREFIX.toLowerCase())}\``);
	
	let settingToAdjust = args[0];
	let newValue = args[1];

	let validSettings = GuildMastero.validSettings;
	if(!validSettings.includes(settingToAdjust.toLowerCase())) return message.reply(`:x: Invalid Configuration Setting! Valid settings are: \`${validSettings.join(", ")}\``);

	let positiveAnswers = ["true", "yes", "enable"];
	let negativeAnswers = ["false", "no", "disable"];

	let dataObj = {
		answerIsBoolean: false,
		trueBooleanValue: null
	};
	if(positiveAnswers.includes(newValue.toLowerCase())){ 
		dataObj.trueBooleanValue = true;
		dataObj.answerIsBoolean = true;
	}
	else if(negativeAnswers.includes(newValue.toLowerCase())){ 
		dataObj.trueBooleanValue = false;
		dataObj.answerIsBoolean = true;
	}
	else return message.reply(`:x: Invalid Configuration Option! Valid options are true/false`);

	if(dataObj.answerIsBoolean) thisGuildConfig[settingToAdjust] = dataObj.trueBooleanValue;
	thisGuildConfig[settingToAdjust.toLowerCase()] = dataObj.trueBooleanValue

	GuildMastero.updateConfig(message.guild.id, thisGuildConfig);

	return message.reply(`:white_check_mark: Updated setting \`${settingToAdjust}\` to value \`${dataObj.trueBooleanValue}!\``)
}