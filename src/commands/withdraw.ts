import { Player } from "discord-player";
import { Message } from "discord.js";
import {bot, MusicPlayer} from '../index';
import dotEnv from 'dotenv';

dotEnv.config({path: "secret.env"});

export let commandProps = {
	'name': 'withdraw',
	'usage': '[prefix]withdraw',
	'aliases': ['leave', 'ditch']
}

export async function cmd(message: Message, args: string[]){
	if(message.member.user.id !== process.env.BOT_OWNERID) return message.reply(':x: Only the bot owner can use this command');
	let guildToLeave = await bot.guilds.cache.get(args[0]);
	if(!guildToLeave) return message.reply(':x: Invalid guild ID!')
	else {
		guildToLeave.leave()
		message.delete();
		return message.channel.send(':white_check_mark: Left Guild: ' + guildToLeave.name);
	}
}